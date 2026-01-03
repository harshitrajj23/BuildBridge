"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useBuildBridgeStore } from "@/lib/store"
import { PageTransition } from "@/components/common/page-transition"
import { ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const { setIsLoggedIn, setUserName } = useBuildBridgeStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError(null)

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  if (!data.session) {
    setError("No active session found")
    setLoading(false)
    return
  }

  // ✅ NOW update frontend store
  setIsLoggedIn(true)
  setUserName(data.user?.email?.split("@")[0] ?? "User")

  router.push("/dashboard")
  setLoading(false)
}
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="p-8 border border-border">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your BuildBridge account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}