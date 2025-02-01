import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import { BaseLayout } from "@/layouts/base-layout"

const root = createRoot(document.body)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<h1>Hello</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
