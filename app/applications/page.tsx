"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, IndianRupee, Briefcase } from "lucide-react"

type ApplicationStatus = "Pending" | "Accepted" | "Rejected"

interface Application {
  id: number
  title: string
  location: string
  pay: number
  duration: string
  type: "Daily" | "Contract"
  appliedOn: string
  status: ApplicationStatus
}

const mockApplications: Application[] = [
  {
    id: 1,
    title: "Apartment Construction – Electrician",
    location: "Whitefield, Bengaluru",
    pay: 1200,
    duration: "8 hours/day",
    type: "Daily",
    appliedOn: "12 Dec 2025",
    status: "Pending",
  },
  {
    id: 2,
    title: "Commercial Complex – Mason",
    location: "Yelahanka, Bengaluru",
    pay: 18000,
    duration: "15 days",
    type: "Contract",
    appliedOn: "08 Dec 2025",
    status: "Accepted",
  },
  {
    id: 3,
    title: "Villa Renovation – Painter",
    location: "Electronic City, Bengaluru",
    pay: 9500,
    duration: "10 days",
    type: "Contract",
    appliedOn: "05 Dec 2025",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Independent House – Plumber",
    location: "Rajajinagar, Bengaluru",
    pay: 1100,
    duration: "1 day",
    type: "Daily",
    appliedOn: "14 Dec 2025",
    status: "Pending",
  },
]

export default function ApplicationsPage() {
  return (
    <motion.div
      className="min-h-screen px-4 py-12 bg-gradient-to-br from-background to-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">My Job Applications</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            View all construction jobs you have applied for in Bengaluru, track their status,
            payment details, and job duration.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockApplications.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="hover:shadow-xl transition-all">
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-snug">
                      {job.title}
                    </CardTitle>
                    <Badge
                      variant={
                        job.status === "Accepted"
                          ? "default"
                          : job.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Job details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="font-semibold">
                        ₹{job.pay.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span>{job.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{job.duration}</span>
                    </div>

                    <div className="text-muted-foreground">
                      Applied on: <span className="font-medium">{job.appliedOn}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    View Application Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}