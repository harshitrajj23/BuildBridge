/**
 * Core BuildBridge type definitions
 */

export interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  team: TeamMember[]
  milestones: Milestone[]
  messages: Message[]
}

export interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
  createdAt: Date
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "member" | "viewer"
  joinedAt: Date
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "expert"
}

export interface JobListing {
  id: string
  title: string
  description: string
  budget: number
  company: string
  location: string
  requiredSkills: Skill[]
  postedDate: Date
  deadline: Date
  status: "open" | "in-progress" | "closed"
}

export interface Review {
  id: string
  rating: number
  comment: string
  authorName: string
  date: Date
}

export interface Worker {
  id: string
  name: string
  title: string
  avatar: string
  hourlyRate: number
  rating: number
  reviewCount: number
  skills: Skill[]
  availability: "available" | "busy" | "unavailable"
  bio: string
  location: string
  completedProjects: number
  reviews: Review[]
}

export interface ApiPaginationParams {
  page?: number
  limit?: number
}

export interface Bid {
  id: string
  jobId: string
  workerId: string
  workerName: string
  workerAvatar: string
  amount: number
  duration: string
  proposal: string
  createdAt: Date
  status: "pending" | "accepted" | "rejected"
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  modelUrl?: string
  tags: string[]
  link?: string
}

export interface WorkerProfile extends Worker {
  portfolio: PortfolioItem[]
}

export interface PostJobFormData {
  title: string
  description: string
  budget: number
  duration: string
  requiredSkills: string[]
  deadline: Date
  attachments?: File[]
}

export interface JobFilter {
  minBudget?: number
  maxBudget?: number
  skills?: string[]
  location?: string
  status?: "open" | "in-progress" | "closed"
}

export interface WorkerFilter {
  minRating?: number
  skills?: string[]
  location?: string
  availability?: "available" | "busy"
  maxHourlyRate?: number
}

export interface Message {
  id: string
  projectId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isOwn?: boolean
}

export interface Milestone {
  id: string
  projectId: string
  title: string
  description: string
  dueDate: Date
  status: "pending" | "approved" | "rejected"
  progress: number
  createdAt: Date
  updatedAt: Date
}
