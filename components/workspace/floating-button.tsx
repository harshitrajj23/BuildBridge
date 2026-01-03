"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageSquare, FileUp, Share2, Settings } from "lucide-react"

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  color: string
}

export function WorkspaceFloatingButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "New Message",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "2",
      label: "Upload File",
      icon: <FileUp className="h-5 w-5" />,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "3",
      label: "Share Project",
      icon: <Share2 className="h-5 w-5" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "4",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 space-y-3"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 10 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
                  className="bg-background/80 border border-border/40 rounded-lg px-3 py-2 backdrop-blur-sm whitespace-nowrap text-sm font-medium text-foreground"
                >
                  {action.label}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full text-white shadow-lg transition-all ${action.color}`}
                >
                  {action.icon}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
      >
        <Plus className="h-6 w-6" />

        {/* Glow Effect */}
        <motion.div
          animate={{ scale: isOpen ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-primary/20 rounded-full"
        />
      </motion.button>
    </div>
  )
}
