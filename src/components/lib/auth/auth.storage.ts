// src/main/auth-storage.ts
import fs from "fs"
import path from "path"
import { app } from "electron"

const filePath = path.join(app.getPath("userData"), "auth.json")

export const saveToken = (token: string) => {
    fs.writeFileSync(filePath, JSON.stringify({ token }), "utf-8")
}

export const loadToken = (): string | null => {
    try {
        const data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data).token
    } catch {
        return null
    }
}

export const clearToken = () => {
    try {
        fs.unlinkSync(filePath)
    } catch { }
}
