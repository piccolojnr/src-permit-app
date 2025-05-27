import { Plus } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"

export function Permits() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Permits</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Permit
                </Button>
            </div>
            <div className="rounded-md border">
                {/* DataTable component will go here */}
                <div className="p-4 text-center text-muted-foreground">Permit data table will be implemented here</div>
            </div>
        </div>
    )
}
