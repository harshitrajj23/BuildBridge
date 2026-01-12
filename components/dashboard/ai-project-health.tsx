"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, CheckCircle2, Clock, Zap, ArrowRight, Activity } from "lucide-react"
import { motion } from "framer-motion"

const projectHealthData = [
    {
        id: 1,
        name: "2BHK Renovation – Whitefield",
        score: 85,
        risk: "Low",
        riskColor: "text-emerald-500",
        riskBg: "bg-emerald-500/10",
        explanation: "Material procurement is 90% complete. Labour attendance is consistent. Only minor final finishing touches remaining.",
        actions: ["Approve final fixture selection", "Schedule final inspection"],
    },
    {
        id: 2,
        name: "Villa Painting – Indiranagar",
        score: 42,
        risk: "Medium",
        riskColor: "text-amber-500",
        riskBg: "bg-amber-500/10",
        explanation: "Unpredictable rain patterns in Indiranagar may delay exterior coat drying. Increased humidity detected.",
        actions: ["Discuss monsoon covering options", "Review revised timeline"],
    },
    {
        id: 3,
        name: "Kitchen Remodel – HSR",
        score: 94,
        risk: "Low",
        riskColor: "text-emerald-500",
        riskBg: "bg-emerald-500/10",
        explanation: "Project is ahead of schedule. Cabinet installation completed 2 days early. Quality checks passed.",
        actions: ["Prepare for handover", "Finalize balance payment"],
    },
    {
        id: 4,
        name: "Office Fit-out – Electronic City",
        score: 28,
        risk: "High",
        riskColor: "text-red-500",
        riskBg: "bg-red-500/10",
        explanation: "Critical delay in HVAC unit delivery. Site access restricted due to local road work in Electronic City Phase 1.",
        actions: ["Contact logistics partner", "Assess alternative vendor for HVAC", "Re-route material delivery"],
    },
]

export function AIProjectHealth() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Brain className="h-6 w-6 text-purple-500" />
                        AI Project Health Insight
                    </h2>
                    <p className="text-muted-foreground">
                        Predictive analysis of your ongoing projects in Bangalore.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projectHealthData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-all overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <Badge variant="outline" className={`${project.riskBg} ${project.riskColor} border-transparent gap-1`}>
                                    {project.risk === "Low" && <CheckCircle2 className="h-3 w-3" />}
                                    {project.risk === "Medium" && <Clock className="h-3 w-3" />}
                                    {project.risk === "High" && <AlertTriangle className="h-3 w-3" />}
                                    {project.risk} Risk
                                </Badge>
                            </div>

                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg pr-20">{project.name}</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="relative h-16 w-16 flex items-center justify-center">
                                            <svg className="h-16 w-16 -rotate-90">
                                                <circle
                                                    cx="32"
                                                    cy="32"
                                                    r="28"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    className="text-muted/20"
                                                />
                                                <circle
                                                    cx="32"
                                                    cy="32"
                                                    r="28"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    strokeDasharray={175.9}
                                                    strokeDashoffset={175.9 * (1 - project.score / 100)}
                                                    strokeLinecap="round"
                                                    className={project.score > 70 ? "text-emerald-500" : project.score > 40 ? "text-amber-500" : "text-red-500"}
                                                />
                                            </svg>
                                            <span className="absolute text-sm font-bold">{project.score}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 font-semibold">Health Score</span>
                                    </div>

                                    <div className="flex-1 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                        <div className="flex items-start gap-2">
                                            <Zap className="h-3.5 w-3.5 text-purple-500 mt-0.5 shrink-0" />
                                            <p className="text-xs text-foreground/80 leading-relaxed italic">
                                                "{project.explanation}"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                        <Activity className="h-3 w-3" />
                                        Recommended Actions
                                    </p>
                                    <div className="grid gap-2">
                                        {project.actions.map((action, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors group cursor-pointer">
                                                <span className="text-xs font-medium">{action}</span>
                                                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                            </div>
                                        ))}
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
