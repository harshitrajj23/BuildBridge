"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, User, MapPin, Hammer, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageTransition } from "@/components/common/page-transition"

// Mock data for contacted builders in Bangalore
const contactedBuilders = [
    {
        id: 1,
        name: "Sri Krishna Constructions",
        area: "Whitefield",
        focus: "Residential",
        status: "Responded",
        lastContact: "2 hours ago",
    },
    {
        id: 2,
        name: "Bangalore Infrastructure Group",
        area: "Electronic City",
        focus: "Commercial",
        status: "Pending",
        lastContact: "Yesterday",
    },
    {
        id: 3,
        name: "Deccan Homes & Interiors",
        area: "Indiranagar",
        focus: "Interior",
        status: "Negotiating",
        lastContact: "3 days ago",
    },
    {
        id: 4,
        name: "Yelahanka Builders Guild",
        area: "Yelahanka",
        focus: "Residential",
        status: "Responded",
        lastContact: "5 hours ago",
    },
    {
        id: 5,
        name: "HSR Design Studio",
        area: "HSR Layout",
        focus: "Interior",
        status: "Pending",
        lastContact: "1 week ago",
    },
]

export default function BuildersContactedPage() {
    const router = useRouter()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Responded":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            case "Pending":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20"
            case "Negotiating":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    return (
        <PageTransition>
            <div className="min-h-screen py-12 px-4 md:px-6 bg-background relative overflow-hidden">
                {/* Subtle Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
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
                        <h1 className="text-3xl font-bold mb-2">Builders Contacted</h1>
                        <p className="text-muted-foreground">Manage your conversations and proposals from top builders in Bangalore.</p>
                    </header>

                    <div className="grid gap-4">
                        {contactedBuilders.map((builder, index) => (
                            <motion.div
                                key={builder.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${builder.name}`} />
                                                <AvatarFallback>{builder.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-lg leading-none">{builder.name}</h3>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <MapPin className="h-3 w-3 mr-1 text-primary" />
                                                    {builder.area}, Bangalore
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 md:max-w-2xl">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Skill Focus</p>
                                                <div className="flex items-center text-sm font-medium">
                                                    <Hammer className="h-3 w-3 mr-1.5 text-muted-foreground" />
                                                    {builder.focus}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Response Status</p>
                                                <Badge variant="outline" className={`${getStatusColor(builder.status)} h-6`}>
                                                    {builder.status}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1 hidden md:block">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Last Contact</p>
                                                <div className="flex items-center text-sm font-medium">
                                                    <Clock className="h-3 w-3 mr-1.5 text-muted-foreground" />
                                                    {builder.lastContact}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                Chat
                                            </Button>
                                            <Button size="sm" className="hidden sm:flex">View Detail</Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
