"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    Clock,
    AlertCircle,
    ArrowRight,
    ListTodo,
    CheckCircle2,
    MapPin,
    History,
    FileText,
    User,
    Info
} from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const clientActions = [
    {
        id: 1,
        title: "Approve Electrical Layout",
        project: "2BHK Renovation – Whitefield",
        area: "Whitefield, Bangalore",
        priority: "High",
        deadline: "Jan 15, 2026",
        impact: "Wiring work will stall, delaying wall plastering by 4 days.",
        description: "Final approval required for the electrical point placement and load distribution for the master bedroom and living area. The builder has submitted the updated layout incorporating your changes to the socket positions.",
        history: [
            { date: "Jan 10", status: "Submitted", user: "Sri Krishna Builders" },
            { date: "Jan 11", status: "Clarification Requested", user: "Client (You)" },
            { date: "Jan 12", status: "Revised Layout Uploaded", user: "Sri Krishna Builders" },
        ]
    },
    {
        id: 2,
        title: "Finalize Exterior Paint Shade",
        project: "Villa Painting – Indiranagar",
        area: "Indiranagar, Bangalore",
        priority: "Medium",
        deadline: "Jan 18, 2026",
        impact: "Scaffolding rental cost will increase if painting doesn't start.",
        description: "Choose between 'Coastal White' and 'Cloud Grey' for the exterior facade. The mock-up patches are ready on the north wall for inspection.",
        history: [
            { date: "Jan 05", status: "Site Inspection Done", user: "ColorMasters" },
            { date: "Jan 08", status: "Shade Card Shared", user: "ColorMasters" },
        ]
    },
    {
        id: 3,
        title: "Review HVAC Vendor Quotations",
        project: "Office Fit-out – Electronic City",
        area: "Electronic City, Bangalore",
        priority: "High",
        deadline: "Jan 14, 2026",
        impact: "Lead time for units is 3 weeks; delay will push handover date.",
        description: "Three quotations from Daikin, BlueStar, and Voltas have been compiled. AI suggests Voltas for better service coverage in Electronic City Phase 1.",
        history: [
            { date: "Jan 02", status: "RFQ Sent", user: "TechSpace Builders" },
            { date: "Jan 09", status: "Quotations Received", user: "Procurement Dept" },
        ]
    },
    {
        id: 4,
        title: "Confirm Kitchen Hob Selection",
        project: "Kitchen Remodel – HSR",
        area: "HSR Layout, Bangalore",
        priority: "Low",
        deadline: "Jan 22, 2026",
        impact: "Countertop cutting depends on hob dimensions.",
        description: "Please confirm the dimensions for the 4-burner hob. The granite fabricator requires these details before the CNC cut-out can be made.",
        history: [
            { date: "Jan 12", status: "Spec Sheet Requested", user: "Elite Interiors" },
        ]
    },
]

