"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, IndianRupee, AlertCircle, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

const budgetDriftData = [
    {
        id: 1,
        name: "2BHK Renovation – Whitefield",
        originalBudget: 1500000,
        projectedCost: 1545000,
        drift: 3,
        status: "Safe",
        drivers: [
            { label: "Materials", impact: 2 },
            { label: "Labour", impact: 1 },
        ],
    },
    {
        id: 2,
        name: "Villa Painting – Indiranagar",
        originalBudget: 450000,
        projectedCost: 495000,
        drift: 10,
        status: "Warning",
        drivers: [
            { label: "Materials", impact: 6 },
            { label: "Labour", impact: 4 },
        ],
    },
    {
        id: 3,
        name: "Kitchen Remodel – HSR",
        originalBudget: 900000,
        projectedCost: 882000,
        drift: -2,
        status: "Safe",
        drivers: [
            { label: "Labour Efficiency", impact: -2 },
        ],
    },
    {
        id: 4,
        name: "Office Fit-out – Electronic City",
        originalBudget: 4500000,
        projectedCost: 5175000,
        drift: 15,
        status: "Risk",
        drivers: [
            { label: "Delays", impact: 8 },
            { label: "Labour", impact: 4 },
            { label: "Materials", impact: 3 },
        ],
    },
]

export function SmartBudgetDriftMonitor() {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val)
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Safe":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            case "Warning":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20"
            case "Risk":
                return "bg-red-500/10 text-red-500 border-red-500/20"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-blue-500" />
                        Smart Budget Drift Monitor
                    </h2>
                    <p className="text-muted-foreground">
                        Financial oversight and cost deviation analysis for your Bangalore projects.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgetDriftData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all overflow-hidden">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-base font-bold">{project.name}</CardTitle>
                                <Badge variant="outline" className={`${getStatusStyles(project.status)} uppercase text-[10px] tracking-widest font-bold`}>
                                    {project.status === "Safe" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                    {project.status === "Warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                                    {project.status === "Risk" && <AlertCircle className="h-3 w-3 mr-1" />}
                                    {project.status}
                                </Badge>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Original Budget</p>
                                        <p className="text-lg font-bold">{formatCurrency(project.originalBudget)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Projected Cost</p>
                                        <p className={`text-lg font-bold ${project.drift > 10 ? 'text-red-500' : project.drift > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                            {formatCurrency(project.projectedCost)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1 rounded-md ${project.drift > 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                {project.drift > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                            </div>
                                            <span className="text-xs font-bold">Budget Drift</span>
                                        </div>
                                        <span className={`text-sm font-black ${project.drift > 10 ? 'text-red-500' : project.drift > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                            {project.drift > 0 ? '+' : ''}{project.drift}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={Math.min(100, Math.max(0, 100 + project.drift))}
                                        className="h-1.5"
                                    />
                                    {/* Subtle marker for 100% (Original Budget) */}
                                    <div className="relative w-full h-1">
                                        <div className="absolute left-full -translate-x-full top-0 h-1 w-[2px] bg-primary/20" style={{ left: '100%' }} />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Top Cost Drivers</p>
                                    <div className="space-y-2">
                                        {project.drivers.map((driver, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                                    <span className="text-muted-foreground">{driver.label}</span>
                                                </div>
                                                <span className={`font-medium ${driver.impact > 0 ? 'text-foreground' : 'text-emerald-500'}`}>
                                                    {driver.impact > 0 ? '+' : ''}{driver.impact}% impact
                                                </span>
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
