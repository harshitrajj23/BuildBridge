
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IndianRupee, TrendingUp, AlertTriangle, Info, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export function ProjectCostPrediction() {
    // Static mock data
    const prediction = {
        minCost: "45,00,000",
        maxCost: "52,50,000",
        riskLevel: "Medium",
        riskScore: 65, // 0-100
        factors: [
            { name: "Labour Demand", impact: "High", trend: "increasing" },
            { name: "Project Duration", impact: "Medium", trend: "stable" },
            { name: "Material Costs", impact: "Low", trend: "stable" },
        ]
    }

    return (
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <IndianRupee className="h-24 w-24" />
            </div>

            <CardHeader>
                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <IndianRupee className="h-5 w-5 text-emerald-500" />
                            Project Cost AI
                        </CardTitle>
                        <CardDescription>
                            Predictive cost analysis & risk assessment
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +4.2% Accuracy
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Estimated Total Labour Cost</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold tracking-tight">₹{prediction.minCost}</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-2xl font-semibold text-muted-foreground">₹{prediction.maxCost}</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Info className="h-3 w-3" />
                        Based on current market rates in Whitefield
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-muted-foreground">Overrun Risk Assessment</span>
                        <span className={`font-bold ${prediction.riskLevel === "High" ? "text-red-500" :
                                prediction.riskLevel === "Medium" ? "text-amber-500" : "text-emerald-500"
                            }`}>
                            {prediction.riskLevel} Risk
                        </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${prediction.riskLevel === "Medium"
                                    ? "from-emerald-500 via-yellow-500 to-amber-500"
                                    : "from-emerald-500 to-red-500"
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${prediction.riskScore}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        {/* Markers */}
                        <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-background/50" />
                        <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-background/50" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-semibold mb-2">Influencing Factors</h4>
                    {prediction.factors.map((factor, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/30">
                            <span className="text-muted-foreground">{factor.name}</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs h-5">
                                    {factor.impact} Impact
                                </Badge>
                                {factor.trend === "increasing" && <ArrowUpRight className="h-3 w-3 text-red-400" />}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
