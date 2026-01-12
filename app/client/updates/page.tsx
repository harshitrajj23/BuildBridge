"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, FileText, MapPin, CheckCircle2, Truck, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/common/page-transition"

// Mock updates for Bangalore projects
const projectUpdates = [
    {
        id: 1,
        title: "Builder shared updated quotation",
        time: "10:30 AM Today",
        project: "2BHK Renovation – Whitefield",
        icon: FileText,
        type: "document",
    },
    {
        id: 2,
        title: "Site visit completed in Indiranagar",
        time: "Yesterday, 4:00 PM",
        project: "Villa Painting – Indiranagar",
        icon: MapPin,
        type: "activity",
    },
    {
        id: 3,
        title: "Payment milestone approved",
        time: "Jan 10, 11:20 AM",
        project: "Kitchen Remodel – HSR",
        icon: CheckCircle2,
        type: "payment",
    },
    {
        id: 4,
        title: "Material delivery scheduled",
        time: "Jan 10, 9:00 AM",
        project: "2BHK Renovation – Whitefield",
        icon: Truck,
        type: "logistics",
    },
    {
        id: 5,
        title: "Architectural drawing finalized",
        time: "Jan 8, 2:15 PM",
        project: "Office Fit-out – Electronic City",
        icon: HardHat,
        type: "design",
    },
    {
        id: 6,
        title: "Initial site inspection done",
        time: "Jan 5, 10:00 AM",
        project: "Office Fit-out – Electronic City",
        icon: MapPin,
        type: "activity",
    },
]

export default function ProjectUpdatesPage() {
    const router = useRouter()

    const getTypeStyles = (type: string) => {
        switch (type) {
            case "document":
                return "bg-blue-500/10 text-blue-500"
            case "activity":
                return "bg-purple-500/10 text-purple-500"
            case "payment":
                return "bg-emerald-500/10 text-emerald-500"
            case "logistics":
                return "bg-amber-500/10 text-amber-500"
            case "design":
                return "bg-indigo-500/10 text-indigo-500"
            default:
                return "bg-gray-500/10 text-gray-500"
        }
    }

    return (
        <PageTransition>
            <div className="min-h-screen py-12 px-4 md:px-6 bg-background relative overflow-hidden">
                {/* Subtle Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
                </div>

                <div className="container max-w-3xl relative z-10">
                    <Button
                        variant="ghost"
                        className="mb-8 gap-2 hover:bg-muted"
                        onClick={() => router.push("/dashboard")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>

                    <header className="mb-10 text-center">
                        <h1 className="text-3xl font-bold mb-2">Project Updates</h1>
                        <p className="text-muted-foreground">Stay informed with real-time updates from your ongoing projects in Bangalore.</p>
                    </header>

                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border/50 hidden sm:block" />

                        <div className="space-y-8">
                            {projectUpdates.map((update, index) => (
                                <motion.div
                                    key={update.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="relative sm:pl-16"
                                >
                                    <div className={`
                    absolute left-6 sm:left-[2.15rem] top-0 w-4 h-4 rounded-full border-2 border-background 
                    ${getTypeStyles(update.type).split(" ")[1].replace("text-", "bg-")}
                    z-10 hidden sm:block
                  `} />

                                    <Card className="border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-2 rounded-lg shrink-0 ${getTypeStyles(update.type)}`}>
                                                    <update.icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                                        <h3 className="font-bold text-foreground leading-tight">
                                                            {update.title}
                                                        </h3>
                                                        <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {update.time}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-primary font-medium">
                                                        {update.project}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
