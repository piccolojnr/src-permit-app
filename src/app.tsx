import { Loader2 } from "lucide-react"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AuthProvider, useAuth } from "@/components/lib/auth/auth.context"
import { ProtectedRoute } from "@/components/lib/auth/protected-route"
import { Toaster } from "@/components/shadcn/ui/toaster"
import { BaseLayout } from "@/layouts/base-layout"
import { Permissions } from "@/pages/admin/permissions"
import { Roles } from "@/pages/admin/roles"
import { Users } from "@/pages/admin/users"
import { Login } from "@/pages/auth/login"
// Import pages
import { Dashboard } from "@/pages/dashboard"
import { Permits } from "@/pages/permits"
import { Reports } from "@/pages/reports"
import { Settings } from "@/pages/settings"
import { Students } from "@/pages/students"
import { StudentDetails } from "@/pages/students/student-details"
import { Search } from "@/pages/search"
import { NotFound } from "./pages/not-found"

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

                        {/* Search Route */}
                        <Route
                            path="search"
                            element={
                                <ProtectedRoute>
                                    <Search />
                                </ProtectedRoute>
                            }
                        />

                        {/* Permits Routes */}
                        <Route
                            path="permits"
                            element={
                                <ProtectedRoute requiredPermission="canViewPermits">
                                    <Permits />
                                </ProtectedRoute>
                            }
                        />

                        {/* Students Routes */}
                        <Route
                            path="students"
                            element={
                                <ProtectedRoute requiredPermission="canViewStudents">
                                    <Students />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="students/:id"
                            element={
                                <ProtectedRoute requiredPermission="canViewStudents">
                                    <StudentDetails />
                                </ProtectedRoute>
                            }
                        />

                        {/* Settings Routes */}
                        <Route path="settings">
                            <Route
                                index
                                element={
                                    <ProtectedRoute requiredPermission="canManageSettings">
                                        <Settings />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="reports"
                                element={
                                    <ProtectedRoute requiredPermission="canViewReports">
                                        <Reports />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="admin">
                            <Route
                                path="users"
                                element={
                                    <ProtectedRoute requiredPermission="canManageUsers">
                                        <Users />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="roles"
                                element={
                                    <ProtectedRoute requiredPermission="canManageRoles">
                                        <Roles />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="permissions"
                                element={
                                    <ProtectedRoute requiredPermission="canManagePermissions">
                                        <Permissions />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <Toaster />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
