
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Briefcase, CheckCircle2, XCircle } from "lucide-react"

const pendingApprovals = [
    {
        id: 1,
        name: "Manjunath S",
        type: "Labourer",
        role: "Senior Mason",
        project: "Luxury Villa Construction",
        area: "Indiranagar",
        date: "Today, 10:30 AM",
        status: "Pending",
    },
    {
        id: 2,
        name: "Syed Ahmed",
        type: "Labourer",
        role: "Painter",
        project: "Tech Park Renovation",
        area: "Whitefield",
        date: "Yesterday, 4:15 PM",
        status: "Pending",
    },
    {
        id: 3,
        name: "Shiva Kumar",
        type: "Labourer",
        role: "Electrician",
        project: "Residential Apartment Block",
        area: "Yelahanka",
        date: "10 Jan, 11:00 AM",
        status: "Pending",
    },
    {
        id: 4,
        name: "Krishna Moorthy",
        type: "Labourer",
        role: "Helper",
        project: "Commercial Complex",
        area: "HSR Layout",
        date: "09 Jan, 2:30 PM",
        status: "Pending",
    },
]

export default function PendingApprovalsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Pending Approvals</h1>
                <p className="text-muted-foreground">Review and approve labourer applications for your projects.</p>
            </div>

            <div className="space-y-4">
                {pendingApprovals.map((item) => (
                    <Card key={item.id} className="bg-card hover:bg-card/80 transition-colors border-border/50">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${item.id + 10}`} />
                                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                                            <span className="flex items-center">
                                                <Briefcase className="h-3 w-3 mr-1" />
                                                {item.role}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {item.area}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Applied for <span className="text-foreground font-medium">{item.project}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="text-sm text-muted-foreground md:text-right">
                                        <p>Applied on</p>
                                        <p className="font-medium text-foreground">{item.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        <Button variant="outline" className="flex-1 md:flex-none border-red-500/20 hover:bg-red-500/10 hover:text-red-500 text-red-500">
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                        <Button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white">
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
