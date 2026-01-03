"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useWorkers } from "@/lib/api-hooks"
import { PageTransition } from "@/components/common/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { WorkerCard } from "@/components/data/worker-card"
import { WorkerCardSkeleton } from "@/components/data/card-skeleton"
import { List, MapIcon, SearchIcon } from "lucide-react"

export default function SearchPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const { data: workers, isLoading } = useWorkers({ page: 1, limit: 12 })

  const filteredWorkers = workers?.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-4xl font-bold">Find Talent</h1>
            <p className="text-lg text-muted-foreground">Discover qualified workers for your next project</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or skill..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Found {filteredWorkers?.length || 0} workers</div>
              <div className="flex gap-2">
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  List
                </Button>
                <Button
                  variant={view === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("map")}
                  className="gap-2"
                >
                  <MapIcon className="w-4 h-4" />
                  Map
                </Button>
              </div>
            </div>
          </motion.div>

          {/* List View */}
          {view === "list" && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <WorkerCardSkeleton key={i} />)
                : filteredWorkers?.map((worker, idx) => <WorkerCard key={worker.id} worker={worker} index={idx} />)}
            </motion.div>
          )}

          {/* Map View */}
          {view === "map" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="h-96">
                <CardContent className="pt-6 h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Map View</h3>
                      <p className="text-sm text-muted-foreground">{filteredWorkers?.length || 0} workers</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      {filteredWorkers?.slice(0, 9).map((worker, idx) => (
                        <motion.div
                          key={worker.id}
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold cursor-pointer hover:bg-primary/20 transition-colors"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {worker.name.charAt(0)}
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Worker locations displayed as a grid (integrate Mapbox/Leaflet for full map)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
