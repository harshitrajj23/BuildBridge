"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileUp, Activity, Download, Trash2 } from "lucide-react"

interface WorkspaceFile {
  id: string
  name: string
  size: string
  uploadedBy: string
  uploadedAt: Date
  type: "design" | "document" | "code"
}

interface ActivityItem {
  id: string
  action: string
  author: string
  timestamp: Date
  icon: React.ReactNode
}

export function WorkspaceRightPanel({
  activeTab,
  setActiveTab,
}: {
  activeTab: "files" | "activity"
  setActiveTab: (tab: "files" | "activity") => void
}) {
  const [files, setFiles] = useState<WorkspaceFile[]>([
    {
      id: "1",
      name: "Design Mockups.fig",
      size: "12.5 MB",
      uploadedBy: "Sarah Chen",
      uploadedAt: new Date(Date.now() - 2 * 60 * 60000),
      type: "design",
    },
    {
      id: "2",
      name: "API Documentation.md",
      size: "2.3 MB",
      uploadedBy: "Alex Rivera",
      uploadedAt: new Date(Date.now() - 4 * 60 * 60000),
      type: "document",
    },
    {
      id: "3",
      name: "Frontend Components.tsx",
      size: "5.1 MB",
      uploadedBy: "Alex Rivera",
      uploadedAt: new Date(Date.now() - 6 * 60 * 60000),
      type: "code",
    },
  ])

  const [isDragging, setIsDragging] = useState(false)

  const activityItems: ActivityItem[] = [
    {
      id: "1",
      action: "Updated milestone status to Approved",
      author: "Jordan Kim",
      timestamp: new Date(Date.now() - 30 * 60000),
      icon: "✓",
    },
    {
      id: "2",
      action: "Uploaded new design mockups",
      author: "Sarah Chen",
      timestamp: new Date(Date.now() - 1 * 60 * 60000),
      icon: "📤",
    },
    {
      id: "3",
      action: "Joined the project",
      author: "Jordan Kim",
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      icon: "👤",
    },
    {
      id: "4",
      action: "Created project and added files",
      author: "Alex Rivera",
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      icon: "📁",
    },
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop
  }

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-80 border-l border-border/40 backdrop-blur-md bg-background/30 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex gap-2 mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("files")}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "files"
                ? "bg-primary/20 text-foreground border border-primary/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileUp className="h-4 w-4 inline mr-2" />
            Files
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("activity")}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "activity"
                ? "bg-primary/20 text-foreground border border-primary/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="h-4 w-4 inline mr-2" />
            Activity
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "files" ? (
            <motion.div
              key="files"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4"
            >
              {/* Upload Zone */}
              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                  backgroundColor: isDragging ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)",
                  borderColor: isDragging ? "rgb(59, 130, 246)" : "currentColor",
                }}
                transition={{ duration: 0.2 }}
                className="border-2 border-dashed border-border/40 rounded-lg p-4 text-center transition-all cursor-pointer hover:border-primary/50"
              >
                <motion.div animate={{ y: isDragging ? -4 : 0 }} transition={{ duration: 0.2 }}>
                  <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Drop files here</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </motion.div>
              </motion.div>

              {/* Files List */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground px-2">Recent Files</p>
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 rounded-lg bg-muted/30 border border-border/20 hover:border-border/40 transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <FileUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.uploadedBy} • {file.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {file.size}
                      </Badge>
                    </div>
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4"
            >
              {/* Activity Timeline */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground px-2">Activity Feed</p>
                {activityItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative pl-6"
                  >
                    {/* Vertical Line */}
                    {index < activityItems.length - 1 && (
                      <motion.div
                        layoutId={`line-${item.id}`}
                        className="absolute left-2 top-6 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-primary/0"
                      />
                    )}

                    {/* Timeline Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: index * 0.05 + 0.1 }}
                      className="absolute left-0 top-0 w-5 h-5 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-xs"
                    >
                      {item.icon}
                    </motion.div>

                    {/* Content */}
                    <div className="bg-muted/30 border border-border/20 rounded-lg p-3 hover:border-border/40 transition-all">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.author} • {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
