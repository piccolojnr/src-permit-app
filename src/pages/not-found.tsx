import { Link } from "react-router"
import { Button } from "@/components/shadcn/ui/button"

export function NotFound() {
    return (
        <div className="container flex h-full w-full flex-col items-center justify-center">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">404 - Page Not Found</h1>
                <p className="max-w-[750px] text-md text-muted-foreground sm:text-sm">The page you're looking for doesn't exist or has been moved.</p>
                <Button asChild className="mt-4 rounded-md">
                    <Link to="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}
