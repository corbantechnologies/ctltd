"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Calculator, Layers, Book, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchCOAs } from "@/hooks/coa/actions";
import { useFetchBooks } from "@/hooks/books/actions";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function GlobalSearch({ role = "finance" }: { role?: "finance" | "director" }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Data fetch
    const { data: coas } = useFetchCOAs();
    const { data: books } = useFetchBooks();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 overflow-hidden shadow-2xl rounded-2xl border border-black/5 bg-white/80 backdrop-blur-xl max-w-2xl">
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    <div className="flex items-center border-b border-black/5 px-4" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Type a command or search..."
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2 scrollbar-hide">
                        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                        <Command.Group heading="Navigation">
                            <Command.Item
                                className="relative flex cursor-default select-none items-center rounded-xl px-2 py-2 text-sm outline-none aria-selected:bg-[#045138] aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                                onSelect={() => runCommand(() => router.push(`/${role}/dashboard`))}
                            >
                                <Calculator className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </Command.Item>
                            <Command.Item
                                className="relative flex cursor-default select-none items-center rounded-xl px-2 py-2 text-sm outline-none aria-selected:bg-[#045138] aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                                onSelect={() => runCommand(() => router.push(`/${role}/coa`))}
                            >
                                <Layers className="mr-2 h-4 w-4" />
                                <span>Chart of Accounts</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Accounts">
                            {coas?.slice(0, 10).map((coa) => (
                                <Command.Item
                                    key={coa.reference}
                                    className="relative flex cursor-default select-none items-center rounded-xl px-2 py-2 text-sm outline-none aria-selected:bg-[#045138] aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                                    onSelect={() => runCommand(() => router.push(`/${role}/coa/${coa.reference}`))}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>{coa.name} ({coa.code})</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Group heading="Books">
                            {books?.slice(0, 10).map((book) => (
                                <Command.Item
                                    key={book.reference}
                                    className="relative flex cursor-default select-none items-center rounded-xl px-2 py-2 text-sm outline-none aria-selected:bg-[#045138] aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                                    onSelect={() => runCommand(() => router.push(`/${role}/books/${book.reference}`))} // Check path
                                >
                                    <Book className="mr-2 h-4 w-4" />
                                    <span>{book.name}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                    </Command.List>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
