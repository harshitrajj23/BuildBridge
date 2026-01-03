"use client"

import { useState } from "react"
import type React from "react"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PageTransition } from "@/components/common/page-transition"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase.from("contact_messages").insert([
      {
        full_name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      },
    ])

    setLoading(false)

    if (error) {
      setError("Failed to send message. Please try again.")
    } else {
      setSuccess(true)
      setFormData({ name: "", email: "", company: "", message: "" })
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "harshit787@gmail.com",
      href: "mailto:harshit787@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7870477511",
      href: "tel:+917870477511",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "BMSIT, Yelahanka, Bangalore",
      href: "#",
    },
  ]

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
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <a
                  key={index}
                  href={method.href}
                  className="p-6 rounded-lg bg-card border border-border text-center hover:border-primary/50 transition"
                >
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-muted-foreground">{method.value}</p>
                </a>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              {success ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2 text-green-500">
                    Message Sent Successfully ✅
                  </h3>
                  <p className="text-muted-foreground">
                    We’ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Mahesh"
                        required
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Company</Label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <Label>Message</Label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
