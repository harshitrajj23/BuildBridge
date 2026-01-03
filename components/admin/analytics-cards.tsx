"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertCircle, TrendingUp, CheckCircle } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  color: string
  index: number
}

function StatCard({ title, value, description, icon, color, index }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden border-border hover:border-primary/50 transition-colors">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-20 rounded-full blur-2xl`} />

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className={`${color.replace("bg-", "text-")} opacity-70`}>{icon}</div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div className="text-3xl font-bold">{count}</motion.div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AnalyticsCards() {
  const stats = [
    {
      title: "Pending Verifications",
      value: 24,
      description: "Awaiting review",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Active Disputes",
      value: 8,
      description: "Requires attention",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-orange-500",
    },
    {
      title: "Verified Users",
      value: 1842,
      description: "Platform members",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Platform Growth",
      value: 12,
      description: "% increase this month",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
          index={index}
        />
      ))}
    </motion.div>
  )
}
