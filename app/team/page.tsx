"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/common/page-transition"
import { MapPin, Wrench } from "lucide-react"

const labourers = [
  {
    id: 1,
    name: "Ramesh Kumar",
    skill: "Electrician",
    location: "KR Puram, Bangalore",
    experience: "5 Years",
    status: "Available",
  },
  {
    id: 2,
    name: "Suresh Naik",
    skill: "Plumber",
    location: "Yeshwanthpur, Bangalore",
    experience: "7 Years",
    status: "Busy",
  },
  {
    id: 3,
    name: "Arjun Rao",
    skill: "Mason",
    location: "Banashankari, Bangalore",
    experience: "4 Years",
    status: "Available",
  },
]

export default function TeamPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Skilled Labourers
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-6">
            {labourers.map((worker, index) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{worker.name}</CardTitle>
                    <Badge variant={worker.status === "Available" ? "default" : "secondary"}>
                      {worker.status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-primary" />
                      {worker.skill}
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {worker.location}
                    </div>

                    <p className="text-muted-foreground">
                      Experience: <span className="font-medium">{worker.experience}</span>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}