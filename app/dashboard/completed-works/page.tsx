import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompletedWorksPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Completed Works</h1>

            <Card className="bg-[#1a1d26] border-white/10 text-white">
                <CardHeader>
                    <CardTitle>Work History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        View your complete history of completed jobs and projects here.
                    </p>
                    <div className="mt-8 p-12 text-center rounded-lg border border-dashed border-white/10 bg-white/5">
                        <p className="text-sm text-muted-foreground">No completed works found for this period.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
