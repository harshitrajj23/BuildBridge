"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/common/page-transition"
import { AdminHeader } from "@/components/admin/admin-header"
import { VerificationQueue } from "@/components/admin/verification-queue"
import { DisputePanel } from "@/components/admin/dispute-panel"
import { AnalyticsCards } from "@/components/admin/analytics-cards"
import { ActivityFeed } from "@/components/admin/activity-feed"
import { ModerationPanel } from "@/components/admin/moderation-panel"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"verification" | "disputes" | "moderation">("verification")

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 md:px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container max-w-screen-2xl space-y-8">
          <AdminHeader />

          {/* Analytics Cards */}
          <AnalyticsCards />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Verification & Disputes */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex gap-2 border-b border-border">
                {(["verification", "disputes"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium transition-colors relative ${
                      activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "verification" ? "User Verification" : "Disputes"}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="underline"
                        transition={{ type: "spring", stiffness: 380, damping: 40 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "verification" && <VerificationQueue />}
              {activeTab === "disputes" && <DisputePanel />}
            </motion.div>

            {/* Right: Moderation & Activity */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ModerationPanel />
              <ActivityFeed />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
