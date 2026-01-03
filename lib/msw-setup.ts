import { http, HttpResponse } from "msw"
import { mockJobs, mockWorkers, mockBids, mockPortfolioItems, mockProjects } from "@/mocks/data"
import type { APIResponse, JobListing, Worker, Bid, PortfolioItem, Project, Message, Milestone } from "@/types"

const API_BASE = (() => {
  if (typeof window === "undefined") return "http://localhost:3000"
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
})()

export const handlers = [
  // Get all jobs
  http.get(`${API_BASE}/api/jobs`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    const startIdx = (page - 1) * limit
    const paginatedJobs = mockJobs.slice(startIdx, startIdx + limit)

    return HttpResponse.json<APIResponse<JobListing[]>>(
      {
        success: true,
        data: paginatedJobs,
        message: `Retrieved ${paginatedJobs.length} jobs`,
      },
      { status: 200 },
    )
  }),

  // Get single job
  http.get(`${API_BASE}/api/jobs/:id`, ({ params }) => {
    const job = mockJobs.find((j) => j.id === params.id)

    if (!job) {
      return HttpResponse.json<APIResponse<null>>({ success: false, error: "Job not found" }, { status: 404 })
    }

    return HttpResponse.json<APIResponse<JobListing>>({ success: true, data: job }, { status: 200 })
  }),

  // Get all workers
  http.get(`${API_BASE}/api/workers`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    const startIdx = (page - 1) * limit
    const paginatedWorkers = mockWorkers.slice(startIdx, startIdx + limit)

    return HttpResponse.json<APIResponse<Worker[]>>(
      {
        success: true,
        data: paginatedWorkers,
        message: `Retrieved ${paginatedWorkers.length} workers`,
      },
      { status: 200 },
    )
  }),

  // Get single worker
  http.get(`${API_BASE}/api/workers/:id`, ({ params }) => {
    const worker = mockWorkers.find((w) => w.id === params.id)

    if (!worker) {
      return HttpResponse.json<APIResponse<null>>({ success: false, error: "Worker not found" }, { status: 404 })
    }

    return HttpResponse.json<APIResponse<Worker>>({ success: true, data: worker }, { status: 200 })
  }),

  // Search workers by skill
  http.get(`${API_BASE}/api/workers/search`, ({ request }) => {
    const url = new URL(request.url)
    const skillQuery = url.searchParams.get("skill")?.toLowerCase()

    if (!skillQuery) {
      return HttpResponse.json<APIResponse<Worker[]>>({ success: true, data: mockWorkers }, { status: 200 })
    }

    const filtered = mockWorkers.filter((w) => w.skills.some((s) => s.name.toLowerCase().includes(skillQuery)))

    return HttpResponse.json<APIResponse<Worker[]>>({ success: true, data: filtered }, { status: 200 })
  }),

  // Get bids for a job
  http.get(`${API_BASE}/api/jobs/:id/bids`, ({ params }) => {
    const jobBids = mockBids.filter((b) => b.jobId === params.id)
    return HttpResponse.json<APIResponse<Bid[]>>({ success: true, data: jobBids }, { status: 200 })
  }),

  // Get portfolio for a worker
  http.get(`${API_BASE}/api/workers/:id/portfolio`, ({ params }) => {
    const filtered = mockPortfolioItems.slice(0, 4)
    return HttpResponse.json<APIResponse<PortfolioItem[]>>({ success: true, data: filtered }, { status: 200 })
  }),

  // Projects endpoints
  http.get(`${API_BASE}/api/projects`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    const startIdx = (page - 1) * limit
    const paginatedProjects = mockProjects.slice(startIdx, startIdx + limit)

    return HttpResponse.json<APIResponse<Project[]>>(
      {
        success: true,
        data: paginatedProjects,
        message: `Retrieved ${paginatedProjects.length} projects`,
      },
      { status: 200 },
    )
  }),

  http.get(`${API_BASE}/api/projects/:id`, ({ params }) => {
    const project = mockProjects.find((p) => p.id === params.id)

    if (!project) {
      return HttpResponse.json<APIResponse<null>>({ success: false, error: "Project not found" }, { status: 404 })
    }

    return HttpResponse.json<APIResponse<Project>>({ success: true, data: project }, { status: 200 })
  }),

  // Messages endpoints
  http.get(`${API_BASE}/api/projects/:id/messages`, ({ params }) => {
    const project = mockProjects.find((p) => p.id === params.id)
    const messages = project?.messages || []

    return HttpResponse.json<APIResponse<Message[]>>({ success: true, data: messages }, { status: 200 })
  }),

  http.post(`${API_BASE}/api/projects/:id/messages`, async ({ params, request }) => {
    const body = (await request.json()) as {
      content: string
      senderId: string
      senderName: string
      senderAvatar: string
    }
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      projectId: params.id as string,
      ...body,
      timestamp: new Date(),
      isOwn: true,
    }

    const project = mockProjects.find((p) => p.id === params.id)
    if (project) {
      project.messages.push(newMessage)
    }

    return HttpResponse.json<APIResponse<Message>>({ success: true, data: newMessage }, { status: 201 })
  }),

  // Milestones endpoints
  http.get(`${API_BASE}/api/projects/:id/milestones`, ({ params }) => {
    const project = mockProjects.find((p) => p.id === params.id)
    const milestones = project?.milestones || []

    return HttpResponse.json<APIResponse<Milestone[]>>({ success: true, data: milestones }, { status: 200 })
  }),

  http.put(`${API_BASE}/api/projects/:id/milestones/:milestoneId`, async ({ params, request }) => {
    const body = (await request.json()) as { status: "pending" | "approved" | "rejected" }
    const project = mockProjects.find((p) => p.id === params.id)
    const milestone = project?.milestones.find((m) => m.id === params.milestoneId)

    if (!milestone) {
      return HttpResponse.json<APIResponse<null>>({ success: false, error: "Milestone not found" }, { status: 404 })
    }

    milestone.status = body.status
    milestone.updatedAt = new Date()

    return HttpResponse.json<APIResponse<Milestone>>({ success: true, data: milestone }, { status: 200 })
  }),
]

// Setup MSW for browser (Storybook or next-dev)
if (typeof window !== "undefined") {
  import("msw/browser").then(({ setupWorker }) => {
    const worker = setupWorker(...handlers)
    worker.start({
      onUnhandledRequest: "bypass",
    })
  })
}
