const fs = require('fs');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = dir + '/' + file;
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
        else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) results.push(fullPath);
    });
    return results;
}

const files = walk('f:/Corban/ctltd/forms');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Convert sizes and variants on buttons
    content = content.replace(/(<button[^>]*?)(\s+size=["']icon["'])((?:[^>]*?)className=["'])([^"']*)(["'])/gi, '$1$3$4 p-2$5');
    content = content.replace(/(<button[^>]*)\s+variant=["'][^"']*["']/g, '$1');
    content = content.replace(/(<button[^>]*)\s+size=["'][^"']*["']/g, '$1');

    // Also look for ones where className comes BEFORE variant/size, just in case (fallback to just deleting them if that's complex, we only had size="icon" for the onClose buttons usually which had p-2 added)
    
    // Add p-2 manually if still missing on the close buttons
    content = content.replace(/(<button[^>]*className=["'][^"']*rounded-full[^"']*["'][^>]*)>/gi, (match) => {
        if (!match.includes('p-2')) {
            return match.replace('rounded-full', 'p-2 rounded-full');
        }
        return match;
    });

    // 2. Fix the remaining form inputs (e.g. JournalEntry uses h-12 and border-black bg-white)
    const tagRegex = /(<(?:input|select|textarea)[^>]*\s+className=["'])([^"']*)(["'])/gi;
    content = content.replace(tagRegex, (match, prefix, classNames, suffix) => {
        if (match.includes('type="checkbox"') || match.includes('type="radio"') || classNames.includes('sr-only') || classNames.includes('hidden')) {
            return match;
        }

        let c = classNames;
        
        // Ensure w-full
        if (!c.includes('w-full')) {
            c = 'w-full ' + c;
        }

        // Standardize height and radius
        c = c.replace(/\bh-12\b/g, 'h-14');
        c = c.replace(/\brounded-xl\b/g, 'rounded-2xl');
        c = c.replace(/\btext-xs\b/g, 'text-sm');

        // Standardize borders and backgrounds
        c = c.replace(/\bborder-black\/5\b/g, 'border-slate-200');
        c = c.replace(/\bborder-black\b/g, 'border-slate-200');
        c = c.replace(/\bbg-white\b/g, 'bg-slate-50');
        c = c.replace(/\bbg-orange-50\/30\b/g, 'bg-slate-50');
        c = c.replace(/\bbg-gray-100\b/g, 'bg-slate-50');
        
        // Ensure standard focus states are there instead of custom messy ones
        if (!c.includes('focus:outline-none')) {
             c = c + ' focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-transparent';
        }

        // Clean duplicates
        c = [...new Set(c.split(/\s+/))].join(' ').trim();

        return prefix + c + suffix;
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log("Updated: " + file);
    }
});
