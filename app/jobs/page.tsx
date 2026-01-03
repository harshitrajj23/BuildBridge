"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { JobCard } from "@/components/data/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Job = {
  id: string
  title: string
  description: string
  location: string
  budget: number
}

const MOCK_JOBS = [
  {
    id: "1",
    title: "Mason required for apartment project",
    description: "Looking for an experienced mason for 3-month residential project.",
    location: "Bangalore,Kormangla",
    budget: 25000,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Electrician needed",
    description: "Wiring and fittings for a commercial building.",
    location: "Bangalore,yelahanka",
    budget: 18000,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Plumber for villa work",
    description: "Complete plumbing setup for a new villa.",
    location: "Bangalore,HSR layout",
    budget: 20000,
    created_at: new Date().toISOString(),
  },
]
export default function JobsPage() {
  const [page, setPage] = useState(1)

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12 px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Available Jobs
          </motion.h1>
          <p className="text-muted-foreground">
            Discover construction work and apply instantly.
          </p>
        </div>

        {/* Search (UI only for now) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>

        {/* Jobs Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {MOCK_JOBS.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </motion.div>

        {/* Pagination UI (dummy for now) */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <span className="flex items-center px-4">Page {page}</span>
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}