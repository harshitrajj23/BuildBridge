"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useWorkers } from "@/lib/api-hooks"
import { WorkerCard } from "@/components/data/worker-card"
import { WorkerCardSkeleton } from "@/components/data/card-skeleton"
import { ErrorState } from "@/components/data/error-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function WorkersPage() {
  const [page, setPage] = useState(1)
  const { data: workers, isLoading, error, refetch } = useWorkers({ page, limit: 10 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12 px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <motion.h1 className="text-4xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Expert Workers
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Find talented professionals across all skillsets and experience levels.
          </motion.p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search workers by skills..." className="pl-10" />
        </div>

        {error && (
          <ErrorState
            title="Failed to load workers"
            description={error instanceof Error ? error.message : "An error occurred"}
            onRetry={() => refetch()}
          />
        )}

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <WorkerCardSkeleton key={i} />
              ))}
            </>
          ) : workers && workers.length > 0 ? (
            workers.map((worker, index) => <WorkerCard key={worker.id} worker={worker} index={index} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No workers found. Try adjusting your search.</p>
            </div>
          )}
        </motion.div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="flex items-center px-4">Page {page}</span>
          <Button variant="outline" onClick={() => setPage(page + 1)} disabled={!workers || workers.length < 10}>
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
