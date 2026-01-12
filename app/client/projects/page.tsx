"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Briefcase, MapPin, User, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageTransition } from "@/components/common/page-transition"

// Mock data for ongoing projects in Bangalore
const ongoingProjects = [
    {
        id: 1,
        title: "2BHK Renovation – Whitefield",
        status: "In Progress",
        builder: "Modern Homes Ltd",
        budgetRange: "₹15L - ₹18L",
        progress: 65,
        location: "Whitefield, Bangalore",
    },
    {
        id: 2,
        title: "Villa Painting – Indiranagar",
        status: "Planning",
        builder: "ColorMasters",
        budgetRange: "₹4L - ₹5L",
        progress: 10,
        location: "Indiranagar, Bangalore",
    },
    {
        id: 3,
        title: "Kitchen Remodel – HSR",
        status: "Near Completion",
        builder: "Elite Interiors",
        budgetRange: "₹8L - ₹10L",
        progress: 90,
        location: "HSR Layout, Bangalore",
    },
    {
        id: 4,
        title: "Office Fit-out – Electronic City",
        status: "In Progress",
        builder: "TechSpace Builders",
        budgetRange: "₹45L - ₹50L",
        progress: 40,
        location: "Electronic City, Bangalore",
    },
]

export default function MyProjectsPage() {
    const router = useRouter()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Planning":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "In Progress":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20"
            case "Near Completion":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    return (
        <PageTransition>
            <div className="min-h-screen py-12 px-4 md:px-6 bg-background relative overflow-hidden">
                {/* Subtle Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
                </div>

                <div className="container max-w-5xl relative z-10">
                    <Button
                        variant="ghost"
                        className="mb-8 gap-2 hover:bg-muted"
                        onClick={() => router.push("/dashboard")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>

                    <header className="mb-10">
                        <h1 className="text-3xl font-bold mb-2">My Projects</h1>
                        <p className="text-muted-foreground">Track the status and progress of your ongoing construction projects in Bangalore.</p>
                    </header>

                    <div className="grid gap-6">
                        {ongoingProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl">{project.title}</CardTitle>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {project.location}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getStatusColor(project.status)}>
                                            {project.status}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                                <div className="p-2 rounded-md bg-background">
                                                    <User className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Builder Assigned</p>
                                                    <p className="font-medium">{project.builder}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                                <div className="p-2 rounded-md bg-background">
                                                    <IndianRupee className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Estimated Budget</p>
                                                    <p className="font-medium">{project.budgetRange}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Overall Progress</span>
                                                <span className="font-medium">{project.progress}%</span>
                                            </div>
                                            <Progress value={project.progress} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
