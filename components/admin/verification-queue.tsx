"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Eye } from "lucide-react"

interface VerificationUser {
  id: string
  name: string
  email: string
  role: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  avatar?: string
}

const mockUsers: VerificationUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Designer",
    submittedDate: "2024-12-10",
    status: "pending",
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "Developer",
    submittedDate: "2024-12-09",
    status: "pending",
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "Manager",
    submittedDate: "2024-12-08",
    status: "pending",
  },
]

export function VerificationQueue() {
  const [users, setUsers] = useState<VerificationUser[]>(mockUsers)

  const handleApprove = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleReject = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 px-4">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-muted/50 border-b border-border"
                  >
                    <TableCell className="px-4 py-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{user.submittedDate}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(user.id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReject(user.id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4" />
                      </motion.button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
        {users.length === 0 && (
          <motion.div
            className="text-center py-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>All users verified! No pending requests.</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