export function ClientActionTimeline() {
    const [selectedAction, setSelectedAction] = useState<typeof clientActions[0] | null>(null)
    const [approvedActions, setApprovedActions] = useState<number[]>([])
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleApprove = (e: React.MouseEvent, id: number) => {
        e.stopPropagation()
        if (!approvedActions.includes(id)) {
            setApprovedActions(prev => [...prev, id])
        }
    }

    const openDetails = (action: typeof clientActions[0]) => {
        setSelectedAction(action)
        setIsSheetOpen(true)
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "text-red-500 bg-red-500/10 border-red-500/20"
            case "Medium":
                return "text-amber-500 bg-amber-500/10 border-amber-500/20"
            case "Low":
                return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
            default:
                return "text-muted-foreground bg-muted border-transparent"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ListTodo className="h-6 w-6 text-primary" />
                        Client Action Timeline
                    </h2>
                    <p className="text-muted-foreground">
                        Professional decision workflow for your Bangalore projects.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {clientActions.map((action, index) => {
                    const isApproved = approvedActions.includes(action.id)
                    return (
                        <motion.div
                            key={action.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card
                                onClick={() => openDetails(action)}
                                className={`
                  border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all group overflow-hidden cursor-pointer
                  ${isApproved ? 'opacity-60 bg-muted/20' : ''}
                `}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Priority Indicator Line */}
                                    <div className={`w-1 md:w-1.5 ${isApproved ? 'bg-muted-foreground/30' : action.priority === 'High' ? 'bg-red-500' : action.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />

                                    <div className="flex-1 p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {isApproved ? (
                                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase text-[10px] tracking-widest font-bold gap-1">
                                                        <CheckCircle2 className="h-3 w-3" /> Approved
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className={`${getPriorityColor(action.priority)} uppercase text-[10px] tracking-widest font-bold`}>
                                                        {action.priority} Priority
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-muted-foreground font-medium">{action.project}</span>
                                            </div>

                                            <div>
                                                <h3 className={`text-lg font-bold leading-tight group-hover:text-primary transition-colors ${isApproved ? 'line-through text-muted-foreground' : ''}`}>
                                                    {action.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        Deadline: <span className={`${isApproved ? 'text-muted-foreground' : 'text-foreground'} ml-1 font-semibold`}>{action.deadline}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {!isApproved && (
                                                <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 inline-block w-full">
                                                    <div className="flex gap-2 items-start">
                                                        <AlertCircle className="h-3.5 w-3.5 text-orange-500 mt-0.5 shrink-0" />
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-bold text-orange-600/80 tracking-wider">Impact if Delayed</p>
                                                            <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                                                                {action.impact}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0">
                                            {!isApproved ? (
                                                <Button
                                                    size="sm"
                                                    className="gap-2 px-6"
                                                    onClick={(e) => handleApprove(e, action.id)}
                                                >
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Approve
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" disabled className="gap-2 px-6 opacity-100">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Approved
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="gap-2 group/btn hidden sm:flex"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    openDetails(action)
                                                }}
                                            >
                                                Details
                                                <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-md md:max-w-lg border-l-border bg-card">
                    {selectedAction && (
                        <div className="h-full flex flex-col pt-6">
                            <SheetHeader className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className={`${getPriorityColor(selectedAction.priority)} uppercase text-[10px] tracking-widest font-bold`}>
                                            {selectedAction.priority} Priority
                                        </Badge>
                                        {approvedActions.includes(selectedAction.id) && (
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase text-[10px] tracking-widest font-bold gap-1">
                                                <CheckCircle2 className="h-3 w-3" /> Approved
                                            </Badge>
                                        )}
                                    </div>
                                    <SheetTitle className="text-2xl font-bold">{selectedAction.title}</SheetTitle>
                                    <SheetDescription className="flex items-center gap-1.5 text-primary font-medium">
                                        {selectedAction.project}
                                    </SheetDescription>
                                </div>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto py-8 space-y-8 pr-2">
                                <section className="space-y-3">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                        <MapPin className="h-4 w-4" /> Location
                                    </h4>
                                    <p className="text-sm font-medium">{selectedAction.area}</p>
                                </section>

                                <section className="space-y-3">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                        <FileText className="h-4 w-4" /> Action Description
                                    </h4>
                                    <p className="text-sm leading-relaxed text-foreground/80">
                                        {selectedAction.description}
                                    </p>
                                </section>

                                <section className="space-y-3">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                        <Clock className="h-4 w-4" /> Deadline & Impact
                                    </h4>
                                    <div className="grid gap-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                                            <span className="text-xs text-muted-foreground">Due By</span>
                                            <span className="text-sm font-bold">{selectedAction.deadline}</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                                            <p className="text-[10px] uppercase font-bold text-orange-600/80 mb-1">Impact if Delayed</p>
                                            <p className="text-xs font-medium leading-relaxed">{selectedAction.impact}</p>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                        <History className="h-4 w-4" /> Mock Approval History
                                    </h4>
                                    <div className="relative pl-6 space-y-6">
                                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
                                        {selectedAction.history.map((log, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary z-10" />
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold">{log.status}</span>
                                                        <span className="text-[10px] text-muted-foreground">{log.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                        <User className="h-3 w-3" />
                                                        {log.user}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {approvedActions.includes(selectedAction.id) && (
                                            <div className="relative">
                                                <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-background bg-emerald-500 z-10" />
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-emerald-500">Approved</span>
                                                        <span className="text-[10px] text-muted-foreground">Just now</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                        <User className="h-3 w-3" />
                                                        Client (You)
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            <div className="pt-6 border-t border-border mt-auto">
                                <div className="flex gap-3">
                                    {!approvedActions.includes(selectedAction.id) ? (
                                        <Button
                                            className="flex-1 gap-2 py-6 text-base"
                                            onClick={(e) => {
                                                handleApprove(e, selectedAction.id)
                                                setIsSheetOpen(false)
                                            }}
                                        >
                                            <CheckCircle2 className="h-5 w-5" />
                                            Approve Action
                                        </Button>
                                    ) : (
                                        <Button variant="outline" disabled className="flex-1 gap-2 py-6 text-base opacity-100 border-emerald-500/50 bg-emerald-500/5 text-emerald-500">
                                            <CheckCircle2 className="h-5 w-5" />
                                            Action Approved
                                        </Button>
                                    )}
                                    <Button variant="outline" className="py-6 px-6" onClick={() => setIsSheetOpen(false)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}
