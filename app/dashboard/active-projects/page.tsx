
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, MapPin } from "lucide-react"

const activeProjects = [
    {
        id: 1,
        name: "Luxury Villa Construction",
        area: "Indiranagar",
        status: "Ongoing",
        duration: "12 months",
        labourers: 15,
        progress: 45,
    },
    {
        id: 2,
        name: "Tech Park Renovation",
        area: "Whitefield",
        status: "Starting Soon",
        duration: "6 months",
        labourers: 8,
        progress: 5,
    },
    {
        id: 3,
        name: "Residential Apartment Block",
        area: "Yelahanka",
        status: "Ongoing",
        duration: "18 months",
        labourers: 42,
        progress: 25,
    },
    {
        id: 4,
        name: "Commercial Complex",
        area: "HSR Layout",
        status: "Ongoing",
        duration: "10 months",
        labourers: 20,
        progress: 60,
    },
    {
        id: 5,
        name: "Gated Community Landscape",
        area: "Electronic City",
        status: "Finishing",
        duration: "4 months",
        labourers: 12,
        progress: 90,
    },
]

export default function ActiveProjectsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Active Projects</h1>
                <p className="text-muted-foreground">Monitor the progress and details of your ongoing construction sites.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProjects.map((project) => (
                    <Card key={project.id} className="bg-card hover:bg-card/80 transition-colors border-border/50">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {project.area}, Bangalore
                                    </div>
                                </div>
                                <Badge variant={project.status === "Starting Soon" ? "secondary" : "default"} className="ml-2">
                                    {project.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Duration
                                    </div>
                                    <span className="font-medium">{project.duration}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                        <Users className="h-4 w-4 mr-2" />
                                        Labourers Assigned
                                    </div>
                                    <span className="font-medium">{project.labourers}</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${project.progress}%` }}
                                        />
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
