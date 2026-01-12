
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, PlayCircle } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
    { id: 1, label: "Project Posted", date: "Jan 10" },
    { id: 2, label: "Labour Shortlisted", date: "Jan 11" },
    { id: 3, label: "Labour Hired", date: "Today" },
    { id: 4, label: "Work Started", date: "Est. Jan 14" },
    { id: 5, label: "Payment Released", date: "Est. Jan 30" },
]

const currentStepIndex = 2 // 0-based index, so "Labour Hired" is active

export function BuilderActionTimeline() {
    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden relative">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        Current Project Status
                    </h3>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary animate-pulse">
                        Next Action: Start work validation in 2 days
                    </div>
                </div>

                <div className="relative">
                    {/* Connecting Line - Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full hidden md:block" />

                    {/* Connecting Line - Progress */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full hidden md:block"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />

                    <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
                        {steps.map((step, index) => {
                            const isCompleted = index < currentStepIndex
                            const isCurrent = index === currentStepIndex
                            const isFuture = index > currentStepIndex

                            return (
                                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-2 group">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative
                                    ${isCompleted ? "bg-primary border-primary text-primary-foreground" : ""}
                                    ${isCurrent ? "bg-background border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" : ""}
                                    ${isFuture ? "bg-background border-muted text-muted-foreground" : ""}
                                `}
                                    >
                                        {isCompleted ? (
                                            <Check className="h-5 w-5" />
                                        ) : isCurrent ? (
                                            <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
                                        ) : (
                                            <span className="text-xs font-medium">{index + 1}</span>
                                        )}
                                    </motion.div>
                                    <div className={`text-left md:text-center space-y-0.5 ${isCurrent ? "scale-105 transform origin-left md:origin-top" : ""}`}>
                                        <p className={`text-sm font-medium ${isCurrent ? "text-primary" : "text-foreground"}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground flex items-center md:justify-center gap-1">
                                            {isFuture && <Clock className="h-3 w-3" />}
                                            {step.date}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
