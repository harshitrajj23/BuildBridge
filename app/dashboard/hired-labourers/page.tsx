
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, IndianRupee, Briefcase, Star } from "lucide-react"

const hiredLabourers = [
    {
        id: 1,
        name: "Ramesh Kumar",
        skill: "Mason",
        area: "Hebbal",
        experience: "8 years",
        wage: 850,
        rating: 4.8,
        status: "Active",
    },
    {
        id: 2,
        name: "Suresh Reddy",
        skill: "Electrician",
        area: "HSR Layout",
        experience: "5 years",
        wage: 950,
        rating: 4.5,
        status: "Active",
    },
    {
        id: 3,
        name: "Amit Singh",
        skill: "Painter",
        area: "Indiranagar",
        experience: "3 years",
        wage: 700,
        rating: 4.2,
        status: "On Leave",
    },
    {
        id: 4,
        name: "Venkatesh M.",
        skill: "Plumber",
        area: "Whitefield",
        experience: "10 years",
        wage: 900,
        rating: 4.9,
        status: "Active",
    },
    {
        id: 5,
        name: "John Joseph",
        skill: "Carpenter",
        area: "Electronic City",
        experience: "6 years",
        wage: 800,
        rating: 4.6,
        status: "Active",
    },
    {
        id: 6,
        name: "Rajesh Gowda",
        skill: "Mason",
        area: "Yelahanka",
        experience: "12 years",
        wage: 900,
        rating: 4.7,
        status: "Active",
    },
]

export default function HiredLabourersPage() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Hired Labourers</h1>
                <p className="text-muted-foreground">Manage your team of skilled workforce across all your sites.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hiredLabourers.map((labourer) => (
                    <Card key={labourer.id} className="bg-card hover:border-primary/50 transition-all cursor-pointer group">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${labourer.id}`} />
                                        <AvatarFallback>{labourer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{labourer.name}</CardTitle>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Briefcase className="h-3 w-3 mr-1" />
                                            {labourer.skill}
                                        </div>
                                    </div>
                                </div>
                                <Badge variant={labourer.status === "Active" ? "default" : "secondary"}>
                                    {labourer.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        Location
                                    </div>
                                    <div className="font-medium">{labourer.area}</div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground">
                                        <Star className="h-3 w-3 mr-1" />
                                        Experience
                                    </div>
                                    <div className="font-medium">{labourer.experience}</div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground">
                                        <IndianRupee className="h-3 w-3 mr-1" />
                                        Daily Wage
                                    </div>
                                    <div className="font-medium">₹{labourer.wage}/day</div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground">
                                        <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                                        Rating
                                    </div>
                                    <div className="font-medium">{labourer.rating}/5.0</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
