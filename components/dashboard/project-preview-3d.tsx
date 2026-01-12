"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
    Activity,
    Orbit,
    Maximize2,
    Layers,
    CheckCircle2,
    AlertCircle,
    Zap,
    Navigation,
    Box,
    BrainCircuit,
    Cpu,
    RotateCw
} from "lucide-react"

// --- Types ---
type Point3D = [number, number, number]
type Geometry = {
    id: string
    label: string
    points: Point3D[]
    type: 'slab' | 'wall' | 'pillar' | 'glass'
    floor: number
    status: 'completed' | 'active' | 'pending'
    progress: number
    details: string
}

// --- Cinematic Configuration ---
const COLORS = {
    wireframe: "#00f3ff",
    wireframeGlow: "rgba(0, 243, 255, 0.4)",
    glass: "rgba(0, 243, 255, 0.05)",
    completed: "#10b981",
    active: "#f59e0b",
    pending: "#64748b",
    grid: "rgba(0, 243, 255, 0.03)",
    scanLine: "rgba(255, 255, 255, 0.15)"
}

// --- Digital Twin Model Data ---
const TWIN_MODEL: Geometry[] = [
    // Ground Floor
    { id: "g_slab", label: "Foundation Slab", type: "slab", floor: 0, status: "completed", progress: 100, details: "Cured with 40-year durability rating.", points: [[-120, 0, -120], [120, 0, -120], [120, 0, 120], [-120, 0, 120]] },
    { id: "g_p1", label: "P1 Pillar", type: "pillar", floor: 0, status: "completed", progress: 100, details: "Structural anchor.", points: [[-110, 0, -110], [-110, -70, -110], [-100, -70, -110], [-100, 0, -110]] },
    { id: "g_p2", label: "P2 Pillar", type: "pillar", floor: 0, status: "completed", progress: 100, details: "Structural anchor.", points: [[110, 0, -110], [110, -70, -110], [100, -70, -110], [100, 0, -110]] },
    { id: "g_p3", label: "P3 Pillar", type: "pillar", floor: 0, status: "completed", progress: 100, details: "Structural anchor.", points: [[110, 0, 110], [110, -70, 110], [100, -70, 110], [100, 0, 110]] },
    { id: "g_p4", label: "P4 Pillar", type: "pillar", floor: 0, status: "completed", progress: 100, details: "Structural anchor.", points: [[-110, 0, 110], [-110, -70, 110], [-100, -70, 110], [-100, 0, 110]] },
    { id: "g_face", label: "Lobby Facade", type: "glass", floor: 0, status: "completed", progress: 100, details: "Double-glazed tempered glass.", points: [[-120, 0, 120], [120, 0, 120], [120, -70, 120], [-120, -70, 120]] },

    // First Floor
    { id: "f1_slab", label: "F1 Slab", type: "slab", floor: 1, status: "active", progress: 65, details: "Rebar installation 90% done. Pouring scheduled.", points: [[-115, -70, -115], [115, -70, -115], [115, -70, 115], [-115, -70, 115]] },
    { id: "f1_w1", label: "Master Suite Wall", type: "wall", floor: 1, status: "active", progress: 30, details: "Brickwork in progress (South-west wing).", points: [[-115, -70, -115], [-115, -140, -115], [-115, -140, 0], [-115, -70, 0]] },
    { id: "f1_p1", label: "F1 Pillar 1", type: "pillar", floor: 1, status: "active", progress: 10, details: "Alignment verified via laser sync.", points: [[-105, -70, -105], [-105, -140, -105], [-95, -140, -105], [-95, -70, -105]] },

    // Roof
    { id: "r_slab", label: "Roof Deck", type: "slab", floor: 2, status: "pending", progress: 0, details: "Planned solar harvesting integration.", points: [[-100, -140, -100], [100, -140, -100], [100, -140, 100], [-100, -140, 100]] },
    { id: "r_para", label: "Parapet Wall", type: "wall", floor: 2, status: "pending", progress: 0, details: "Safety barrier design approved.", points: [[-100, -140, 100], [100, -140, 100], [100, -155, 100], [-100, -155, 100]] },
]

