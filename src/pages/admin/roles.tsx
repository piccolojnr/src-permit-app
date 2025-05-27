import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { RoleWithPermissions } from "@/renderer/types/window"

export function Roles() {
    const [roles, setRoles] = useState<RoleWithPermissions[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<RoleWithPermissions | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        permissionIds: [] as number[]
    })

    useEffect(() => {
        loadRoles()
    }, [])

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
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = selectedRole ? await window.api.role.update(selectedRole.id, formData) : await window.api.role.create(formData)

            if (response.success) {
                toast({
                    title: "Success",
                    description: `Role ${selectedRole ? "updated" : "created"} successfully`
                })
                setIsDialogOpen(false)
                loadRoles()
            } else {
                toast({
                    title: "Error",
                    description: response.error || `Failed to ${selectedRole ? "update" : "create"} role`,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${selectedRole ? "update" : "create"} role`,
                variant: "destructive"
            })
        }
    }

    const handleDelete = async (roleId: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return

        try {
            const response = await window.api.role.delete(roleId)
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Role deleted successfully"
                })
                loadRoles()
            } else {
                toast({
                    title: "Error",
                    description: response.error || "Failed to delete role",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete role",
                variant: "destructive"
            })
        }
    }

    const openEditDialog = (role: RoleWithPermissions) => {
        setSelectedRole(role)
        setFormData({
            name: role.name,
            description: role.description || "",
            permissionIds: role.permissions.map(p => p.permission.id)
        })
        setIsDialogOpen(true)
    }

    const openCreateDialog = () => {
        setSelectedRole(null)
        setFormData({
            name: "",
            description: "",
            permissionIds: []
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Role
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedRole ? "Edit Role" : "Create Role"}</DialogTitle>
                            <DialogDescription>{selectedRole ? "Update role details and permissions" : "Create a new role"}</DialogDescription>
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
                                <Button type="submit">{selectedRole ? "Update Role" : "Create Role"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {roles.map(role => (
                <Card key={role.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xl font-bold">{role.name}</CardTitle>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(role)}>
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(role.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{role.description || "No description provided"}</p>
                        <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map(({ permission }) => (
                                    <span
                                        key={permission.id}
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        {permission.name}
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
