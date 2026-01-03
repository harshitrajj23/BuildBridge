"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Briefcase } from "lucide-react"
import type { Worker } from "@/types"
import { useState } from "react"
import { WorkerPortfolioModal } from "@/components/portfolio/worker-portfolio-modal"

interface WorkerCardProps {
  worker: Worker
  onClick?: () => void
  index?: number
}

export function WorkerCard({ worker, onClick, index = 0 }: WorkerCardProps) {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const initials = worker.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={onClick}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="line-clamp-1">{worker.name}</CardTitle>
                <CardDescription className="line-clamp-1">{worker.title}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{worker.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({worker.reviewCount} reviews)</span>
              </div>
              <Badge variant={worker.availability === "available" ? "default" : "secondary"} className="text-xs">
                {worker.availability === "available" ? "Available" : worker.availability}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-primary">${worker.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{worker.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span>{worker.completedProjects} projects</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{worker.bio}</p>

            <div className="flex flex-wrap gap-1">
              {worker.skills.slice(0, 3).map((skill) => (
                <Badge key={skill.id} variant="outline" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
              {worker.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{worker.skills.length - 3}
                </Badge>
              )}
            </div>

            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                setShowPortfolio(true)
              }}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <WorkerPortfolioModal worker={worker} open={showPortfolio} onOpenChange={setShowPortfolio} />
    </>
  )
}
