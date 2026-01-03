"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/common/page-transition"
import { useBuildBridgeStore } from "@/lib/store"
import { Code2, Palette, Users, ArrowRight } from "lucide-react"

export default function Home() {
  const { isLoggedIn } = useBuildBridgeStore()

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, 50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const roles = [
    {
      icon: Palette,
      title: "Labourers",
      description:
        "Find reliable work nearby, build your profile, and get paid securely for every job you complete.",
      cta: "Join as Worker →",
      href: "/signup?role=Labourer",
    },
    {
      icon: Code2,
      title: "Builders & Contractors",
      description:
        "Hire skilled labourers, manage projects, track progress, and handle payments with ease.",
      cta: "Manage Projects →",
      href: "/signup?role=Builder",
    },
    {
      icon: Users,
      title: "Clients",
      description:
        "Post jobs, compare verified workers, and complete construction work with transparent pricing and secure payments.",
      cta: "Post a Job →",
      href: "/signup?role=Client",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-[100px]"
            animate={{
              x: [0, 60, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-500/25 via-pink-500/25 to-orange-500/20 blur-[120px]"
            animate={{
              x: [0, -40, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 22,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/20 via-emerald-500/15 to-blue-500/20 blur-[90px]"
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-500/15 via-violet-500/15 to-fuchsia-500/15 blur-[80px]"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 24,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div className="container px-4 md:px-6 relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            className="flex flex-col items-center space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="relative inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/20"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatDelay: 2,
                }}
              />
              <span className="relative text-xs md:text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                The bridge between disciplines
              </span>
            </motion.div>

            <div className="relative">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-[120px] rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-purple-500/25 via-pink-500/25 to-orange-500/20 blur-[80px] rounded-full"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              <h1 className="relative text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Build Together,
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Create Better
                </motion.span>
              </h1>
            </div>

            <motion.p
              className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground text-balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              BuildBridge connects designers, developers, and managers in a unified workspace. Collaborate in real-time,
              share feedback instantly, and ship products faster.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-2xl opacity-40" />
                    <Button
                      size="lg"
                      className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 border-0 shadow-2xl shadow-blue-500/50"
                    >
                      Go to Dashboard
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-xl opacity-60 hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-2xl opacity-40" />
                      <Button
                        size="lg"
                        className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 border-0 shadow-2xl shadow-blue-500/50"
                      >
                        Get Started Free
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/about">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="backdrop-blur-sm bg-background/50 border-blue-500/30 hover:border-blue-500/50 hover:bg-background/80 shadow-lg"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Role-Based CTAs */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-balance">
              Built for Every Role
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Whether you design, develop, or manage, BuildBridge has what you need
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-6"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                    <p className="text-muted-foreground mb-6">{role.description}</p>

                    <Link href={isLoggedIn ? "/dashboard" : role.href}>
                      <Button variant="ghost" className="group/btn">
                        {role.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-balance">
                Why Teams Choose BuildBridge
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Real-time collaboration tools",
                  "Centralized feedback system",
                  "Component library integration",
                  "Progress tracking dashboards",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-foreground/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="h-[400px] rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/40">∞</div>
                <p className="text-sm text-muted-foreground mt-2">Unlimited Collaboration</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary/5 border-t border-b border-border">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Build Together?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of teams already collaborating on BuildBridge
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button size="lg">Start Free Trial</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Sales
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
