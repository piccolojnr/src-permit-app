"use client"

import type { Student } from "@prisma/client"
import { format } from "date-fns"
import { MenuIcon, Pencil, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent } from "@/components/shadcn/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/shadcn/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table"

interface StudentTableProps {
    students: Student[]
    canManageStudents: boolean
    canCreatePermits: boolean
    onEdit: (student: Student) => void
    onDelete: (studentId: string) => void
    onCreatePermit: (student: Student) => void
}

export function StudentTable({ students, canManageStudents, canCreatePermits, onEdit, onDelete, onCreatePermit }: StudentTableProps) {
    return (
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
                            {(canManageStudents || canCreatePermits) && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell>
                                    <Link to={`/students/${student.studentId}`} className="text-blue-600 hover:underline">
                                        {student.studentId}
                                    </Link>
                                </TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.course}</TableCell>
                                <TableCell>{student.level}</TableCell>
                                <TableCell>{student.number}</TableCell>
                                <TableCell>{format(new Date(student.createdAt), "MMM d, yyyy")}</TableCell>
                                {(canManageStudents || canCreatePermits) && (
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <MenuIcon className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {canManageStudents && (
                                                    <>
                                                        <DropdownMenuItem onClick={() => onEdit(student)}>
                                                            <Pencil className="w-4 h-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onDelete(student.studentId)} className="text-red-600">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                {canCreatePermits && (
                                                    <DropdownMenuItem>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="justify-start w-full h-auto p-0"
                                                            onClick={() => onCreatePermit(student)}
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            New Permit
                                                        </Button>
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
