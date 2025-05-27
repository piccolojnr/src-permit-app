import { Loader2 } from "lucide-react"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AuthProvider, useAuth } from "@/components/lib/auth/auth.context"
import { Toaster } from "@/components/shadcn/ui/toaster"
import { BaseLayout } from "@/layouts/base-layout"
import { Login } from "@/pages/auth/login"
// Import pages
import { Dashboard } from "@/pages/dashboard"
import { Permits } from "@/pages/permits"
import { Reports } from "@/pages/reports"
import { Settings } from "@/pages/settings"
import { Students } from "@/pages/students"
import { Users } from "@/pages/admin/users"
import { Roles } from "@/pages/admin/roles"
import { Permissions } from "@/pages/admin/permissions"
import { NotFound } from "./pages/not-found"

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()

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
    return <>{children}</>
}

const root = createRoot(document.body)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <BaseLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="permits" element={<Permits />} />
                        <Route path="students" element={<Students />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<Settings />} />
                        {/* Admin Routes */}
                        <Route path="admin">
                            <Route path="users" element={<Users />} />
                            <Route path="roles" element={<Roles />} />
                            <Route path="permissions" element={<Permissions />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <Toaster />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
