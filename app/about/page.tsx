"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/common/page-transition"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      title: "Collaboration First",
      description: "We believe the best work happens when teams work together seamlessly.",
    },
    {
      title: "Quality Obsessed",
      description: "Every detail matters. We obsess over the user experience.",
    },
    {
      title: "Always Evolving",
      description: "We listen to our users and continuously improve our platform.",
    },
    {
      title: "Transparent",
      description: "Honest communication and open feedback guide our decisions.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-balance">
              About BuildBridge
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
              We're on a mission to eliminate silos and help teams build amazing products together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                BuildBridge was born from frustration. Our founders spent years watching teams struggle with
                disconnected tools, slow feedback loops, and miscommunication between disciplines.
              </p>
              <p className="text-muted-foreground">
                We decided to build the collaboration platform we wished existed. Today, BuildBridge connects thousands
                of designers, developers, and managers who are shipping faster and building better products.
              </p>
            </motion.div>
            <motion.div
              className="h-[400px] rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/40">2024</div>
                <p className="text-sm text-muted-foreground mt-2">Founded</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at BuildBridge
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-primary/5 border-t border-b border-border">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Join Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of the team revolution. Start collaborating better today.
            </p>
            <Link href="/signup">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
