
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, MapPin, AlertTriangle, CheckCircle2, Clock, Users, ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
    {
        id: 1,
        name: "Luxury Villa Estate",
        area: "Indiranagar",
        status: "On Track",
        statusColor: "text-emerald-500",
        labourAvailability: 92,
        aiFocus: true,
        insights: "Optimal weather for exterior work this week.",
        completion: 65,
    },
    {
        id: 2,
        name: "Tech Hub Phase 2",
        area: "Whitefield",
        status: "At Risk",
        statusColor: "text-amber-500",
        labourAvailability: 45,
        aiFocus: false,
        insights: "Shortage of electricians predicted in 2 days.",
        completion: 40,
    },
    {
        id: 3,
        name: "Greenfield Apartments",
        area: "HSR Layout",
        status: "Delayed",
        statusColor: "text-red-500",
        labourAvailability: 20,
        aiFocus: false,
        insights: "Material delivery delayed by traffic conditions.",
        completion: 85,
    },
    {
        id: 4,
        name: "North Gate Commercial",
        area: "Hebbal",
        status: "On Track",
        statusColor: "text-emerald-500",
        labourAvailability: 88,
        aiFocus: false,
        insights: "Labour efficiency up by 15% this month.",
        completion: 25,
    },
]

export function AIProjectCommandCenter() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Brain className="h-6 w-6 text-purple-500" />
                        AI Project Command Center
                    </h2>
                    <p className="text-muted-foreground">
                        Real-time project health monitoring and labour optimization insights.
                    </p>
                </div>
                <Button variant="outline" className="hidden md:flex gap-2">
                    View All Projects <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Card
                            className={`
                h-full relative overflow-hidden transition-all duration-300 group hover:shadow-md border-border
                ${project.aiFocus
                                    ? "border-purple-500/30 bg-purple-500/5"
                                    : "hover:border-primary/30"
                                }
              `}
                        >
                            {project.aiFocus && (
                                <div className="absolute top-0 right-0 p-2">
                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 gap-1">
                                        <Zap className="h-3 w-3 fill-current" />
                                        AI Focus
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="pb-3 pt-6">
                                <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {project.area}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <div className="flex items-center gap-1.5 font-medium">
                                        {project.status === "On Track" && <CheckCircle2 className={`h-4 w-4 ${project.statusColor}`} />}
                                        {project.status === "At Risk" && <AlertTriangle className={`h-4 w-4 ${project.statusColor}`} />}
                                        {project.status === "Delayed" && <Clock className={`h-4 w-4 ${project.statusColor}`} />}
                                        <span className={project.statusColor}>{project.status}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Labour Availability</span>
                                        <span>{project.labourAvailability}%</span>
                                    </div>
                                    <Progress value={project.labourAvailability} className="h-1.5" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Completion</span>
                                        <span>{project.completion}%</span>
                                    </div>
                                    <Progress value={project.completion} className="h-1.5 bg-secondary" />
                                </div>

                                <div className={`
                  p-3 rounded-lg text-xs mt-4
                  ${project.aiFocus ? "bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300" : "bg-muted/50 text-muted-foreground"}
                `}>
                                    <div className="flex gap-2 items-start">
                                        <Brain className="h-3.5 w-3.5 mt-0.5 shrink-0 opactiy-70" />
                                        <p>{project.insights}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
