"use client"

import { motion } from "framer-motion"
import { useWorker, usePortfolio } from "@/lib/api-hooks"
import { PageTransition } from "@/components/common/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/data/error-state"
import { PortfolioViewer } from "@/components/portfolio/portfolio-viewer"
import { Star, MapPin, Briefcase, MessageSquare, DollarSign } from "lucide-react"
import Link from "next/link"

export default function WorkerDetailPage({ params }: { params: { id: string } }) {
  const { data: worker, isLoading: workerLoading, error: workerError, refetch: refetchWorker } = useWorker(params.id)
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio(params.id)

  const initials =
    worker?.name
      .split(" ")
      .map((n) => n[0])
      .join("") || "?"

  if (workerError) {
    return (
      <PageTransition>
        <ErrorState
          title="Worker not found"
          description="The worker profile you're looking for doesn't exist."
          onRetry={() => refetchWorker()}
        />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/workers">
            <Button variant="ghost" className="mb-6">
              ← Back to Workers
            </Button>
          </Link>

          {/* Header Section */}
          {workerLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : worker ? (
            <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row md:items-end md:gap-6 mb-8">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{worker.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{worker.title}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{worker.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({worker.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <span>{worker.completedProjects} projects</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </Button>
                    <Badge
                      variant={worker.availability === "available" ? "default" : "secondary"}
                      className="h-10 px-4"
                    >
                      {worker.availability === "available" ? "Available" : worker.availability}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <p className="text-3xl font-bold">{worker.hourlyRate}</p>
                    <p className="text-muted-foreground">/hr</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {worker && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {worker.skills.map((skill) => (
                          <Badge key={skill.id} variant="secondary">
                            {skill.name}
                            <span className="ml-2 text-xs opacity-70">({skill.level})</span>
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio</CardTitle>
                      <CardDescription>Recent work and projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {portfolioLoading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-48 w-full" />
                          <Skeleton className="h-48 w-full" />
                        </div>
                      ) : portfolio && portfolio.length > 0 ? (
                        <PortfolioViewer items={portfolio} />
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No portfolio items yet</p>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>

            {/* Reviews Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {worker && worker.reviews && worker.reviews.length > 0 && (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {worker.reviews.map((review, idx) => (
                      <motion.div
                        key={review.id}
                        className="pb-4 border-b last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm font-semibold">{review.authorName}</p>
                        <p className="text-xs text-muted-foreground mb-2">{review.date.toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
