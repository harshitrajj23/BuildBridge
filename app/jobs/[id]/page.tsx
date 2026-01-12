"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useJob, useBids } from "@/lib/api-hooks"
import { PageTransition } from "@/components/common/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/data/error-state"
import { MapPin, Calendar, DollarSign, Send } from "lucide-react"
import Link from "next/link"
import type { Bid, JobListing } from "@/types"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { data: jobData, isLoading: jobLoading, error: jobError, refetch: refetchJob } = useJob(params.id)
  const { data: bidsData, isLoading: bidsLoading } = useBids(params.id)
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)

  const job = jobData as JobListing | undefined
  const bids = bidsData as Bid[] | undefined

  const daysRemaining = job ? Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  if (jobError) {
    return (
      <PageTransition>
        <ErrorState
          title="Job not found"
          description="The job you're looking for doesn't exist or has been removed."
          onRetry={() => refetchJob()}
        />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/jobs">
            <Button variant="ghost" className="mb-6">
              ← Back to Jobs
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {jobLoading ? (
                <>
                  <Skeleton className="h-12 w-2/3" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-40 w-full" />
                </>
              ) : job ? (
                <>
                  <div>
                    <Badge className="mb-3">{job.status}</Badge>
                    <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground">{job.company}</p>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Budget</p>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <p className="font-bold text-lg">${job.budget.toLocaleString()}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Location</p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <p className="font-semibold">{job.location}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Time Left</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <p className="font-semibold">{daysRemaining} days</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <Badge variant="outline">{bids?.length || 0} bids</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Job Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Required Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill) => (
                          <Badge key={skill.id} variant="secondary">
                            {skill.name}
                            <span className="ml-2 text-xs opacity-70">({skill.level})</span>
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : null}
            </motion.div>

            {/* Bids Panel */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Proposals</CardTitle>
                  <CardDescription>{bids?.length || 0} bids received</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bidsLoading ? (
                    <>
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </>
                  ) : bids && bids.length > 0 ? (
                    bids.map((bid, idx) => (
                      <motion.div
                        key={bid.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all"
                        onClick={() => setSelectedBid(bid)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={bid.workerAvatar || "/placeholder.svg"} alt={bid.workerName} />
                            <AvatarFallback>{bid.workerName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{bid.workerName}</p>
                            <p className="text-xs text-muted-foreground mb-2">{bid.duration}</p>
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-primary">${bid.amount}</p>
                              <Badge variant="outline" className="text-xs">
                                {bid.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No bids yet</p>
                  )}

                  {selectedBid && (
                    <motion.div
                      className="p-4 bg-muted rounded-lg border border-primary/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-xs font-semibold mb-2 uppercase text-muted-foreground">Proposal</p>
                      <p className="text-sm text-foreground">{selectedBid.proposal}</p>
                      <Button className="w-full mt-4" size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
