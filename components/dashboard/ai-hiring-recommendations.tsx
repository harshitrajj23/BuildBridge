"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, MapPin, Briefcase, ChevronRight, Star } from "lucide-react"
import { motion } from "framer-motion"

const recommendations = [
    {
        id: 1,
        role: "Skilled Carpenter",
        name: "Rajesh Kumar",
        area: "Whitefield",
        match: 98,
        reason: "Matches critical shortage in Whitefield project",
        experience: "12 years",
        rating: 4.9,
    },
    {
        id: 2,
        name: "David Fernandes",
        role: "Senior Electrician",
        area: "Hebbal",
        match: 95,
        reason: "High availability during your project timeline",
        experience: "8 years",
        rating: 4.8,
    },
    {
        id: 3,
        role: "Master Mason",
        name: "Siva Reddy",
        area: "Indiranagar",
        match: 92,
        reason: "Previously worked on similar luxury villa projects",
        experience: "15 years",
        rating: 5.0,
    },
]

export function AIHiringRecommendations() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />
                        AI Hiring Recommendations
                    </h2>
                    <p className="text-muted-foreground">
                        Top candidates curated by BuildBridge AI for your specific project needs.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Card className="h-full border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                    {rec.match}% Match
                                </Badge>
                            </div>

                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <Avatar className="h-14 w-14 border-2 border-background shadow-lg">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=worker${rec.id}`} />
                                        <AvatarFallback>{rec.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg leading-none group-hover:text-primary transition-colors">
                                            {rec.role}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{rec.name}</p>
                                        <div className="flex items-center text-xs text-muted-foreground gap-2 pt-1">
                                            <span className="flex items-center">
                                                <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                                                {rec.rating}
                                            </span>
                                            <span>•</span>
                                            <span>{rec.experience} exp</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-background/50 border border-border/50 text-sm space-y-2">
                                        <div className="flex items-start gap-2 text-muted-foreground">
                                            <Briefcase className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span className="text-foreground">{rec.reason}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4 shrink-0" />
                                            <span>Recommended for {rec.area}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        View Profile <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
