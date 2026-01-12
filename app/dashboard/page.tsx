"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useBuildBridgeStore } from "@/lib/store"
import { PageTransition } from "@/components/common/page-transition"
import { LogOut, Briefcase, Users, Bell, Sparkles } from "lucide-react"
import { AIMatchedJobs } from "@/components/dashboard/ai-matched-jobs"
import { AIProjectCommandCenter } from "@/components/dashboard/ai-project-command-center"
import { SmartLabourPoolAnalyzer } from "@/components/dashboard/smart-labour-pool-analyzer"
import { AIHiringRecommendations } from "@/components/dashboard/ai-hiring-recommendations"
import { ProjectCostPrediction } from "@/components/dashboard/project-cost-prediction"
import { BuilderActionTimeline } from "@/components/dashboard/builder-action-timeline"
import { TrustAndCompliance } from "@/components/dashboard/trust-and-compliance"
import { AIDecisionAssistant } from "@/components/dashboard/ai-decision-assistant"
import { AIProjectHealth } from "@/components/dashboard/ai-project-health"
import { SmartBudgetDriftMonitor } from "@/components/dashboard/smart-budget-drift-monitor"
import { ClientActionTimeline } from "@/components/dashboard/client-action-timeline"
import { ProjectPreview3D } from "@/components/dashboard/project-preview-3d"

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

export default function DashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userName, userRole, setIsLoggedIn, resetStore } = useBuildBridgeStore()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // 🔑 Sync role from localStorage -> store
    const storedRole = localStorage.getItem("userRole")
    if (
      storedRole &&
      (storedRole === "labourer" ||
        storedRole === "builder" ||
        storedRole === "client") &&
      storedRole !== userRole
    ) {
      useBuildBridgeStore.setState({
        userRole: storedRole,
      })
    }
  }, [isLoggedIn, router, userRole])

  const handleLogout = () => {
    resetStore()
    router.push("/")
  }

  if (!isLoggedIn) {
    return null
  }
  // 🔐 Role helpers
  const isLabourer = userRole === "labourer"
  const isBuilder = userRole === "builder"
  const isClient = userRole === "client"

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 md:px-6 bg-background relative overflow-hidden">
        {/* Optimized Background - Subtle & Professional */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-[120px]"
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-emerald-500/5 via-cyan-500/5 to-transparent blur-[120px]"
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container max-w-screen-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Sparkles className="h-6 w-6 text-yellow-500/80" />
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Welcome back, {userName}
                  </h1>
                </motion.div>
                <p className="text-lg text-muted-foreground">
                  Logged in as <span className="font-medium capitalize text-primary">{userRole}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all font-medium"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {isLabourer && (
                <>
                  <MetricCard
                    title="Available Jobs"
                    value={24}
                    icon={Briefcase}
                    color="blue"
                    onClick={() => router.push("/jobs")}
                  />
                  <MetricCard
                    title="Completed Works"
                    value={18}
                    icon={Users}
                    color="purple"
                    onClick={() => router.push("/dashboard/completed-works")}
                  />
                  <MetricCard
                    title="Payments Received"
                    value={12}
                    icon={Bell}
                    color="emerald"
                    onClick={() => router.push("/payments")}
                  />
                </>
              )}

              {isBuilder && (
                <>
                  <MetricCard
                    title="Active Projects"
                    value={6}
                    icon={Briefcase}
                    color="blue"
                    onClick={() => router.push("/dashboard/active-projects")}
                  />
                  <MetricCard
                    title="Hired Labourers"
                    value={32}
                    icon={Users}
                    color="purple"
                    onClick={() => router.push("/dashboard/hired-labourers")}
                  />
                  <MetricCard
                    title="Pending Approvals"
                    value={5}
                    icon={Bell}
                    color="emerald"
                    onClick={() => router.push("/dashboard/pending-approvals")}
                  />
                  <div className="col-span-full mt-2">
                    <BuilderActionTimeline />
                  </div>
                  <div className="col-span-full mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                      <AIDecisionAssistant />
                      <AIProjectCommandCenter />
                    </div>
                    <div className="lg:col-span-1 flex flex-col gap-6">
                      <ProjectCostPrediction />
                      <SmartLabourPoolAnalyzer />
                      <TrustAndCompliance />
                    </div>
                  </div>
                  <div className="col-span-full mt-2">
                    <AIHiringRecommendations />
                  </div>
                </>
              )}

              {isClient && (
                <>
                  <MetricCard
                    title="My Projects"
                    value={4}
                    icon={Briefcase}
                    color="blue"
                    onClick={() => router.push("/client/projects")}
                  />
                  <MetricCard
                    title="Builders Contacted"
                    value={9}
                    icon={Users}
                    color="purple"
                    onClick={() => router.push("/client/builders")}
                  />
                  <MetricCard
                    title="Project Updates"
                    value={14}
                    icon={Bell}
                    color="emerald"
                    onClick={() => router.push("/client/updates")}
                  />
                  <div className="col-span-full mt-4">
                    <ProjectPreview3D />
                  </div>
                  <div className="col-span-full mt-8">
                    <AIProjectHealth />
                  </div>
                  <div className="col-span-full mt-8">
                    <SmartBudgetDriftMonitor />
                  </div>
                  <div className="col-span-full mt-8">
                    <ClientActionTimeline />
                  </div>
                </>
              )}
            </motion.div>

            {isLabourer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <AIMatchedJobs />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-8 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
                    <p className="text-muted-foreground">
                      Here's what you can do next to get the most out of BuildBridge:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(isLabourer
                      ? [
                        { label: "Find Jobs", href: "/jobs" },
                        { label: "Applications", href: "/applications" },
                        { label: "Payments", href: "/payments" },
                        { label: "Profile", href: "/profile" },
                      ]
                      : isBuilder
                        ? [
                          { label: "New Project", href: "/builder/projects/new" },
                          { label: "Hire Labourers", href: "/builder/labourers" },
                          { label: "Track Projects", href: "/builder/projects" },
                          { label: "Manage Payments", href: "/builder/payments" },
                        ]
                        : [
                          { label: "Post Job", href: "/client/post-job" },
                          { label: "Find Builders", href: "/client/builders" },
                          { label: "Milestones", href: "/client/projects" },
                          { label: "Payments", href: "/client/payments" },
                        ]
                    ).map((task, i) => (
                      <div
                        key={i}
                        onClick={() => router.push(task.href)}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer border border-transparent hover:border-border"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="font-medium">{task.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  onClick,
}: {
  title: string
  value: number
  icon: any
  color: "blue" | "purple" | "emerald"
  onClick?: () => void
}) {
  const count = useCountUp(value, 2000)
  const [isHovered, setIsHovered] = useState(false)

  const styles = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/30",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      text: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/30",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/30",
    },
  }

  const currentStyle = styles[color]

  return (
    <motion.div
      onClick={() => onClick?.()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer group"
    >
      <Card
        className={`
          p-6 relative overflow-hidden
          bg-card border-border
          transition-all duration-300
          ${currentStyle.border}
          shadow-sm hover:shadow-lg
        `}
      >
        <div className="flex items-center justify-between mb-4 relative z-10">
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </p>
          <div className={`p-2 rounded-lg ${currentStyle.bg} transition-colors`}>
            <Icon className={`h-5 w-5 ${currentStyle.text}`} />
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-4xl font-bold text-foreground tracking-tight">
            {count}
          </h3>
        </div>

        {/* Subtle background decoration */}
        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${currentStyle.gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity`} />
      </Card>
    </motion.div>
  )
}
