
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, HardHat, FileCheck, Check, Info } from "lucide-react"

export function TrustAndCompliance() {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                            Trust & Compliance
                        </CardTitle>
                        <CardDescription>
                            Workforce verification & safety status
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-blue-500 border-blue-500/20 bg-blue-500/10">
                        Verified
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Metric 1 */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                <Check className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Verified Labour</p>
                                <p className="text-xs text-muted-foreground">Identity & Background</p>
                            </div>
                        </div>
                        <span className="text-lg font-bold text-emerald-500">96%</span>
                    </div>

                    {/* Metric 2 */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                                <HardHat className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Safety Trained</p>
                                <p className="text-xs text-muted-foreground">Certified in Safety</p>
                            </div>
                        </div>
                        <span className="text-lg font-bold text-orange-500">85%</span>
                    </div>

                    {/* Metric 3 */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center">
                                <FileCheck className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Insurance</p>
                                <p className="text-xs text-muted-foreground">Workmen Comp.</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20 pointer-events-none">
                            Active Coverage
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <Info className="h-3 w-3" />
                        <p>Metrics updated daily based on active sites in Bangalore.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
