import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/shadcn/ui/badge"

interface SystemStatus {
    status: "operational" | "degraded" | "maintenance"
    message: string
    lastChecked: Date
}

export function SystemStatus() {
    const [status, setStatus] = useState<SystemStatus>({
        status: "operational",
        message: "All systems operational",
        lastChecked: new Date()
    })

    useEffect(() => {
        const checkSystemStatus = async () => {
            try {
                // In a real application, this would be an API call
                const response = await window.api.dashboard.getStats()
                if (response.success) {
                    setStatus({
                        status: "operational",
                        message: "All systems operational",
                        lastChecked: new Date()
                    })
                } else {
                    setStatus({
                        status: "degraded",
                        message: "Some services may be affected",
                        lastChecked: new Date()
                    })
                }
            } catch (error) {
                setStatus({
                    status: "degraded",
                    message: "System check failed",
                    lastChecked: new Date()
                })
            }
        }

        checkSystemStatus()
        const interval = setInterval(checkSystemStatus, 300000) // Check every 5 minutes
        return () => clearInterval(interval)
    }, [])

    const getStatusIcon = () => {
        switch (status.status) {
            case "operational":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "degraded":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            case "maintenance":
                return <Clock className="h-4 w-4 text-blue-500" />
        }
    }

    const getStatusColor = () => {
        switch (status.status) {
            case "operational":
                return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
            case "degraded":
                return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
            case "maintenance":
                return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
        }
    }

    return (
        <Badge variant="outline" className={`flex items-center gap-1.5 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-xs font-medium">{status.message}</span>
        </Badge>
    )
} 