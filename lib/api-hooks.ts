"use client"

import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./api-client"
import type {
  APIResponse,
  JobListing,
  Worker,
  ApiPaginationParams,
  Bid,
  PortfolioItem,
  Project,
  Message,
  Milestone,
} from "@/types"

// Jobs hooks
export function useJobs(params?: ApiPaginationParams, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["jobs", params?.page, params?.limit],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<JobListing[]>>("/jobs", {
        params: params as Record<string, string | number | boolean>,
      })
      if (!response.success) throw new Error(response.error || "Failed to fetch jobs")
      return response.data || []
    },
    ...options,
  })
}

export function useJob(id: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<JobListing>>(`/jobs/${id}`)
      if (!response.success) throw new Error(response.error || "Failed to fetch job")
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}

// Workers hooks
export function useWorkers(params?: ApiPaginationParams, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["workers", params?.page, params?.limit],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Worker[]>>("/workers", {
        params: params as Record<string, string | number | boolean>,
      })
      if (!response.success) throw new Error(response.error || "Failed to fetch workers")
      return response.data || []
    },
    ...options,
  })
}

export function useWorker(id: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["workers", id],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Worker>>(`/workers/${id}`)
      if (!response.success) throw new Error(response.error || "Failed to fetch worker")
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}

export function useSearchWorkers(skill: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["workers", "search", skill],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Worker[]>>("/workers/search", {
        params: { skill },
      })
      if (!response.success) throw new Error(response.error || "Failed to search workers")
      return response.data || []
    },
    enabled: !!skill,
    ...options,
  })
}

// Bids hooks
export function useBids(jobId: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["bids", jobId],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Bid[]>>(`/jobs/${jobId}/bids`)
      if (!response.success) throw new Error(response.error || "Failed to fetch bids")
      return response.data || []
    },
    enabled: !!jobId,
    ...options,
  })
}

// Portfolio hooks
export function usePortfolio(workerId: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["portfolio", workerId],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<PortfolioItem[]>>(`/workers/${workerId}/portfolio`)
      if (!response.success) throw new Error(response.error || "Failed to fetch portfolio")
      return response.data || []
    },
    enabled: !!workerId,
    ...options,
  })
}

// Projects hooks
export function useProjects(params?: ApiPaginationParams, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["projects", params?.page, params?.limit],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Project[]>>("/projects", {
        params: params as Record<string, string | number | boolean>,
      })
      if (!response.success) throw new Error(response.error || "Failed to fetch projects")
      return response.data || []
    },
    ...options,
  })
}

export function useProject(id: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Project>>(`/projects/${id}`)
      if (!response.success) throw new Error(response.error || "Failed to fetch project")
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}

// Messages hooks
export function useProjectMessages(projectId: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["messages", projectId],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Message[]>>(`/projects/${projectId}/messages`)
      if (!response.success) throw new Error(response.error || "Failed to fetch messages")
      return response.data || []
    },
    enabled: !!projectId,
    ...options,
  })
}

export function useAddMessage(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (messageData: {
      content: string
      senderId: string
      senderName: string
      senderAvatar: string
    }) => {
      const response = await apiClient.post<APIResponse<Message>>(`/projects/${projectId}/messages`, messageData)
      if (!response.success) throw new Error(response.error || "Failed to send message")
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", projectId] })
    },
  })
}

// Milestones hooks
export function useProjectMilestones(projectId: string, options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["milestones", projectId],
    queryFn: async () => {
      const response = await apiClient.get<APIResponse<Milestone[]>>(`/projects/${projectId}/milestones`)
      if (!response.success) throw new Error(response.error || "Failed to fetch milestones")
      return response.data || []
    },
    enabled: !!projectId,
    ...options,
  })
}

export function useUpdateMilestone(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      milestoneId,
      status,
    }: {
      milestoneId: string
      status: "pending" | "approved" | "rejected"
    }) => {
      const response = await apiClient.put<APIResponse<Milestone>>(`/projects/${projectId}/milestones/${milestoneId}`, {
        status,
      })
      if (!response.success) throw new Error(response.error || "Failed to update milestone")
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones", projectId] })
    },
  })
}
