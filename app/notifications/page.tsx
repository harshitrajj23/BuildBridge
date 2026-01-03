"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/common/page-transition"
import { Bell } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Job Assigned",
    message: "You have been assigned to an apartment wiring project in Whitefield.",
    type: "job",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Payment Released",
    message: "₹5,000 has been credited for the KR Puram plumbing work.",
    type: "payment",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "New Project Available",
    message: "A new construction project is available in Electronic City.",
    type: "alert",
    time: "2 days ago",
  },
]

export default function NotificationsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Notifications
          </motion.h1>

          <div className="space-y-4">
            {notifications.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex items-start gap-4">
                    <Bell className="w-6 h-6 text-primary mt-1" />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{note.title}</h3>
                        <Badge variant="outline">{note.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.message}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}