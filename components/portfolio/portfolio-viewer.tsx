"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Box } from "lucide-react"
import type { PortfolioItem } from "@/types"
import Image from "next/image"

interface PortfolioViewerProps {
  items: PortfolioItem[]
}

export function PortfolioViewer({ items }: PortfolioViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [view3D, setView3D] = useState(false)

  const selected = items[selectedIndex]

  const handlePrevious = () => {
    setSelectedIndex((i) => (i - 1 + items.length) % items.length)
    setView3D(false)
  }

  const handleNext = () => {
    setSelectedIndex((i) => (i + 1) % items.length)
    setView3D(false)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                {view3D && selected.modelUrl ? (
                  <div className="relative bg-muted rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center">
                    <model-viewer
                      src={selected.modelUrl}
                      alt={selected.title}
                      auto-rotate
                      camera-controls
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative bg-muted rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center">
                    <Image
                      src={selected.image || "/placeholder.svg"}
                      alt={selected.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold mb-2">{selected.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {selected.modelUrl && (
                    <Button
                      size="sm"
                      variant={view3D ? "default" : "outline"}
                      onClick={() => setView3D(!view3D)}
                      className="gap-2"
                    >
                      <Box className="w-4 h-4" />
                      {view3D ? "View Image" : "View 3D"}
                    </Button>
                  )}
                  {selected.link && (
                    <Button size="sm" variant="outline" asChild className="gap-2 bg-transparent">
                      <a href={selected.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Visit Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails and Navigation */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {items.map((item, idx) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setSelectedIndex(idx)
                setView3D(false)
              }}
              className={`relative rounded-lg overflow-hidden aspect-square transition-all ${
                idx === selectedIndex ? "ring-2 ring-primary" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handlePrevious}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {selectedIndex + 1} of {items.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
