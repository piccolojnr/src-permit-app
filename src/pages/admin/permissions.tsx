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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table"
import { PermissionWithRoles } from "@/renderer/types/window"

export function Permissions() {
    const [permissions, setPermissions] = useState<PermissionWithRoles[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedPermission, setSelectedPermission] = useState<PermissionWithRoles | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        loadPermissions()
    }, [])

    const loadPermissions = async () => {
        try {
            const response = await window.api.permission.getAll()
            if (response.success) {
                setPermissions(response.permission || [])
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to load permissions",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load permissions",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = selectedPermission
                ? await window.api.permission.update(selectedPermission.id, formData)
                : await window.api.permission.create(formData)

            if (response.success) {
                toast({
                    title: "Success",
                    description: `Permission ${selectedPermission ? "updated" : "created"} successfully`
                })
                setIsDialogOpen(false)
                loadPermissions()
            } else {
                toast({
                    title: "Error",
                    description: response.error || `Failed to ${selectedPermission ? "update" : "create"} permission`,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${selectedPermission ? "update" : "create"} permission`,
                variant: "destructive"
            })
        }
    }

    const handleDelete = async (permissionId: number) => {
        if (!confirm("Are you sure you want to delete this permission?")) return

        try {
            const response = await window.api.permission.delete(permissionId)
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Permission deleted successfully"
                })
                loadPermissions()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to delete permission",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete permission",
                variant: "destructive"
            })
        }
    }

    const openEditDialog = (permission: PermissionWithRoles) => {
        setSelectedPermission(permission)
        setFormData({
            name: permission.name,
            description: permission.description || ""
        })
        setIsDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedPermission(null)
        setFormData({
            name: "",
            description: ""
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Permission Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Permission
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedPermission ? "Edit Permission" : "Create Permission"}</DialogTitle>
                            <DialogDescription>{selectedPermission ? "Update permission details" : "Create a new permission"}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">{selectedPermission ? "Update Permission" : "Create Permission"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {permissions.map(permission => (
                <Card key={permission.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xl font-bold">{permission.name}</CardTitle>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(permission)}>
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(permission.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{permission.description || "No description provided"}</p>
                        <div className="space-y-2">
                            <Label>Assigned to Roles</Label>
                            <div className="flex flex-wrap gap-2">
                                {permission.roles.map(({ role }) => (
                                    <span
                                        key={role.id}
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        {role.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
