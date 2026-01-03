"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/common/page-transition"
import { useBuildBridgeStore } from "@/lib/store"
import { supabase } from "@/lib/supabaseClient"
import { MapPin, User, Phone, Hammer } from "lucide-react"

export default function ProfilePage() {
  const { userName, userRole, setUserName } = useBuildBridgeStore()

  // 🔑 Sync REAL logged-in user from Supabase
  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.user_metadata?.name) {
        setUserName(data.user.user_metadata.name)
      }
    }
    syncUser()
  }, [setUserName])

  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your labourer profile and details
            </p>
          </motion.div>

          {/* Profile Card */}
          <Card className="bg-card/60 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6" />
                {userName || "Loading..."}
              </CardTitle>
              <Badge className="w-fit capitalize mt-2">
                {userRole}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Hammer className="h-4 w-4 text-primary" />
                <span>Skilled Construction Labourer</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Bangalore (Whitefield, Yelahanka, Indiranagar)</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 9XXXXXXXXX</span>
              </div>

              <Button className="mt-4 w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </PageTransition>
  )
}