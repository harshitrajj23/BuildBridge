"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Lightbulb, ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const PAINTERS = [
    { id: 101, name: "Arun Varma", exp: "8 yrs", rate: "₹850/day", match: 98, status: "Available", area: "Whitefield" },
    { id: 102, name: "John D'Souza", exp: "12 yrs", rate: "₹950/day", match: 95, status: "Available", area: "Hoodi" },
    { id: 103, name: "Mani K", exp: "5 yrs", rate: "₹700/day", match: 88, status: "Finishing soon", area: "Marathahalli" },
]

export function AIDecisionAssistant() {
    const { toast } = useToast()
    const [isPaintersOpen, setIsPaintersOpen] = useState(false)
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const [shortlisted, setShortlisted] = useState<number[]>([])

    const suggestions = [
        {
            id: 1,
            text: "Hiring painters in Whitefield today reduces delay risk by 18%",
            action: "Find Painters",
            handler: () => setIsPaintersOpen(true),
        },
        {
            id: 2,
            text: "Bulk material order for Indiranagar site recommended to lock in prices",
            action: "Order Now",
            handler: () => setIsOrderOpen(true),
        },
    ]

    const handleShortlist = (id: number) => {
        setShortlisted([...shortlisted, id])
        toast({
            title: "Candidate Shortlisted",
            description: "Added to your hiring queue successfully.",
        })
    }

    const handleConfirmOrder = () => {
        setIsOrderOpen(false)
        toast({
            title: "Order Placed Successfully",
            description: "Order #IND-8829 confirmed. Delivery estimated in 24hrs.",
            variant: "default",
            className: "bg-green-600 text-white border-none",
        })
    }

    return (
        <>
            <Card className="relative overflow-hidden border-purple-500/50 bg-purple-500/5 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Sparkles className="h-24 w-24" />
                </div>

                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                            <Lightbulb className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-purple-100">AI Decision Assistant</h3>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {suggestions.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-lg bg-background/40 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
                            >
                                <p className="text-sm font-medium text-purple-50/90">{item.text}</p>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={item.handler}
                                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 whitespace-nowrap"
                                >
                                    {item.action} <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Painters Sheet */}
            <Sheet open={isPaintersOpen} onOpenChange={setIsPaintersOpen}>
                <SheetContent className="sm:max-w-md overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle>Recommended Painters</SheetTitle>
                        <SheetDescription>
                            Top rated professionals available in Whitefield area matching your project requirements.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-4">
                        {PAINTERS.map((painter) => (
                            <Card key={painter.id} className="bg-card/50">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{painter.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{painter.name}</h4>
                                                <p className="text-sm text-muted-foreground">{painter.exp} Experience • {painter.area}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                            {painter.match}% Match
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                                        <div className="bg-muted/50 p-2 rounded">
                                            <span className="text-muted-foreground block text-xs">Daily Rate</span>
                                            <span className="font-medium">{painter.rate}</span>
                                        </div>
                                        <div className="bg-muted/50 p-2 rounded">
                                            <span className="text-muted-foreground block text-xs">Status</span>
                                            <span className="font-medium text-emerald-500">{painter.status}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full"
                                        variant={shortlisted.includes(painter.id) ? "outline" : "default"}
                                        disabled={shortlisted.includes(painter.id)}
                                        onClick={() => handleShortlist(painter.id)}
                                    >
                                        {shortlisted.includes(painter.id) ? (
                                            <>
                                                <CheckCircle2 className="mr-2 h-4 w-4" /> Shortlisted
                                            </>
                                        ) : (
                                            "Shortlist Candidate"
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Order Dialog */}
            <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Material Order</DialogTitle>
                        <DialogDescription>
                            Review the details below before confirming your bulk order.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-muted/30 border space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Item</span>
                                <span className="font-medium">UltraTech Cement (PPC)</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Quantity</span>
                                <span className="font-medium">150 Bags</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium">Indiranagar Site B2</span>
                            </div>
                            <div className="h-px bg-border" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Cost</span>
                                <span>₹58,500</span>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 text-amber-500 p-3 rounded-md text-xs flex gap-2">
                            <Lightbulb className="h-4 w-4 shrink-0" />
                            <p>Ordering now locks in this price for 48 hours. Market rates are trending up.</p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setIsOrderOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmOrder}>
                            Confirm Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
