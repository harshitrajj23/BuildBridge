"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, Calendar, MapPin, CheckCircle, Clock } from "lucide-react"

interface Payment {
  id: number
  jobTitle: string
  location: string
  amount: number
  date: string
  status: "Paid" | "Pending"
}

const mockPayments: Payment[] = [
  {
    id: 1,
    jobTitle: "Apartment Wiring – Electrician",
    location: "Whitefield, Bengaluru",
    amount: 2400,
    date: "10 Dec 2025",
    status: "Paid",
  },
  {
    id: 2,
    jobTitle: "Villa Renovation – Painter",
    location: "Electronic City, Bengaluru",
    amount: 9500,
    date: "14 Dec 2025",
    status: "Pending",
  },
  {
    id: 3,
    jobTitle: "Independent House – Plumber",
    location: "Rajajinagar, Bengaluru",
    amount: 1100,
    date: "15 Dec 2025",
    status: "Paid",
  },
]

export default function PaymentsPage() {
  const totalEarnings = mockPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <motion.div
      className="min-h-screen px-4 py-12 bg-gradient-to-br from-background to-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-2">
            Track your earnings, payment status, and completed work
          </p>
        </div>

        {/* Total earnings */}
        <Card className="bg-card/60 backdrop-blur">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-3xl font-bold mt-1">
                ₹{totalEarnings.toLocaleString("en-IN")}
              </p>
            </div>
            <IndianRupee className="w-10 h-10 text-primary" />
          </CardContent>
        </Card>

        {/* Payments list */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="hover:shadow-xl transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      {payment.jobTitle}
                    </CardTitle>
                    <Badge
                      variant={payment.status === "Paid" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {payment.status === "Paid" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {payment.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {payment.date}
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <IndianRupee className="w-4 h-4" />
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}