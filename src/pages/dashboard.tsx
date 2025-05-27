import { Users, FileCheck, AlertCircle, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { usePermissions } from "@/components/hooks/use-permissions"
import { toast } from "@/components/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"

interface Stats {
    totalStudents: number
    activePermits: number
    expiringSoon: number
    totalRevenue: number
}

export function Dashboard() {
    const [stats, setStats] = useState<Stats>({
        totalStudents: 0,
        activePermits: 0,
        expiringSoon: 0,
        totalRevenue: 0
    })
    const [isLoading, setIsLoading] = useState(true)
    const permissions = usePermissions()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get permit statistics
                const response = await window.api.permit.stats()
                if (response.success && response.data) {
                    const stats = response.data.reduce(
                        (acc: any, curr: any) => {
                            if (curr.status === "active") {
                                acc.activePermits = curr._count
                            }
                            acc.totalPermits = (acc.totalPermits || 0) + curr._count
                            return acc
                        },
                        { totalPermits: 0, activePermits: 0 }
                    )

                    // Get total students
                    const studentsResponse = await window.api.student.search("")
                    if (studentsResponse.success && studentsResponse.data) {
                        stats.totalStudents = studentsResponse.data.length
                        stats.totalRevenue = studentsResponse.data.reduce((sum: number, student: any) => {
                            return sum + student.permits.reduce((permitSum: number, permit: any) => permitSum + permit.amountPaid, 0)
                        }, 0)
                    }

                    // Get expiring permits
                    const expiringResponse = await window.api.permit.stats()
                    if (expiringResponse.success && expiringResponse.data) {
                        stats.expiringSoon = expiringResponse.data.reduce((count: number, student: any) => {
                            return (
                                count +
                                student.permits.filter((permit: any) => {
                                    const daysElapsed = Math.floor((Date.now() - new Date(permit.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                                    return permit.status === "active" && permit.validityPeriod - daysElapsed <= 7 && permit.validityPeriod - daysElapsed > 0
                                }).length
                            )
                        }, 0)
                    }

                    setStats(stats)
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch dashboard statistics"
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {permissions.canViewStudents() && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                    </CardContent>
                </Card>
            )}
            {permissions.canViewPermits() && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Active Permits</CardTitle>
                        <FileCheck className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activePermits}</div>
                    </CardContent>
                </Card>
            )}
            {permissions.canViewPermits() && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.expiringSoon}</div>
                    </CardContent>
                </Card>
            )}
            {permissions.canViewReports() && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
