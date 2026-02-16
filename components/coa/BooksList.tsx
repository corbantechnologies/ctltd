/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Book as BookIcon,
  ArrowRight,
  LayoutGrid,
  List,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Wallet,
  Landmark,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Book } from "@/services/books";

type CSSWithVariables = React.CSSProperties & {
  [key: string]: string | number;
};

interface BooksListProps {
  books: Book[];
  rolePrefix: string;
  coaReference: string;
}

export default function BooksList({
  books,
  rolePrefix,
  coaReference,
}: BooksListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.account_type.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [books, searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-black/5 rounded-[32px] border-2 border-dashed border-black/10">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black/20 mb-4 shadow-sm">
          <BookIcon className="w-8 h-8" />
        </div>
        <p className="text-sm font-bold text-black/40 uppercase tracking-widest">
          No ledger books found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/50 backdrop-blur-xl p-4 rounded-[24px] border border-black/5 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20"
              style={{ color: searchQuery ? primaryColor : undefined }}
            />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 rounded-xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-xl self-end lg:self-auto">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === "grid"
              ? "bg-white shadow-sm"
              : "text-black/40 hover:text-black"
              }`}
            style={
              {
                color: view === "grid" ? primaryColor : undefined,
              } as CSSWithVariables
            }
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === "table"
              ? "bg-white shadow-sm"
              : "text-black/40 hover:text-black"
              }`}
            style={
              {
                color: view === "table" ? primaryColor : undefined,
              } as CSSWithVariables
            }
          >
            <List className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {paginatedBooks.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm font-bold text-black/20 uppercase tracking-[0.2em]">
            No books match your criteria
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedBooks.map((book) => (
            <Link
              key={book.reference}
              href={`/${rolePrefix}/coa/${coaReference}/${book.reference}`}
              className="group"
            >
              <Card className="border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] overflow-hidden bg-white/80 backdrop-blur-xl group-hover:-translate-y-1 h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner">
                      {book.is_bank ? (
                        <Landmark className="w-6 h-6" />
                      ) : book.is_cash ? (
                        <Wallet className="w-6 h-6" />
                      ) : (
                        <BookIcon className="w-6 h-6" />
                      )}
                    </div>
                    {book.is_active ? (
                      <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-black/5 text-black/40 border-none font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Inactive
                      </Badge>
                    )}
                  </div>

                  <div className="mb-6 flex-1">
                    <h3
                      className="text-lg font-bold text-black tracking-tight transition-colors line-clamp-2"
                      style={
                        { "--hover-text": primaryColor } as CSSWithVariables
                      }
                    >
                      {book.name}
                    </h3>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mt-1"
                      style={{ color: primaryColor } as CSSWithVariables}
                    >
                      {book.code}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                        Classification
                      </span>
                      <span className="text-[10px] font-bold text-black/60">
                        {book.account_type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {book.is_tax && (
                          <Badge className="bg-orange-500/10 text-orange-600 border-none text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            <Percent className="w-2 h-2 mr-1" />
                            TAX
                          </Badge>
                        )}
                        {book.is_bank && (
                          <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            BANK
                          </Badge>
                        )}
                      </div>
                      <ArrowRight
                        className="w-4 h-4 text-black/20 transition-all"
                        style={
                          {
                            "--group-hover-text": primaryColor,
                          } as CSSWithVariables
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-xl border border-black/5 rounded-[32px] overflow-hidden shadow-xl shadow-black/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 bg-black/5">
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Book Identity
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Account Type
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Compliance
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Status
                  </th>
                  <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Audit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {paginatedBooks.map((book) => (
                  <tr
                    key={book.reference}
                    className="transition-colors group"
                    style={
                      { "--hover-bg": `${primaryColor}0D` } as CSSWithVariables
                    }
                  >
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/30 group-hover:bg-black group-hover:text-white transition-all">
                          {book.is_bank ? (
                            <Landmark className="w-4 h-4" />
                          ) : (
                            <BookIcon className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p
                            className="text-sm font-medium text-black transition-colors"
                            style={
                              {
                                "--group-hover-text": primaryColor,
                              } as CSSWithVariables
                            }
                          >
                            {book.name}
                          </p>
                          <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                            {book.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <p className="text-[11px] font-bold text-black/60 uppercase tracking-wider">
                        {book.account_type}
                      </p>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <div className="flex gap-1.5">
                        {book.is_tax && (
                          <Badge className="bg-orange-500/10 text-orange-600 border-none text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            TAX
                          </Badge>
                        )}
                        {book.is_bank && (
                          <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            BANK
                          </Badge>
                        )}
                        {!book.is_tax && !book.is_bank && (
                          <span className="text-[10px] text-black/20 font-bold">
                            —
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      {book.is_active ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            In Operation
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-black/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Retired
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right border-b border-black/5">
                      <Link
                        href={`/${rolePrefix}/coa/${coaReference}/${book.reference}`}
                      >
                        <Button
                          variant="ghost"
                          className="h-7 w-7 p-0 rounded-md hover:text-white transition-all duration-300"
                          style={
                            { "--hover-bg": primaryColor } as CSSWithVariables
                          }
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-xl p-6 rounded-[24px] border border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
            Showing <span className="text-black">{paginatedBooks.length}</span>{" "}
            of <span className="text-black">{filteredBooks.length}</span> books
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{ ["--hover-bg" as any]: primaryColor }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1 px-4">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-[10px] font-bold transition-all ${currentPage === page
                        ? "text-white shadow-lg"
                        : "bg-white border border-black/5 text-black/40 hover:text-black shadow-sm"
                        }`}
                      style={
                        {
                          backgroundColor:
                            currentPage === page ? primaryColor : undefined,
                          boxShadow:
                            currentPage === page
                              ? `0 10px 15px -3px ${primaryColor}33`
                              : undefined,
                        } as CSSWithVariables
                      }
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <MoreHorizontal
                      key={page}
                      className="w-4 h-4 text-black/20"
                    />
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{ ["--hover-bg" as any]: primaryColor }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
