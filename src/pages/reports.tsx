import { Download } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"

export function Reports() {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Permit Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Student Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
