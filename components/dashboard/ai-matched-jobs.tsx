"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MapPin, Sparkles, Navigation, Clock, Briefcase, IndianRupee, Info, ChevronDown, CheckCircle, TrendingUp, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const INITIAL_JOBS = [ // Renamed MOCK_JOBS to INITIAL_JOBS
  {
    id: 1,
    title: "Construction Helper", // Changed title
    area: "Whitefield", // Removed location, kept area
    pay: "850 - 950",
    match: 94,
    type: "Daily Wage",
    coordinates: { top: "30%", left: "60%" },
    color: "blue",
    matchReasons: [
      { icon: CheckCircle, text: "Matches your Masonry skills (Expert)" },
      { icon: MapPin, text: "Close to home (2.5 km)" },
      { icon: TrendingUp, text: "High demand in Whitefield" },
    ],
  },
  {
    id: 2,
    title: "Site Painter", // Changed title
    area: "Indiranagar", // Removed location, kept area
    pay: "900 - 1,100",
    match: 88,
    type: "Contract",
    coordinates: { top: "50%", left: "45%" },
    color: "purple",
    matchReasons: [
      { icon: CheckCircle, text: "Matches your Painting skills" },
      { icon: MapPin, text: "Within 5km radius" },
      { icon: Heart, text: "Good ratings from previous labourers" },
    ],
  },
  {
    id: 3,
    title: "Assistant Electrician", // Changed title
    area: "Electronic City", // Changed location/area
    pay: "1,200 - 1,500",
    match: 97,
    type: "Urgent",
    coordinates: { top: "70%", left: "65%" },
    color: "emerald",
    matchReasons: [
      { icon: CheckCircle, text: "Perfect match for Electrician role" },
      { icon: TrendingUp, text: "Urgent requirement (Bonus likely)" },
      { icon: MapPin, text: "Direct bus route available" },
    ],
  },
  {
    id: 4,
    title: "Plumbing Assistant", // Changed title
    area: "Yelahanka", // Removed location, kept area
    pay: "950 - 1,050",
    match: 91,
    type: "Daily Wage",
    coordinates: { top: "15%", left: "30%" },
    color: "orange",
    matchReasons: [
      { icon: CheckCircle, text: "Matches your Plumbing experience" },
      { icon: MapPin, text: "Located in Yelahanka (Nearby)" },
      { icon: Heart, text: "Long-term project potential" },
    ],
  },
  {
    id: 5,
    title: "Masonry Assistant",
    area: "Whitefield",
    pay: "800 - 900",
    match: 92,
    type: "Daily Wage",
    coordinates: { top: "32%", left: "62%" }, // Close to Job 1
    color: "blue",
    matchReasons: [
      { icon: CheckCircle, text: "Matches your Masonry skills" },
      { icon: MapPin, text: "Very close to your location" },
    ],
  },
  {
    id: 6,
    title: "Site Supervisor",
    area: "Whitefield",
    pay: "1,500 - 1,800",
    match: 85,
    type: "Contract",
    coordinates: { top: "28%", left: "58%" }, // Close to Job 1
    color: "blue",
    matchReasons: [
      { icon: TrendingUp, text: "High paying role" },
      { icon: MapPin, text: "In your preferred area" },
    ],
  },
  {
    id: 7,
    title: "Paint Mixer",
    area: "Indiranagar",
    pay: "850 - 950",
    match: 89,
    type: "Daily Wage",
    coordinates: { top: "52%", left: "47%" }, // Close to Job 2
    color: "purple",
    matchReasons: [
      { icon: CheckCircle, text: "Entry level painting role" },
      { icon: Heart, text: "Good team environment" },
    ],
  },
]

// Simple CountUp Component for animations
function CountUp({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / (duration * 1000), 1)

      setCount(Math.floor(end * percentage))

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <>{count}{suffix}</>
}

