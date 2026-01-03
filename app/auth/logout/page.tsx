"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useBuildBridgeStore } from "@/lib/store"

export default function LogoutPage() {
  const router = useRouter()
  const { resetStore } = useBuildBridgeStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      resetStore()
      router.push("/")
    }, 1500)

    return () => clearTimeout(timer)
  }, [router, resetStore])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="flex justify-center"
        >
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary" />
        </motion.div>
        <h1 className="text-2xl font-bold">Signing out...</h1>
        <p className="text-muted-foreground">See you soon!</p>
      </motion.div>
    </div>
  )
}
