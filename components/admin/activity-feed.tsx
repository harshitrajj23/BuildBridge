"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface ActivityItem {
  id: string
  action: string
  user: string
  timestamp: string
  type: "verification" | "dispute" | "moderation" | "account"
}

const activities: ActivityItem[] = [
  {
    id: "1",
    action: "User verified",
    user: "Sarah Johnson",
    timestamp: "2 minutes ago",
    type: "verification",
  },
  {
    id: "2",
    action: "Dispute opened",
    user: "John Doe",
    timestamp: "15 minutes ago",
    type: "dispute",
  },
  {
    id: "3",
    action: "Content removed",
    user: "System",
    timestamp: "1 hour ago",
    type: "moderation",
  },
  {
    id: "4",
    action: "Account suspended",
    user: "Unknown User",
    timestamp: "3 hours ago",
    type: "account",
  },
  {
    id: "5",
    action: "Verification rejected",
    user: "Michael Brown",
    timestamp: "5 hours ago",
    type: "verification",
  },
]

const typeColors = {
  verification: "bg-green-500/20 text-green-600 dark:text-green-400",
  dispute: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
  moderation: "bg-red-500/20 text-red-600 dark:text-red-400",
  account: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
}

export function ActivityFeed() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
          <CardDescription>Platform activity log</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
              >
                {/* Timeline dot */}
                <div className="mt-1">
                  <motion.div className="h-2 w-2 rounded-full bg-primary" whileHover={{ scale: 1.5 }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <Badge className={typeColors[activity.type]} variant="secondary" className="text-xs flex-shrink-0">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
