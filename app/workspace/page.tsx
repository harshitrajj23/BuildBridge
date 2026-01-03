"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useBuildBridgeStore } from "@/lib/store"
import { PageTransition } from "@/components/common/page-transition"
import { WorkspaceSidebar } from "@/components/workspace/sidebar"
import { WorkspaceMainContent } from "@/components/workspace/main-content"
import { WorkspaceRightPanel } from "@/components/workspace/right-panel"
import { WorkspaceFloatingButton } from "@/components/workspace/floating-button"

const PROJECT_ID = "project-1"

export default function WorkspacePage() {
  const router = useRouter()
  const { isLoggedIn } = useBuildBridgeStore()
  const [activeTab, setActiveTab] = useState<"files" | "activity">("files")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <PageTransition>
      <div className="flex h-[calc(100vh-56px)] bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        {/* Left Sidebar - Chat */}
        <WorkspaceSidebar projectId={PROJECT_ID} />

        {/* Main Content - Milestones */}
        <WorkspaceMainContent projectId={PROJECT_ID} />

        {/* Right Panel - Files & Activity */}
        <WorkspaceRightPanel activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Floating Action Button */}
        <WorkspaceFloatingButton />
      </div>
    </PageTransition>
  )
}
