"use client"

import { usePortfolio } from "@/lib/api-hooks"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortfolioViewer } from "@/components/portfolio/portfolio-viewer"
import { Star, MapPin, Briefcase } from "lucide-react"
import type { Worker } from "@/types"

interface WorkerPortfolioModalProps {
  worker: Worker
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WorkerPortfolioModal({ worker, open, onOpenChange }: WorkerPortfolioModalProps) {
  const { data: portfolio = [], isLoading } = usePortfolio(worker.id)

  const initials = worker.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={worker.avatar || "/placeholder.svg"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{worker.name}</DialogTitle>
              <DialogDescription className="text-base mt-1">{worker.title}</DialogDescription>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{worker.rating}</span>
                  <span className="text-muted-foreground">({worker.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {worker.location}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {worker.completedProjects} projects
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">About</h3>
            <p className="text-muted-foreground">{worker.bio}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill) => (
                <Badge key={skill.id}>{skill.name}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Portfolio</h3>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading portfolio...</div>
            ) : portfolio.length > 0 ? (
              <PortfolioViewer items={portfolio} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">No portfolio items yet</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