export function ProjectPreview3D() {
    const [viewMode, setViewMode] = useState<"current" | "final">("current")
    const [isolatedFloor, setIsolatedFloor] = useState<number | null>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [scrubValue, setScrubValue] = useState([62])

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rotation = useRef({ x: 0.5, y: -0.8 })
    const zoom = useRef(1.6)
    const isDragging = useRef(false)
    const lastMouse = useRef({ x: 0, y: 0 })
    const scanY = useRef(0)

    // --- Core 3D Projection ---
    const project = (p: Point3D, width: number, height: number) => {
        let [px, py, pz] = p

        // Rotate 
        let x1 = px * Math.cos(rotation.current.y) + pz * Math.sin(rotation.current.y)
        let z1 = pz * Math.cos(rotation.current.y) - px * Math.sin(rotation.current.y)
        let y2 = py * Math.cos(rotation.current.x) - z1 * Math.sin(rotation.current.x)
        let z2 = z1 * Math.cos(rotation.current.x) + py * Math.sin(rotation.current.x)

        const factor = (zoom.current * 420) / (z2 + 700)
        return { x: x1 * factor + width / 2, y: y2 * factor + height * 0.65, z: z2 }
    }

    const render = (time: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)

        // Animate Scan Line
        scanY.current = Math.sin(time * 0.001) * 200 - 50

        // Draw Grid Floor (Cinematic)
        ctx.strokeStyle = COLORS.grid
        ctx.lineWidth = 1
        const gridSize = 40; const gridCount = 8
        for (let i = -gridCount; i <= gridCount; i++) {
            const p1 = project([-gridCount * gridSize, 0, i * gridSize], width, height)
            const p2 = project([gridCount * gridSize, 0, i * gridSize], width, height)
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()

            const p3 = project([i * gridSize, 0, -gridCount * gridSize], width, height)
            const p4 = project([i * gridSize, 0, gridCount * gridSize], width, height)
            ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke()
        }

        // Process & Sort Geometry
        const projected = TWIN_MODEL.map(g => {
            // Filter by build progress or scrub value
            // Simple heuristic: floor 0 = 0-40, floor 1 = 40-80, floor 2 = 80-100
            const threshold = g.floor === 0 ? 0 : g.floor === 1 ? 40 : 85
            const shouldDraw = viewMode === "final" || scrubValue[0] > threshold

            const pPoints = g.points.map(p => project(p, width, height))
            const depth = pPoints.reduce((acc, p) => acc + p.z, 0) / pPoints.length

            return { ...g, drawPoints: pPoints, depth, shouldDraw }
        }).sort((a, b) => b.depth - a.depth)

        // Render Geometry
        projected.forEach(g => {
            if (!g.shouldDraw) return

            const isHovered = hoveredId === g.id
            const isIsolated = isolatedFloor !== null && g.floor === isolatedFloor
            const dim = isolatedFloor !== null && !isIsolated

            ctx.beginPath()
            ctx.moveTo(g.drawPoints[0].x, g.drawPoints[0].y)
            g.drawPoints.forEach((p, i) => i > 0 && ctx.lineTo(p.x, p.y))
            ctx.closePath()

            // 1. Shaded Surface
            const baseOpacity = g.type === "glass" ? 0.05 : 0.12
            const opacity = dim ? 0.02 : isHovered || isIsolated ? 0.35 : baseOpacity
            ctx.fillStyle = g.type === "glass" ? "rgba(0, 243, 255, " + opacity + ")" : `rgba(0, 243, 255, ${opacity})`
            ctx.fill()

            // 2. Wireframe / Outlines
            ctx.strokeStyle = isHovered || isIsolated ? "#00f3ff" : "rgba(0, 243, 255, 0.4)"
            ctx.lineWidth = isHovered || isIsolated ? 2 : 1

            // Bloom Effect (only for high-impact layers)
            if (isHovered || isIsolated) {
                ctx.shadowBlur = 15; ctx.shadowColor = "#00f3ff"
                ctx.stroke()
                ctx.shadowBlur = 0
            } else {
                ctx.stroke()
            }

            // 3. Volumetric Scan Effect
            // If the part overlaps with the current scan line Y, highlight edges
            const worldY = g.points[0][1]
            const distToScan = Math.abs(worldY - scanY.current)
            if (distToScan < 20) {
                ctx.strokeStyle = "#fff"
                ctx.lineWidth = 1.5
                ctx.stroke()
            }
        })

        if (isDragging.current) { requestAnimationFrame(render) }
    }

    // --- Interaction Listeners ---
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true
            lastMouse.current = { x: e.clientX, y: e.clientY }
            requestAnimationFrame(render)
        }
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            rotation.current.y += (e.clientX - lastMouse.current.x) * 0.005
            rotation.current.x += (e.clientY - lastMouse.current.y) * 0.005
            lastMouse.current = { x: e.clientX, y: e.clientY }
        }
        const handleMouseUp = () => isDragging.current = false
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            zoom.current = Math.min(Math.max(zoom.current - e.deltaY * 0.001, 0.8), 3.5)
            requestAnimationFrame(render)
        }

        const handleClick = (e: MouseEvent) => {
            // Simple hit detection for floor switching based on vertical screen space
            const rect = canvas.getBoundingClientRect()
            const y = (e.clientY - rect.top) / rect.height
            if (y > 0.7) setIsolatedFloor(0)
            else if (y > 0.4) setIsolatedFloor(1)
            else if (y > 0.1) setIsolatedFloor(2)
            else setIsolatedFloor(null)
            requestAnimationFrame(render)
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        canvas.addEventListener("wheel", handleWheel, { passive: false })
        canvas.addEventListener("click", handleClick)

        let frameId = requestAnimationFrame(function loop(time) {
            render(time)
            if (!isDragging.current) frameId = requestAnimationFrame(loop)
        })

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
            canvas.removeEventListener("wheel", handleWheel)
            canvas.removeEventListener("click", handleClick)
            cancelAnimationFrame(frameId)
        }
    }, [viewMode, isolatedFloor, scrubValue])

    const activeFloorData = TWIN_MODEL.filter(g => g.floor === (isolatedFloor ?? -1))

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                            <BrainCircuit className="h-3 w-3 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase tracking-wider">
                            AI Digital Twin
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">
                        Real-time holographic simulation of future build state
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex bg-slate-900 border border-white/5 p-1 rounded-full">
                        <Button
                            variant={viewMode === "current" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => { setViewMode("current"); setScrubValue([62]); }}
                            className="rounded-full text-[10px] h-8 px-5 uppercase font-black"
                        >
                            Current Build
                        </Button>
                        <Button
                            variant={viewMode === "final" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => { setViewMode("final"); setScrubValue([100]); }}
                            className="rounded-full text-[10px] h-8 px-5 uppercase font-black"
                        >
                            Final Design
                        </Button>
                    </div>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 bg-white/[0.02]">
                        <Maximize2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            <Card className="relative h-[700px] bg-black border-none overflow-hidden group shadow-2xl">
                {/* Cinematic Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)] opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none" />

                {/* Telemetry HUD */}
                <div className="absolute top-8 left-8 z-20 space-y-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl w-60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Cpu className="h-3 w-3 text-cyan-400" />
                                <span className="text-[10px] font-black tracking-widest text-cyan-400">SYNC_ENGINE_V4</span>
                            </div>
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-baseline justify-between mb-1.5">
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase">Global Progress</h4>
                                    <span className="text-xl font-black text-cyan-400 italic">{scrubValue[0]}%</span>
                                </div>
                                <Progress value={scrubValue[0]} className="h-1 bg-white/5" />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="text-[9px] font-bold p-2 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-white/20 mb-1">LATITUDE</p>
                                    <p className="text-white/60 tabular-nums font-mono">12.9716° N</p>
                                </div>
                                <div className="text-[9px] font-bold p-2 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-white/20 mb-1">LONGITUDE</p>
                                    <p className="text-white/60 tabular-nums font-mono">77.5946° E</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {isolatedFloor !== null && activeFloorData.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="bg-cyan-600/10 backdrop-blur-3xl border border-cyan-500/20 p-5 rounded-2xl w-64 ring-1 ring-white/5"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers className="h-4 w-4 text-cyan-400" />
                                    <h3 className="text-xs font-black text-white uppercase tracking-wider">Level {isolatedFloor} Isolated</h3>
                                </div>
                                <div className="space-y-4">
                                    {activeFloorData.slice(0, 2).map((layer) => (
                                        <div key={layer.id} className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-white/60">{layer.label}</span>
                                                <span className="text-[10px] font-black text-cyan-400">{layer.progress}%</span>
                                            </div>
                                            <Progress value={layer.progress} className="h-1 bg-white/5" />
                                            <p className="text-[10px] text-white/40 leading-snug">{layer.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* AI Overlay Markers (Conceptual) */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20 space-y-4">
                    {scrubValue[0] < 80 && (
                        <motion.div
                            animate={{ x: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-start gap-3 w-64 backdrop-blur-md"
                        >
                            <div className="bg-amber-500/20 p-2 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-amber-500 uppercase">Risk Detected</h4>
                                <p className="text-[11px] text-white/70 font-medium">Floor 1 Slab delay risk detected via AI logistics scan.</p>
                            </div>
                        </motion.div>
                    )}
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-start gap-3 w-64 backdrop-blur-md"
                    >
                        <div className="bg-emerald-500/20 p-2 rounded-lg">
                            <Zap className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-emerald-500 uppercase">Optimization</h4>
                            <p className="text-[11px] text-white/70 font-medium">Early wiring approval on L0 can boost completion speed by 6%.</p>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Visualizer Canvas */}
                <canvas
                    ref={canvasRef}
                    width={1000}
                    height={1000}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                />

                {/* Timeline Scrubber */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[450px] bg-black/60 backdrop-blur-2xl border border-white/10 p-5 rounded-full flex items-center gap-6 shadow-2xl">
                    <div className="flex items-center gap-4">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-white/40 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full">
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <div className="w-[1px] h-6 bg-white/10" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                            <span>Foundation</span>
                            <span>Structure</span>
                            <span>Finishing</span>
                        </div>
                        <Slider
                            value={scrubValue}
                            onValueChange={setScrubValue}
                            max={100}
                            step={1}
                            className="[&_.relative]:h-1.5 [&_.bg-primary]:bg-cyan-500 [&_.bg-secondary]:bg-white/10 [&_[role=slider]]:bg-white [&_[role=slider]]:border-cyan-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                        />
                    </div>
                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-8 right-10 z-20 flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-6 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f3ff]" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-6 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Active Phase</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-6 bg-slate-700 rounded-full" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Future Design</span>
                    </div>
                </div>

                {/* Perspective Control Indicator */}
                <div className="absolute top-8 right-8 flex items-center gap-3 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full pointer-events-none opacity-40">
                    <Orbit className="h-3 w-3 text-white" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">Full Orbital Sync Enabled</span>
                </div>
            </Card>

            {/* Bottom Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-5 border-white/5 bg-slate-900/40 backdrop-blur-md">
                    <h4 className="text-[11px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5" /> Site Telemetry
                    </h4>
                    <div className="space-y-4">
                        {[
                            { label: "Active Labour Index", val: "High (84%)", color: "text-emerald-400" },
                            { label: "Material Load @ Site", val: "Optimal", color: "text-white/60" },
                            { label: "Build Velocity", val: "1.2x Normal", color: "text-cyan-400" }
                        ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-xs text-white/40">{stat.label}</span>
                                <span className={`text-xs font-bold ${stat.color}`}>{stat.val}</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="col-span-2 p-5 border-white/5 bg-slate-900/40 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                    <h4 className="text-[11px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <BrainCircuit className="h-3.5 w-3.5" /> AI Build Intelligence
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                        Virtual site twin predicts structural completion by <span className="text-white font-bold">Sept 2026</span> based on current
                        Bangalore weather models and resource availability. Early approval of Floor 1 interior layouts
                        recommended to maintain current 1.2x velocity.
                    </p>
                </Card>
            </div>
        </div>
    )
}
