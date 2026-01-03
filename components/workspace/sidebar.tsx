"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"
import { useProjectMessages, useAddMessage } from "@/lib/api-hooks"
import type { Message } from "@/types"

interface WorkspaceSidebarProps {
  projectId?: string
}

export function WorkspaceSidebar({ projectId = "project-1" }: WorkspaceSidebarProps) {
  const { data: messages = [], isLoading } = useProjectMessages(projectId)
  const { mutate: addMessage, isPending } = useAddMessage(projectId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(
        {
          content: inputValue,
          senderId: "current-user",
          senderName: "You",
          senderAvatar: "/ai-avatar.png",
        },
        {
          onSuccess: () => setInputValue(""),
        },
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-80 border-r border-border/40 backdrop-blur-md bg-background/30 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <h3 className="font-semibold text-sm mb-2">Team Chat</h3>
        <p className="text-xs text-muted-foreground">Project Discussion</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message: Message, index: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex gap-2 ${message.isOwn ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                  <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                </Avatar>

                <div className={`flex flex-col gap-1 ${message.isOwn ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-xs backdrop-blur-sm transition-all hover:shadow-lg ${
                      message.isOwn
                        ? "bg-primary/20 text-foreground border border-primary/30"
                        : "bg-muted/40 text-foreground border border-border/20"
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-muted-foreground px-3">
                    {message.timestamp &&
                      new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/20 space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Type message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="text-sm bg-muted/30 border-border/30 backdrop-blur-sm"
            disabled={isPending}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="flex-shrink-0"
          >
            <Button
              size="icon"
              className="h-10 w-10 bg-primary hover:bg-primary/90"
              disabled={isPending || !inputValue.trim()}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
