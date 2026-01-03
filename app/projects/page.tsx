"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/common/page-transition"
import { MapPin, Calendar } from "lucide-react"

const mockProjects = [
  {
    id: 1,
    title: "Apartment Construction",
    location: "Whitefield, Bangalore",
    status: "Ongoing",
    duration: "3 Months",
  },
  {
    id: 2,
    title: "Villa Renovation",
    location: "Yelahanka, Bangalore",
    status: "Completed",
    duration: "2 Months",
  },
  {
    id: 3,
    title: "Commercial Wiring Work",
    location: "Electronic City, Bangalore",
    status: "Ongoing",
    duration: "1 Month",
  },
]

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            My Projects
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-6">
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Duration: {project.duration}
                    </div>
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