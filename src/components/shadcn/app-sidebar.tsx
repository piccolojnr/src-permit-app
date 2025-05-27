import { BarChart3, FileCheck, Settings2, Users, Shield, KeyRound } from "lucide-react"
import * as React from "react"
import { NavMain } from "@/components/shadcn/nav-main"
import { NavUser } from "@/components/shadcn/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/shadcn/ui/sidebar"
import { useAuth } from "../lib/auth/auth.context"

// This is sample data.
export const navigationData = {
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
            icon: FileCheck
            // items: [
            //     {
            //         title: "All Permits",
            //         url: "/permits"
            //     },
            //     {
            //         title: "Create Permit",
            //         url: "/permits/create"
            //     },
            //     {
            //         title: "Expiring Soon",
            //         url: "/permits/expiring"
            //     }
            // ]
        },
        {
            title: "Students",
            url: "/students",
            icon: Users
        },
        {
            title: "Administration",
            url: "/admin",
            icon: Shield,
            items: [
                {
                    title: "Users",
                    url: "/admin/users"
                },
                {
                    title: "Roles",
                    url: "/admin/roles"
                },
                {
                    title: "Permissions",
                    url: "/admin/permissions"
                }
            ]
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "/settings"
                },
                {
                    title: "Database",
                    url: "/settings/database"
                }
            ]
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4">
                    <h1 className="text-lg font-semibold">Permit Manager</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigationData.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
