
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertCircle, TrendingUp, BarChart3, Hammer } from "lucide-react"
import { motion } from "framer-motion"

const labourData = [
    {
        area: "Electronic City",
        count: 145,
        maxCount: 200,
        skill: "Masons",
        availability: "High",
        trend: "+12%",
    },
    {
        area: "Whitefield",
        count: 85,
        maxCount: 200,
        skill: "Electricians",
        availability: "Medium",
        trend: "+5%",
    },
    {
        area: "Indiranagar",
        count: 32,
        maxCount: 200,
        skill: "Painters",
        availability: "Low",
        trend: "-8%",
    },
    {
        area: "Yelahanka",
        count: 168,
        maxCount: 200,
        skill: "Carpenters",
        availability: "High",
        trend: "+15%",
    },
    {
        area: "Koramangala",
        count: 45,
        maxCount: 200,
        skill: "Plumbers",
        availability: "Low",
        trend: "-2%",
    },
]

export function SmartLabourPoolAnalyzer() {
    return (
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                            Smart Labour Pool Analyzer
                        </CardTitle>
                        <CardDescription>
                            Real-time labour availability across Bangalore zones
                        </CardDescription>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Live Updates
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {labourData.map((data, index) => (
                        <motion.div
                            key={data.area}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 font-medium">
                                        <span className="text-foreground">{data.area}</span>
                                        {data.availability === "Low" && (
                                            <span className="flex items-center text-xs text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                Shortage
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <span className="flex items-center text-xs">
                                            <Hammer className="h-3 w-3 mr-1" />
                                            {data.skill} Dominant
                                        </span>
                                        <span className={data.availability === "Low" ? "text-red-500 font-bold" : "text-foreground font-semibold"}>
                                            {data.count} Available
                                        </span>
                                    </div>
                                </div>

                                <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full ${data.availability === "Low"
                                            ? "bg-red-500"
                                            : data.availability === "Medium"
                                                ? "bg-yellow-500"
                                                : "bg-emerald-500"
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(data.count / data.maxCount) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

