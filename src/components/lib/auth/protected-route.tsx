import { Loader2 } from "lucide-react"
import React from "react"
import { Navigate } from "react-router"
import { usePermissions } from "@/components/hooks/use-permissions"
import { useAuth } from "./auth.context"

interface ProtectedRouteProps {
    children: React.ReactNode
    requiredPermission?: keyof ReturnType<typeof usePermissions>
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth()
    const permissions = usePermissions()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader2 className="w-16 h-16 mx-auto mt-20 text-gray-500 animate-spin" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    // If a specific permission is required, check for it
    if (requiredPermission && !permissions[requiredPermission]()) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