// Helper component for cluster expansion
function ClusterItems({ jobs, setSelectedJob, selectedJob }: { jobs: any[], setSelectedJob: (id: number | null) => void, selectedJob: number | null }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] flex items-center justify-center pointer-events-none"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Transparent hover trigger area */}
      <div className="absolute inset-0 rounded-full cursor-pointer pointer-events-auto" />

      {jobs.map((job, idx) => {
        const angle = (idx / jobs.length) * 2 * Math.PI - (Math.PI / 2) // Start from top
        const radius = 70
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={job.id}
            className="absolute pointer-events-auto"
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={isHovered ? { x, y, scale: 1, opacity: 1 } : { x: 0, y: 0, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: isHovered ? idx * 0.05 : 0 }}
          >
            <div onClick={(e) => { e.stopPropagation(); setSelectedJob(job.id) }}>
              <div className={`relative h-9 w-9 rounded-full border border-white/20 bg-[#1a1d26] flex items-center justify-center shadow-lg hover:bg-${job.color}-500/20 transition-colors cursor-pointer`}>
                <MapPin className={`h-4 w-4 text-${job.color}-500`} />
                <div className="absolute -top-2 -right-2 bg-green-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full">{job.match}%</div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function AIMatchedJobs() {
  // State for jobs to allow real-time updates
  const [jobs, setJobs] = useState(INITIAL_JOBS) // Converted MOCK_JOBS to state
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [isMatchExpanded, setIsMatchExpanded] = useState(false)
  const { toast } = useToast() // Initialized useToast hook

  // Tilt Interaction
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()

    // Normalize mouse position from -0.5 to 0.5
    const width = rect.width
    const height = rect.height

    const mouseXFromCenter = e.clientX - rect.left - width / 2
    const mouseYFromCenter = e.clientY - rect.top - height / 2

    x.set(mouseXFromCenter / width)
    y.set(mouseYFromCenter / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Effect: Real-time Match Score Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(currentJobs => currentJobs.map(job => {
        // Randomly update some jobs
        if (Math.random() > 0.7) {
          const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
          let newMatch = job.match + change
          if (newMatch > 100) newMatch = 100
          if (newMatch < 80) newMatch = 80
          return { ...job, match: newMatch }
        }
        return job
      }))
    }, 3000) // Every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Effect: Simulated "New Job Detected" Toast
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: "New Job Detected!",
        description: "A new Masonry Helper job was just posted in Hebbal.",
        duration: 5000,
      })
    }, 15000) // Trigger once after 15 seconds for demo

    return () => clearTimeout(timeout)
  }, [toast])

  // Reset match details expansion when closing or changing jobs
  useEffect(() => {
    if (!selectedJob) {
      setIsMatchExpanded(false)
    }
  }, [selectedJob])


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            <h2 className="text-2xl font-bold">AI-Matched Jobs Near You</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4 bg-[#1a1d26] border-white/10 text-white backdrop-blur-xl shadow-xl">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm border-b border-white/10 pb-2 mb-2">Why this match?</h4>
                    <p className="text-xs text-muted-foreground">
                      This job list is curated based on:
                    </p>
                    <ul className="list-disc list-inside text-xs space-y-1 text-gray-300">
                      <li>Your skills (e.g., <span className="text-blue-400">Electrician</span>)</li>
                      <li>Proximity to <span className="text-blue-400">Bangalore</span></li>
                      <li>Similarity to your <span className="text-blue-400">past projects</span></li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground">
            Smart recommendations based on your skills and location in Bangalore
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5 py-1.5 px-3 border-purple-500/30 text-purple-400 bg-purple-500/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Live Match
        </Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 -mb-6 mx-4 md:mx-0 p-4 rounded-xl border border-purple-500/30 bg-[#13161c]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <TrendingUp className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Today's Best Area to Work</div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              Whitefield
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] h-5">
                Top Choice
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end px-2 md:px-0">
          <div className="text-center md:text-right">
            <div className="text-xs text-muted-foreground mb-0.5">Average Pay</div>
            <div className="text-xl font-bold text-white tabular-nums">
              ₹<CountUp end={950} duration={2} />
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-xs text-muted-foreground mb-0.5">Demand</div>
            <div className="text-xl font-bold text-green-400 tabular-nums">
              <CountUp end={98} duration={2} suffix="%" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedJob(null)}
        style={{
          perspective: 1000,
        }}
        className="relative h-[600px] w-full rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-[#0F1115] group cursor-pointer"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* MAP BASE LAYER - CUSTOM SVG */}
          <div className="absolute inset-[-10%] w-[120%] h-[120%] bg-[#0f1115] pointer-events-none">
            <svg className="w-full h-full opacity-40 transform scale-110" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0f1115" stopOpacity="0" />
                </radialGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="500" cy="500" r="400" fill="url(#mapGlow)" />

              {/* Simulated Roads/Connections */}
              <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" fill="none">
                {/* Ring Road */}
                <path d="M 200,200 Q 500,50 800,200 T 800,800 T 200,800 T 200,200" strokeOpacity="0.5" />

                {/* Cross City Lines */}
                <path d="M 100,500 L 900,500" />
                <path d="M 500,100 L 500,900" />
                <path d="M 300,300 L 700,700" />
                <path d="M 700,300 L 300,700" />

                {/* Connecting key areas */}
                <path d="M 250,180 L 500,500 L 650,350" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" />
                <path d="M 500,500 L 300,750" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" />
                <path d="M 500,500 L 700,850" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" />
              </g>

              {/* Pulse Dots for Areas */}
              <circle cx="250" cy="180" r="3" fill="#3b82f6" fillOpacity="0.5">
                <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="350" r="3" fill="#3b82f6" fillOpacity="0.5">
                <animate attributeName="r" values="3;6;3" dur="5s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0;0.5" dur="5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Area Labels (Glow Nodes) */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{ transform: "translateZ(20px)" }}>
            {/* Yelahanka */}
            <div className="absolute top-[18%] left-[25%] group/label">
              <div className="w-2 h-2 bg-blue-500/30 rounded-full blur-[2px] mb-1 mx-auto animate-pulse" />
              <div className="text-[10px] font-semibold text-white/30 tracking-widest uppercase transition-colors group-hover/label:text-white">Yelahanka</div>
            </div>

            {/* Hebbal */}
            <div className="absolute top-[15%] left-[50%] group/label flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500/30 rounded-full blur-[2px] mb-1 animate-pulse" />
              <div className="text-[10px] font-semibold text-white/30 tracking-widest uppercase transition-colors group-hover/label:text-white">Hebbal</div>
            </div>

            {/* Whitefield */}
            <div className="absolute top-[35%] left-[65%] group/label flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500/30 rounded-full blur-[2px] mb-1 animate-pulse" />
              <div className="text-[10px] font-semibold text-white/30 tracking-widest uppercase transition-colors group-hover/label:text-white">Whitefield</div>
            </div>

            {/* Indiranagar */}
            <div className="absolute top-[52%] left-[40%] group/label flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500/30 rounded-full blur-[2px] mb-1 animate-pulse" />
              <div className="text-[10px] font-semibold text-white/30 tracking-widest uppercase transition-colors group-hover/label:text-white">Indiranagar</div>
            </div>

            {/* Electronic City */}
            <div className="absolute top-[85%] left-[70%] group/label flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500/30 rounded-full blur-[2px] mb-1 animate-pulse" />
              <div className="text-[10px] font-semibold text-white/30 tracking-widest uppercase transition-colors group-hover/label:text-white">Electronic City</div>
            </div>
          </div>

          {/* Map Vignette */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1115] via-transparent to-[#0F1115] opacity-80 pointer-events-none z-0" />

          {/* USER LOCATION MARKER */}
          <motion.div
            className="absolute z-30"
            style={{ top: "42%", left: "50%", transform: "translateZ(60px) translateX(-50%) translateY(-50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <div className="relative flex flex-col items-center">
              {/* Pulsing Rings */}
              <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-ping" />
              <div className="absolute -inset-4 bg-blue-500/30 rounded-full animate-pulse" />

              {/* Marker Core */}
              <div className="relative h-6 w-6 rounded-full bg-blue-500 border-2 border-white/80 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full" />
              </div>

              {/* Label */}
              <motion.div
                className="mt-3 px-3 py-1.5 bg-blue-500/90 backdrop-blur-md rounded-lg border border-blue-400/30 shadow-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
                  <Navigation className="h-3 w-3 fill-white" />
                  Your Location
                </div>
              </motion.div>

              {/* Pole line to ground */}
              <div className="absolute top-6 left-1/2 w-[1px] h-[60px] bg-gradient-to-b from-blue-500/50 to-transparent -translate-x-1/2 pointer-events-none" />
            </div>
          </motion.div>

          {/* Floating Job Pins & Clusters */}
          <div className="absolute inset-0 z-20" style={{ transform: "translateZ(50px)" }}>
            {Object.entries(jobs.reduce((acc, job) => {
              const key = job.area
              if (!acc[key]) acc[key] = []
              acc[key].push(job)
              return acc
            }, {} as Record<string, typeof jobs>)).map(([area, areaJobs]) => (
              <div key={area} className="absolute" style={{ top: areaJobs[0].coordinates.top, left: areaJobs[0].coordinates.left }}>
                {/* Single Job */}
                {areaJobs.length === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="relative group/pin cursor-pointer">
                      <motion.div className={`absolute -inset-6 rounded-full bg-${areaJobs[0].color}-500/20 blur-xl`} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
                      <div className="absolute top-1/2 left-1/2 w-[1px] h-[40px] bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2 translate-y-2 pointer-events-none" />
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); setSelectedJob(areaJobs[0].id === selectedJob ? null : areaJobs[0].id) }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative h-10 w-10 rounded-full border border-white/20 bg-[#1a1d26]/80 backdrop-blur-md flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all hover:border-${areaJobs[0].color}-500 hover:bg-${areaJobs[0].color}-500/10`}
                      >
                        <MapPin className={`h-5 w-5 text-${areaJobs[0].color}-500`} />
                      </motion.button>
                      <div className="absolute -top-3 -right-3 bg-[#1a1d26] text-[10px] font-bold text-white px-2 py-0.5 rounded-full border border-white/10 shadow-lg block"><span className="text-green-500">{areaJobs[0].match}%</span></div>
                    </div>
                  </motion.div>
                ) : (
                  /* Cluster Group */
                  <div className="relative group/cluster">
                    {/* Base Cluster Marker */}
                    <motion.div
                      className="relative z-30 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`h-12 w-12 rounded-full border-2 border-white/20 bg-[#1a1d26]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]`}>
                        <span className="text-white font-bold text-lg">{areaJobs.length}</span>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/50 bg-black/40 px-2 py-0.5 rounded-full whitespace-nowrap">{area}</div>
                    </motion.div>

                    {/* Expanded Items on Hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none group-hover/cluster:pointer-events-auto">
                      {areaJobs.map((job, idx) => {
                        // Calculate radial position
                        const angle = (idx / areaJobs.length) * 2 * Math.PI
                        const radius = 60 // distance from center
                        const xOffset = Math.cos(angle) * radius
                        const yOffset = Math.sin(angle) * radius

                        return (
                          <motion.div
                            key={job.id}
                            className="absolute"
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            whileInView={{ x: 0, y: 0, opacity: 0, scale: 0 }} // Reset when not hovering (simulated by CSS hover group)
                            variants={{
                              hover: { x: xOffset, y: yOffset, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20, delay: idx * 0.05 } }
                            }}
                            animate="hover" // This needs to be controlled by parent hover state ideally, but simpler with CSS group for now + variants trick? 
                          // Actually Framer Motion doesn't auto-detect CSS group hover for variants unless it's a child of motion component with whileHover.

                          >
                            {/* We need to restructure slightly to let Framer handle the hover state properly or use CSS. 
                                     Let's use a simpler approach: Render them always but hide/show based on parent hover via CSS or simpler Motion.
                                 */}
                          </motion.div>
                        )
                      })}
                    </div>
                    {/* Let's redo the expansion logic cleanly below */}
                    <ClusterItems jobs={areaJobs} setSelectedJob={setSelectedJob} selectedJob={selectedJob} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Job Card Preview (Overlay) - CENTER BOTTOM */}
        <AnimatePresence>
          {selectedJob && (
            <div
              className="absolute bottom-6 left-1/2 w-full max-w-sm z-50 -translate-x-1/2 pointer-events-auto"
              style={{ transform: "translateZ(100px) translateX(-50%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {jobs.filter((j) => j.id === selectedJob).map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="bg-[#13161c]/95 backdrop-blur-xl border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className={`h-1.5 w-full bg-gradient-to-r from-${job.color}-500 via-${job.color}-400 to-${job.color}-500 animate-gradient-x`} />
                    <div className="p-5 space-y-4">

                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="secondary" className="mb-2 bg-white/5 hover:bg-white/10 text-muted-foreground font-normal">
                            {job.area}
                          </Badge>
                          <h3 className="font-bold text-xl text-white tracking-tight">{job.title}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="text-xs text-muted-foreground">AI Match</div>
                          <div className="text-lg font-bold text-green-400">{job.match}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                            <IndianRupee className="h-3.5 w-3.5" />
                            Daily Pay
                          </div>
                          <div className="font-bold text-white text-lg">₹{job.pay}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            Work Type
                          </div>
                          <div className="font-medium text-white">{job.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground/80 bg-black/20 p-2 rounded">
                        <Clock className="h-4 w-4" />
                        <span>Posted 2 hours ago</span>
                      </div>

                      {/* Why this job matches you - Collapsible */}
                      <div className="border border-white/5 rounded-lg overflow-hidden bg-white/5 transition-all">
                        <button
                          onClick={() => setIsMatchExpanded(!isMatchExpanded)}
                          className="w-full flex items-center justify-between p-3 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            Why this job matches you
                          </div>
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isMatchExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isMatchExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-3 pb-3 space-y-2">
                                {job.matchReasons?.map((reason, index) => (
                                  <div key={index} className="flex items-start gap-2 text-xs text-none text-gray-300">
                                    <reason.icon className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />
                                    <span>{reason.text}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="pt-2 flex gap-3">
                        <Button
                          className={`flex-1 h-11 bg-${job.color}-600 hover:bg-${job.color}-700 text-white font-medium`}
                        >
                          View Job
                        </Button>
                        <Button
                          variant="outline"
                          className="h-11 w-11 p-0 border-white/10 hover:bg-white/5 hover:text-white"
                          onClick={() => setSelectedJob(null)}
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
