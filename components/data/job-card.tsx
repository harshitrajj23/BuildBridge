"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign } from "lucide-react"
import type { JobListing } from "@/types"

interface JobCardProps {
  job: JobListing
  onClick?: () => void
  index?: number
}

export function JobCard({ job, onClick, index = 0 }: JobCardProps) {
  const deadlineDate = job.deadline ? new Date(job.deadline) : null
  const daysRemaining = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const skills = job.requiredSkills ?? []

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={onClick}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="line-clamp-2">{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </div>
            <Badge variant={job.status === "open" ? "default" : "secondary"}>
              {job.status === "open" ? "Hiring" : "Filled"}
            </Badge>
          </div>
        </CardHeader>x
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary font-bold">₹</span>
              <span className="font-semibold">
                {job.budget.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{daysRemaining !== null ? `${daysRemaining} days left` : "No deadline"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill.id ?? skill.name} variant="outline" className="text-xs">
                {skill.name}
              </Badge>
            ))}

            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3} more
              </Badge>
            )}

            {skills.length === 0 && (
              <Badge variant="outline" className="text-xs">
                No skills listed
              </Badge>
            )}
          </div>

          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
