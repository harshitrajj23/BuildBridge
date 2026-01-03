"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface DisputeMessage {
  id: string
  sender: string
  avatar?: string
  role: "user" | "admin"
  message: string
  timestamp: string
}

interface Dispute {
  id: string
  title: string
  status: "open" | "in-review" | "resolved"
  priority: "low" | "medium" | "high"
  user: string
  messages: DisputeMessage[]
}

const mockDisputes: Dispute[] = [
  {
    id: "1",
    title: "Payment not received for completed project",
    status: "open",
    priority: "high",
    user: "John Doe",
    messages: [
      {
        id: "m1",
        sender: "John Doe",
        role: "user",
        message: "I completed the project 5 days ago but haven't received payment.",
        timestamp: "2024-12-11 10:30",
      },
      {
        id: "m2",
        sender: "Admin",
        role: "admin",
        message: "We're looking into this. Can you provide the project ID?",
        timestamp: "2024-12-11 11:15",
      },
      {
        id: "m3",
        sender: "John Doe",
        role: "user",
        message: "Project ID: #12345",
        timestamp: "2024-12-11 11:45",
      },
    ],
  },
  {
    id: "2",
    title: "Unprofessional behavior from collaborator",
    status: "in-review",
    priority: "medium",
    user: "Jane Smith",
    messages: [
      {
        id: "m4",
        sender: "Jane Smith",
        role: "user",
        message: "The designer on my project has been unresponsive for 3 days.",
        timestamp: "2024-12-10 14:20",
      },
    ],
  },
]

export function DisputePanel() {
  const [disputes] = useState<Dispute[]>(mockDisputes)
  const [selectedDispute, setSelectedDispute] = useState<Dispute>(disputes[0])
  const [newMessage, setNewMessage] = useState("")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      case "medium":
        return "bg-orange-500/20 text-orange-600 dark:text-orange-400"
      case "low":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      default:
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
    }
  }

  return (
    <motion.div
      className="grid lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Disputes List */}
      <div className="lg:col-span-1 space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-2">Open Disputes</h3>
        <AnimatePresence mode="sync">
          {disputes.map((dispute, index) => (
            <motion.button
              key={dispute.id}
              onClick={() => setSelectedDispute(dispute)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedDispute.id === dispute.id
                  ? "bg-primary/10 border border-primary/50"
                  : "bg-muted/50 hover:bg-muted border border-transparent hover:border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2">{dispute.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{dispute.user}</p>
                </div>
                <Badge className={getPriorityColor(dispute.priority)} variant="secondary">
                  {dispute.priority}
                </Badge>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="text-lg">{selectedDispute.title}</CardTitle>
            <CardDescription>{selectedDispute.user}</CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">{selectedDispute.status}</Badge>
              <Badge className={getPriorityColor(selectedDispute.priority)}>{selectedDispute.priority}</Badge>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
            <AnimatePresence>
              {selectedDispute.messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${msg.role === "admin" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "user" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback>{msg.sender.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-xs ${msg.role === "admin" ? "order-2" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.role === "admin" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>

                  {msg.role === "admin" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>

          {/* Input */}
          <div className="border-t border-border p-4 flex gap-2">
            <Input
              placeholder="Type your response..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
