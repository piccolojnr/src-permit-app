import { Permit } from "@prisma/client"
import { format } from "date-fns"
import { Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent } from "@/components/shadcn/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import { Input } from "@/components/shadcn/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/shadcn/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table"
import CreatePermitForm from "./permit/create-permit-form"

type SafePermit = Permit & {
    student: {
        name: string
        studentId: string
    }
    issuedBy?: {
        username: string
    }
}
export function Permits() {
    const [permits, setPermits] = useState<SafePermit[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string>("")

    useEffect(() => {
        loadPermits()
    }, [currentPage, searchQuery, statusFilter])

    const loadPermits = async () => {
        try {
            const response = await window.api.permit.getAll({
                page: currentPage,
                pageSize,
                search: searchQuery,
                status: statusFilter
            })
            if (response.success && response.data) {
                setPermits(response.data.data)
                setTotalPages(response.data.totalPages)
            } else {
                console.error("Failed to load permits:", response.error)
                toast({
                    title: "Error",
                    description: response.error || "Failed to load permits",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to load permits",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRevoke = async (permitId: number) => {
        if (!confirm("Are you sure you want to revoke this permit?")) return

        try {
            const response = await window.api.permit.revoke(permitId)
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Permit revoked successfully"
                })
                loadPermits()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to revoke permit",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to revoke permit",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Permits</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search permits..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="revoked">Revoked</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                    </Select>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                New Permit
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Permit</DialogTitle>
                                <DialogDescription>Create a new permit for a student</DialogDescription>
                            </DialogHeader>
                            <CreatePermitForm onSuccess={loadPermits} setIsDialogOpen={setIsDialogOpen} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Permit Code</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Amount Paid</TableHead>
                                <TableHead>Issued By</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permits.map(permit => (
                                <TableRow key={permit.id}>
                                    <TableCell className="font-medium">{permit.originalCode}</TableCell>
                                    <TableCell>
                                        {permit.student.name} ({permit.student.studentId})
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                permit.status === "active"
                                                    ? "bg-green-100 text-green-800"
                                                    : permit.status === "revoked"
                                                      ? "bg-red-100 text-red-800"
                                                      : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {permit.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{format(new Date(permit.startDate), "MMM d, yyyy")}</TableCell>
                                    <TableCell>{format(new Date(permit.expiryDate), "MMM d, yyyy")}</TableCell>
                                    <TableCell>${permit.amountPaid.toFixed(2)}</TableCell>
                                    <TableCell>{permit.issuedBy?.username || "Unknown"}</TableCell>
                                    <TableCell>
                                        {permit.status === "active" && (
                                            <Button variant="destructive" size="sm" onClick={() => handleRevoke(permit.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
