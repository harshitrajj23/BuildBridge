"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Trash2 } from "lucide-react"

interface FlaggedContent {
  id: string
  type: string
  reportedBy: string
  reason: string
  status: "pending" | "reviewed"
}

const flaggedItems: FlaggedContent[] = [
  {
    id: "1",
    type: "User Comment",
    reportedBy: "user@example.com",
    reason: "Inappropriate language",
    status: "pending",
  },
  {
    id: "2",
    type: "User Profile",
    reportedBy: "admin@example.com",
    reason: "Suspicious activity",
    status: "pending",
  },
  {
    id: "3",
    type: "Project Description",
    reportedBy: "user@example.com",
    reason: "Spam content",
    status: "reviewed",
  },
]

export function ModerationPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Moderation Queue</CardTitle>
          </div>
          <CardDescription>{flaggedItems.length} items awaiting review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {flaggedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-medium text-sm">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.reportedBy}</p>
                </div>
                <Badge variant={item.status === "pending" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                  {item.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{item.reason}</p>

              {item.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1 bg-transparent">
                    <AlertTriangle className="h-3 w-3" />
                    Review
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1 h-8 text-xs gap-1">
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
