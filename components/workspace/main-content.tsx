"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"
import { useProjectMilestones, useUpdateMilestone } from "@/lib/api-hooks"
import type { Milestone } from "@/types"

interface WorkspaceMainContentProps {
  projectId?: string
}

const MilestoneCard = ({
  milestone,
  onStatusChange,
  index,
  isUpdating,
}: {
  milestone: Milestone
  onStatusChange: (id: string, status: "pending" | "approved" | "rejected") => void
  index: number
  isUpdating: boolean
}) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
      label: "Pending",
    },
    approved: {
      icon: CheckCircle2,
      color: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
      label: "Approved",
    },
    rejected: {
      icon: XCircle,
      color: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
      label: "Rejected",
    },
  }

  const config = statusConfig[milestone.status]
  const StatusIcon = config.icon

  const statuses: Array<"pending" | "approved" | "rejected"> = ["pending", "approved", "rejected"]
  const nextStatus = statuses[(statuses.indexOf(milestone.status) + 1) % statuses.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <Card className="p-6 backdrop-blur-md bg-gradient-to-br from-card/50 to-card/20 border-border/40 hover:border-border/60 transition-all">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{milestone.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
            </div>
            <motion.div animate={{ rotate: milestone.status === "approved" ? 0 : 0 }} transition={{ type: "spring" }}>
              <StatusIcon className={`h-5 w-5 ${config.color.split(" ")[0]}`} />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{milestone.progress}%</span>
            </div>
            <div className="h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-border/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${milestone.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
          </div>

          {/* Status & Due Date */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStatusChange(milestone.id, nextStatus)}
              disabled={isUpdating}
              className={`px-3 py-1 rounded-md text-sm font-medium border flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 ${config.color}`}
            >
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <StatusIcon className="h-4 w-4" />}
              {config.label}
            </motion.button>
            <span className="text-xs text-muted-foreground">
              Due {new Date(milestone.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function WorkspaceMainContent({ projectId = "project-1" }: WorkspaceMainContentProps) {
  const { data: milestones = [], isLoading } = useProjectMilestones(projectId)
  const { mutate: updateMilestone, isPending } = useUpdateMilestone(projectId)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleStatusChange = (id: string, newStatus: "pending" | "approved" | "rejected") => {
    setUpdatingId(id)
    updateMilestone(
      { milestoneId: id, status: newStatus },
      {
        onSuccess: () => setUpdatingId(null),
        onError: () => setUpdatingId(null),
      },
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex-1 overflow-y-auto p-6 space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Project Milestones</h2>
        <p className="text-muted-foreground">Track progress and approve deliverables</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4">
          {milestones.map((milestone: Milestone, index: number) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onStatusChange={handleStatusChange}
              index={index}
              isUpdating={updatingId === milestone.id}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
