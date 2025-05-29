import { User } from "@prisma/client"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/shadcn/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/shadcn/ui/sidebar"
import { useAuth } from "../lib/auth/auth.context"
import { getInitials } from "../lib/utils"
import { Badge } from "@/components/shadcn/ui/badge"
import { useState, useEffect } from "react"

export function NavUser() {
    const { isMobile } = useSidebar()
    const { user, logout } = useAuth()
    const [notifications, setNotifications] = useState<{ id: number; message: string; time: string }[]>([])
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
                const response = await window.api.dashboard.getStats()
                if (response.success && response.data) {
                    const expiringPermits = response.data.expiringSoon
                    if (expiringPermits > 0) {
                        setNotifications(prev => [{
                            id: Date.now(),
                            message: `${expiringPermits} permits are expiring soon`,
                            time: 'Just now'
                        }, ...prev])
                        setUnreadCount(prev => prev + 1)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error)
            }
        }

        fetchNotifications()
        // Set up polling for new notifications
        const interval = setInterval(fetchNotifications, 300000) // Check every 5 minutes
        return () => clearInterval(interval)
    }, [])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="relative">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <Badge 
                                    variant="destructive" 
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                                >
                                    {unreadCount}
                                </Badge>
                            )}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                                    <span>{notification.message}</span>
                                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="w-8 h-8 rounded-lg">
                                <AvatarImage src={undefined} alt={user?.username} />
                                <AvatarFallback className="rounded-lg">{getInitials(user?.username || "User")}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-sm leading-tight text-left">
                                <span className="font-semibold truncate">{user?.username}</span>
                                <span className="text-xs truncate">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="w-8 h-8 rounded-lg">
                                    <AvatarImage src={undefined} alt={user?.username} />
                                    <AvatarFallback className="rounded-lg">{getInitials(user?.username || "User")}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-sm leading-tight text-left">
                                    <span className="font-semibold truncate">{user?.username}</span>
                                    <span className="text-xs truncate">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
