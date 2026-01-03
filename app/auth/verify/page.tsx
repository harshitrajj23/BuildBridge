"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageTransition } from "@/components/common/page-transition"
import { Check, ArrowRight } from "lucide-react"

export default function VerifyPage() {
  const router = useRouter()
  const [count, setCount] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 border border-border text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold mb-2">Account Created!</h1>
            <p className="text-muted-foreground mb-8">
              Your BuildBridge account has been successfully created. Get ready to collaborate with your team.
            </p>

            <div className="space-y-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                className="text-3xl font-bold text-primary"
              >
                {count}
              </motion.div>
              <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>

              <Button onClick={() => router.push("/dashboard")} className="w-full group">
                Go to Dashboard Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
