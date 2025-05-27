import { User } from "@prisma/client"
import { format } from "date-fns"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/components/hooks/use-toast"
import { Badge } from "@/components/shadcn/ui/badge"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table"
import { RoleWithPermissions } from "@/renderer/types/window"

export function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [roles, setRoles] = useState<RoleWithPermissions[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        roleId: ""
    })

    useEffect(() => {
        loadUsers()
        loadRoles()
    }, [])

    const loadUsers = async () => {
        try {
            const response = await window.api.user.getAll()
            if (response.success) {
                setUsers(response.users || [])
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to load users",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load users",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const loadRoles = async () => {
        try {
            const response = await window.api.role.getAll()
            if (response.success) {
                setRoles(response.role || [])
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to load roles",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load roles",
                variant: "destructive"
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userData = {
                ...formData,
                roleId: parseInt(formData.roleId)
            }

            const response = selectedUser ? await window.api.user.update(selectedUser.id, userData) : await window.api.user.create(userData)

            if (response.success) {
                toast({
                    title: "Success",
                    description: `User ${selectedUser ? "updated" : "created"} successfully`
                })
                setIsDialogOpen(false)
                loadUsers()
            } else {
                toast({
                    title: "Error",
                    description: response.error || `Failed to ${selectedUser ? "update" : "create"} user`,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${selectedUser ? "update" : "create"} user`,
                variant: "destructive"
            })
        }
    }

    const handleDelete = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return

        try {
            const response = await window.api.user.delete(userId)
            if (response.success) {
                toast({
                    title: "Success",
                    description: "User deleted successfully"
                })
                loadUsers()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to delete user",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete user",
                variant: "destructive"
            })
        }
    }

    const openEditDialog = (user: User) => {
        setSelectedUser(user)
        setFormData({
            username: user.username,
            email: user.email,
            password: "", // Don't show password in edit mode
            roleId: user.roleId.toString()
        })
        setIsDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedUser(null)
        setFormData({
            username: "",
            email: "",
            password: "",
            roleId: ""
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedUser ? "Edit User" : "Create User"}</DialogTitle>
                            <DialogDescription>{selectedUser ? "Update user details and role" : "Create a new user account"}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />
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
                                <Label htmlFor="password">{selectedUser ? "New Password (leave blank to keep current)" : "Password"}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required={!selectedUser}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.roleId} onValueChange={value => setFormData({ ...formData, roleId: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role.id} value={role.id.toString()}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button type="submit">{selectedUser ? "Update User" : "Create User"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{roles.find(r => r.id === user.roleId)?.name || "Unknown Role"}</Badge>
                                    </TableCell>
                                    <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
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
        </div>
    )
}
