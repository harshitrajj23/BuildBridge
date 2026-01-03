"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useBuildBridgeStore } from "@/lib/store"
import { PageTransition } from "@/components/common/page-transition"
import { LogOut, Briefcase, Users, Bell, Sparkles } from "lucide-react"

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

    // 🔑 Sync role from localStorage → store
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-transparent blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-[120px]"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-500/10 via-orange-500/5 to-transparent blur-[100px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container max-w-screen-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Welcome back, {userName}!
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  You're logged in as a{" "}
                  <span className="font-semibold capitalize bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {userRole}
                  </span>
                </motion.p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  className="gap-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <LogOut className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Sign Out</span>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
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
                    gradient="from-blue-500 via-blue-600 to-cyan-500"
                    glowColor="blue"
                    delay={0}
                    onClick={() => router.push("/jobs")}
                  />
                  <MetricCard
                    title="Completed Works"
                    value={18}
                    icon={Users}
                    gradient="from-purple-500 via-fuchsia-500 to-pink-500"
                    glowColor="purple"
                    delay={0.08}
                    onClick={() => router.push("/completed-works")}
                  />
                  <MetricCard
                    title="Payments Received"
                    value={12}
                    icon={Bell}
                    gradient="from-emerald-500 via-green-500 to-teal-500"
                    glowColor="emerald"
                    delay={0.16}
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
                    gradient="from-blue-500 via-blue-600 to-cyan-500"
                    glowColor="blue"
                    delay={0}
                  />
                  <MetricCard
                    title="Hired Labourers"
                    value={32}
                    icon={Users}
                    gradient="from-purple-500 via-fuchsia-500 to-pink-500"
                    glowColor="purple"
                    delay={0.08}
                  />
                  <MetricCard
                    title="Pending Approvals"
                    value={5}
                    icon={Bell}
                    gradient="from-emerald-500 via-green-500 to-teal-500"
                    glowColor="emerald"
                    delay={0.16}
                  />
                </>
              )}

              {isClient && (
                <>
                  <MetricCard
                    title="My Projects"
                    value={4}
                    icon={Briefcase}
                    gradient="from-blue-500 via-blue-600 to-cyan-500"
                    glowColor="blue"
                    delay={0}
                    onClick={() => router.push("/client/projects")}
                  />
                  <MetricCard
                    title="Builders Contacted"
                    value={9}
                    icon={Users}
                    gradient="from-purple-500 via-fuchsia-500 to-pink-500"
                    glowColor="purple"
                    delay={0.08}
                    onClick={() => router.push("/client/builders")}
                  />
                  <MetricCard
                    title="Project Updates"
                    value={14}
                    icon={Bell}
                    gradient="from-emerald-500 via-green-500 to-teal-500"
                    glowColor="emerald"
                    delay={0.16}
                    onClick={() => router.push("/client/updates")}
                  />
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
                  <p className="text-muted-foreground mb-6">
                    Here's what you can do next to get the most out of BuildBridge:
                  </p>
                  <div className="space-y-3">
                    {[<div className="space-y-3">
                      {(isLabourer
                        ? [
                          { label: "Find nearby construction jobs", href: "/jobs" },
                          { label: "Apply for daily or long-term work", href: "/applications" },
                          { label: "Track your payments securely", href: "/payments" },
                          { label: "Build your work profile", href: "/profile" },
                        ]
                        : isBuilder
                          ? [
                            { label: "Post new construction projects", href: "/builder/projects/new" },
                            { label: "Hire skilled labourers", href: "/builder/labourers" },
                            { label: "Track project progress", href: "/builder/projects" },
                            { label: "Manage payments and contracts", href: "/builder/payments" },
                          ]
                          : [
                            { label: "Post your construction requirement", href: "/client/post-job" },
                            { label: "Compare builders and contractors", href: "/client/builders" },
                            { label: "Track project milestones", href: "/client/projects" },
                            { label: "Make secure payments", href: "/client/payments" },
                          ]
                      ).map((task, i) => (
                        <motion.div
                          key={i}
                          onClick={() => router.push(task.href)}
                          className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/50 transition-all cursor-pointer"
                        >
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                          <span>{task.label}</span>
                        </motion.div>
                      ))}
                    </div>,
                    ].map((task, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/50 transition-all cursor-pointer group border border-transparent hover:border-primary/20"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <span className="group-hover:text-foreground transition-colors">{task}</span>
                      </motion.div>
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
  gradient,
  glowColor,
  delay,
  onClick,
}: {
  title: string
  value: number
  icon: any
  gradient: string
  glowColor: string
  delay: number
  onClick?: () => void
}) {
  const count = useCountUp(value, 2000)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), {
    stiffness: 150,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), {
    stiffness: 150,
    damping: 25,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const glowColors = {
    blue: "shadow-[0_0_30px_rgba(59,130,246,0.5),0_0_60px_rgba(59,130,246,0.2),inset_0_0_10px_rgba(59,130,246,0.05)]",
    purple: "shadow-[0_0_30px_rgba(168,85,247,0.5),0_0_60px_rgba(168,85,247,0.2),inset_0_0_10px_rgba(168,85,247,0.05)]",
    emerald:
      "shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_60px_rgba(16,185,129,0.2),inset_0_0_10px_rgba(16,185,129,0.05)]",
  }

  return (
    <motion.div
      onClick={() => onClick?.()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
    >
      <Card
        className={`
          p-6 relative overflow-hidden cursor-pointer
          bg-card/60 backdrop-blur-xl border-border/60
          transition-all duration-500
          ${isHovered
            ? `${glowColors[glowColor as keyof typeof glowColors]} border-${glowColor}-500/50`
            : "shadow-2xl shadow-black/20"
          }
        `}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${gradient} rounded-full blur-[100px]`}
          animate={{
            opacity: isHovered ? 0.4 : 0.25,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.7 }}
        />

        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between mb-4">
            <motion.p
              className="text-sm font-medium text-muted-foreground"
              animate={{
                x: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {title}
            </motion.p>
            <motion.div
              animate={{
                rotate: isHovered ? 15 : 0,
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className={`relative ${isHovered ? `drop-shadow-[0_0_10px_currentColor]` : ""}`}
            >
              <Icon
                className={`h-6 w-6 bg-gradient-to-br ${gradient} text-transparent bg-clip-text`}
                strokeWidth={2.5}
              />
            </motion.div>
          </div>

          <motion.p
            className={`text-5xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {count}
          </motion.p>

          <motion.div
            className="mt-4 h-1 rounded-full bg-muted/30 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${gradient}`}
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "0%" : "-100%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
