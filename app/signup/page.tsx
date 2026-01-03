"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useBuildBridgeStore, type UserRole } from "@/lib/store"
import { PageTransition } from "@/components/common/page-transition"
import { ArrowLeft, Check, Code2, Palette, Users } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get("role") as UserRole) || null

  const { setIsLoggedIn, setUserName, setUserRole } = useBuildBridgeStore()

  const [step, setStep] = useState(initialRole ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const roles = [
    { id: "labourer", label: "Labourer", icon: Palette },
    { id: "builder", label: "Builder", icon: Code2 },
    { id: "client", label: "Client", icon: Users },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  // 🔐 UPDATED: signup + save profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!selectedRole) {
      setError("Please select a role")
      return
    }

    setLoading(true)
    setError(null)

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      setError("Signup failed")
      setLoading(false)
      return
    }

    // 2️⃣ Insert profile (role + name)
   // 🔐 Sign in immediately after signup
const { error: signInError } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
})

if (signInError) {
  setError(signInError.message)
  setLoading(false)
  return
}

    // 3️⃣ Update frontend store
    setIsLoggedIn(true)
    setUserName(formData.name)
    setUserRole(selectedRole)

    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-primary/5">
        <Card className="p-8 w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-bold mb-4">Choose your role</h1>
                <div className="space-y-3">
                  {roles.map((r) => {
                    const Icon = r.icon
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id as UserRole)
                          setStep(2)
                        }}
                        className="w-full border p-4 rounded-lg text-left hover:border-primary"
                      >
                        <div className="flex gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span>{r.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.form key="step2" onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl font-bold">Create Account</h1>

                <Input
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </PageTransition>
  )
}