const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = dir + '/' + file;
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
                results = results.concat(walk(fullPath));
            }
        }
        else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) results.push(fullPath);
    });
    return results;
}

const dirs = [
    'f:/Corban/ctltd/forms',
    'f:/Corban/ctltd/components',
    'f:/Corban/ctltd/app'
];

let allFiles = [];
dirs.forEach(d => {
    allFiles = allFiles.concat(walk(d));
});

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Remove invalid button props across newlines too using [\s\S]*? or standard string replace since Regex over multi-line can be greedy.
    // However, safest multi-line regex for attributes inside tags: 
    // replacing `variant="anything"` inside <button ... >
    content = content.replace(/(<button[^>]*?)(\s+variant=["'][^"']*["'])([^>]*>)/gi, '$1$3');
    content = content.replace(/(<button[^>]*?)(\s+size=["'][^"']*["'])([^>]*>)/gi, '$1$3');
    content = content.replace(/(<button[^>]*?)(\s+asChild)([^>]*>)/gi, '$1$3');

    // Make sure we catch multi-line! The regex [^>]* will already catch newlines!
    
    // Also add p-2 manually if size="icon" was removed and it's a completely unstyled ghost button that now only has "rounded-full"
    content = content.replace(/(<button[^>]*?\s+className=["'][^"']*?rounded-full[^"']*?["'][^>]*?)>/gi, (match) => {
        if (!match.includes('p-2') && !match.includes('w-') && match.includes('bg-')) {
             return match.replace('rounded-full', 'rounded-full p-2');
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log("Updated: " + file);
    }
});
