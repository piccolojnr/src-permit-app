import { ChevronRight, type LucideIcon } from "lucide-react"
import { useLocation } from "react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/shadcn/ui/sidebar"
import { cn } from "../lib/utils"

export function NavMain({
    items
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const { pathname } = useLocation()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <div key={index}>
                        {item.items ? (
                            <Collapsible
                                key={index}
                                asChild
                                defaultOpen={item.isActive === undefined && pathname.startsWith(item.url) ? true : item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            className={cn(
                                                "flex items-center gap-2",
                                                pathname.startsWith(item.url) && "bg-accent text-accent-foreground hover:bg-accent/80"
                                            )}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem, index) => (
                                                <SidebarMenuSubItem key={index}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a
                                                            href={subItem.url}
                                                            className={cn(
                                                                "flex items-center gap-2",
                                                                pathname === subItem.url && "bg-accent text-accent-foreground hover:bg-accent/80"
                                                            )}
                                                        >
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <a
                                        href={item.url}
                                        className={cn(
                                            "flex items-center gap-2",
                                            pathname === item.url && "bg-accent text-accent-foreground hover:bg-accent/80"
                                        )}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
