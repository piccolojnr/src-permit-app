import { Outlet, useLocation } from "react-router"
import { AppSidebar } from "@/components/shadcn/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcn/ui/breadcrumb"
import { Separator } from "@/components/shadcn/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/shadcn/ui/sidebar"

export const BaseLayout = () => {
    const { pathname } = useLocation()
    const endpoints = pathname.split("/").filter(Boolean)
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-4 mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                                {endpoints.map((endpoint, index) => (
                                    <div key={index} className="flex items-center">
                                        <BreadcrumbItem key={index} className="hidden md:block">
                                            <BreadcrumbLink href={`/${endpoints.slice(0, index + 1).join("/")}`}>
                                                {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {index < endpoints.length - 1 && <BreadcrumbSeparator className="hidden mt-1 md:block" />}
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
