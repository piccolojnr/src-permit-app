import { Student } from "@prisma/client"
import { format } from "date-fns"
import { FileUp, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent } from "@/components/shadcn/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/shadcn/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table"

export function Students() {
    const [students, setStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize] = useState(10)
    const [formData, setFormData] = useState({
        studentId: "",
        name: "",
        email: "",
        course: "",
        level: "",
        number: ""
    })

    useEffect(() => {
        loadStudents()
    }, [currentPage, searchQuery])

    const loadStudents = async () => {
        try {
            const response = await window.api.student.getAll({
                page: currentPage,
                pageSize,
                search: searchQuery
            })
            if (response.success && response.data) {
                setStudents(response.data.data)
                setTotalPages(response.data.totalPages)
            } else {
                console.error("Failed to load students:", response.error)
                toast({
                    title: "Error",
                    description: response.error || "Failed to load students",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "Failed to load students",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = selectedStudent ? await window.api.student.update(selectedStudent.id, formData) : await window.api.student.create(formData)

            if (response.success) {
                toast({
                    title: "Success",
                    description: `Student ${selectedStudent ? "updated" : "created"} successfully`
                })
                setIsDialogOpen(false)
                loadStudents()
            } else {
                toast({
                    title: "Error",
                    description: response.error || `Failed to ${selectedStudent ? "update" : "create"} student`,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${selectedStudent ? "update" : "create"} student`,
                variant: "destructive"
            })
        }
    }

    const handleDelete = async (studentId: number) => {
        if (!confirm("Are you sure you want to delete this student?")) return

        try {
            const response = await window.api.student.delete(studentId)
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Student deleted successfully"
                })
                loadStudents()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to delete student",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete student",
                variant: "destructive"
            })
        }
    }

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const content = await file.text()
            const response = await window.api.student.import(content)

            if (response.success && response.data) {
                toast({
                    title: "Import Complete",
                    description: `Successfully imported ${response.data.imported} students. ${response.data.failed} failed.`
                })
                if (response.data.errors.length > 0) {
                    console.error("Import errors:", response.data.errors)
                }
                loadStudents()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to import students",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to import students",
                variant: "destructive"
            })
        }
    }

    const openEditDialog = (student: Student) => {
        setSelectedStudent(student)
        setFormData({
            studentId: student.studentId,
            name: student.name,
            email: student.email,
            course: student.course,
            level: student.level,
            number: student.number
        })
        setIsDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedStudent(null)
        setFormData({
            studentId: "",
            name: "",
            email: "",
            course: "",
            level: "",
            number: ""
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateDialog}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{selectedStudent ? "Edit Student" : "Add Student"}</DialogTitle>
                                <DialogDescription>{selectedStudent ? "Update student information" : "Add a new student to the system"}</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="studentId">Student ID</Label>
                                    <Input
                                        id="studentId"
                                        value={formData.studentId}
                                        onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="course">Course</Label>
                                    <Input id="course" value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Level</Label>
                                    <Input id="level" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="number">Phone Number</Label>
                                    <Input id="number" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} required />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">{selectedStudent ? "Update Student" : "Add Student"}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <div className="relative">
                        <Input type="file" accept=".csv" className="hidden" id="import-file" onChange={handleImport} />
                        <Button variant="outline" onClick={() => document.getElementById("import-file")?.click()}>
                            <FileUp className="w-4 h-4 mr-2" />
                            Import
                        </Button>
                    </div>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.studentId}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell>{student.level}</TableCell>
                                    <TableCell>{student.number}</TableCell>
                                    <TableCell>{format(new Date(student.createdAt), "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditDialog(student)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(student.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
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
