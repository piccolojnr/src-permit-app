import { BarChart3, FileCheck, Settings2, Users, Shield, KeyRound } from "lucide-react"
import * as React from "react"
import { usePermissions } from "@/components/hooks/use-permissions"
import { NavMain } from "@/components/shadcn/nav-main"
import { NavUser } from "@/components/shadcn/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/shadcn/ui/sidebar"
import { useAuth } from "../lib/auth/auth.context"
import { cn } from "../lib/utils"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open, openMobile } = useSidebar()
    const permissions = usePermissions()

    // This is sample data.
    const navigationData = {
        navMain: [
            {
                title: "Dashboard",
                url: "/",
                icon: BarChart3,
                isActive: true
            },
            {
                title: "Permits",
                url: "/permits",
                icon: FileCheck,
                show: () => permissions.canViewPermits()
            },
            {
                title: "Students",
                url: "/students",
                icon: Users,
                show: () => permissions.canViewStudents()
            },
            {
                title: "Administration",
                url: "/admin",
                icon: Shield,
                show: () => permissions.canManageUsers() || permissions.canManageRoles() || permissions.canManagePermissions(),
                items: [
                    {
                        title: "Users",
                        url: "/admin/users",
                        show: () => permissions.canManageUsers()
                    },
                    {
                        title: "Roles",
                        url: "/admin/roles",
                        show: () => permissions.canManageRoles()
                    },
                    {
                        title: "Permissions",
                        url: "/admin/permissions",
                        show: () => permissions.canManagePermissions()
                    }
                ]
            },
            {
                title: "Settings",
                url: "/settings",
                icon: Settings2,
                show: () => permissions.canViewReports(),
                items: [
                    {
                        title: "Reports",
                        url: "/settings/reports",
                        show: () => permissions.canViewReports()
                    }
                ]
            }
        ]
    }

    // Filter navigation items based on permissions
    const filteredNavItems = navigationData.navMain
        .filter(item => {
            if (item.show) {
                return item.show()
            }
            return true
        })
        .map(item => ({
            ...item,
            items: item.items?.filter(subItem => {
                if (subItem.show) {
                    return subItem.show()
                }
                return true
            })
        }))

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <img
                    src="/assets/knutsford_logo.png"
                    alt="Permit Manager Logo"
                    className={cn("w-8 h-8 rounded-full", open && "hidden", openMobile && "hidden")}
                />
                <div className="flex items-center gap-2 px-4">
                    <img src="/assets/knutsford_logo.png" alt="Permit Manager Logo" className="w-8 h-8 rounded-full" />
                    <h1 className={cn("text-lg font-semibold", !open && !openMobile && "hidden")}>Permit Manager</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
