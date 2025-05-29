"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/shadcn/ui/pagination"

interface StudentPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function StudentPagination({ currentPage, totalPages, onPageChange }: StudentPaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink onClick={() => onPageChange(page)} isActive={currentPage === page} className="cursor-pointer">
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
