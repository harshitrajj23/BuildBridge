/**
 * Mock data for development and testing
 */

import type { Project, Team, JobListing, Worker, Skill, Review, PortfolioItem, Bid } from "@/types"

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Backend API",
    description: "Core REST API for BuildBridge",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Web Dashboard",
    description: "User-facing dashboard and analytics",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    name: "Mobile App",
    description: "React Native mobile application",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "project-1",
    name: "Backend API Redesign",
    description: "Complete refactor of the core API with improved performance",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    team: [
      {
        id: "member-1",
        name: "Alice Johnson",
        email: "alice@buildbridge.com",
        role: "admin",
        joinedAt: new Date("2024-01-15"),
      },
      {
        id: "member-2",
        name: "Bob Smith",
        email: "bob@buildbridge.com",
        role: "member",
        joinedAt: new Date("2024-01-16"),
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        projectId: "project-1",
        title: "Database Optimization",
        description: "Optimize database queries and add proper indexing",
        dueDate: new Date("2024-02-01"),
        status: "approved",
        progress: 100,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "milestone-2",
        projectId: "project-1",
        title: "API Documentation",
        description: "Create comprehensive API documentation with examples",
        dueDate: new Date("2024-02-15"),
        status: "in-progress",
        progress: 60,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "milestone-3",
        projectId: "project-1",
        title: "Performance Testing",
        description: "Load testing and performance benchmarks",
        dueDate: new Date("2024-03-01"),
        status: "pending",
        progress: 0,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
    ],
    messages: [
      {
        id: "msg-1",
        projectId: "project-1",
        senderId: "member-1",
        senderName: "Alice Johnson",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        content: "Great progress on the database optimization. Let's sync up tomorrow.",
        timestamp: new Date("2024-01-20T10:30:00"),
        isOwn: false,
      },
      {
        id: "msg-2",
        projectId: "project-1",
        senderId: "member-2",
        senderName: "Bob Smith",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        content: "Sounds good! I'll have the performance benchmarks ready by then.",
        timestamp: new Date("2024-01-20T10:45:00"),
        isOwn: true,
      },
    ],
  },
]

export const mockTeams: Team[] = [
  {
    id: "1",
    name: "Backend Team",
    description: "API and infrastructure development",
    members: [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@buildbridge.com",
        role: "admin",
        joinedAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@buildbridge.com",
        role: "member",
        joinedAt: new Date("2024-01-05"),
      },
    ],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Frontend Team",
    description: "Web and mobile UI development",
    members: [
      {
        id: "3",
        name: "Carol Davis",
        email: "carol@buildbridge.com",
        role: "admin",
        joinedAt: new Date("2024-01-02"),
      },
    ],
    createdAt: new Date("2024-01-02"),
  },
]

// Skill definitions
export const mockSkills: Skill[] = [
  { id: "1", name: "React", level: "expert" },
  { id: "2", name: "TypeScript", level: "expert" },
  { id: "3", name: "Node.js", level: "intermediate" },
  { id: "4", name: "UI/UX Design", level: "expert" },
  { id: "5", name: "Figma", level: "expert" },
  { id: "6", name: "Next.js", level: "expert" },
  { id: "7", name: "PostgreSQL", level: "intermediate" },
  { id: "8", name: "GraphQL", level: "intermediate" },
  { id: "9", name: "Tailwind CSS", level: "expert" },
  { id: "10", name: "Project Management", level: "intermediate" },
]

// Reviews for workers
export const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Excellent work! Delivered on time and exceeded expectations.",
    authorName: "John Smith",
    date: new Date("2024-01-15"),
  },
  {
    id: "2",
    rating: 4.5,
    comment: "Great communication and quality code.",
    authorName: "Sarah Johnson",
    date: new Date("2024-01-10"),
  },
  {
    id: "3",
    rating: 5,
    comment: "Highly professional and detail-oriented.",
    authorName: "Mike Davis",
    date: new Date("2024-01-05"),
  },
]

// Job listings
export const mockJobs: JobListing[] = [
  {
    id: "job-1",
    title: "Senior React Developer Needed",
    description:
      "Looking for an experienced React developer to build a scalable dashboard application with TypeScript and Next.js.",
    budget: 5000,
    company: "TechStartup Inc.",
    location: "Remote",
    requiredSkills: [
      { id: "1", name: "React", level: "expert" },
      { id: "2", name: "TypeScript", level: "expert" },
      { id: "6", name: "Next.js", level: "intermediate" },
    ],
    postedDate: new Date("2024-01-18"),
    deadline: new Date("2024-02-18"),
    status: "open",
  },
  {
    id: "job-2",
    title: "UI/UX Designer for SaaS Product",
    description:
      "Need a creative designer to redesign our SaaS platform. Must have experience with modern design systems.",
    budget: 3000,
    company: "CloudSoft",
    location: "Remote",
    requiredSkills: [
      { id: "4", name: "UI/UX Design", level: "expert" },
      { id: "5", name: "Figma", level: "expert" },
    ],
    postedDate: new Date("2024-01-16"),
    deadline: new Date("2024-02-16"),
    status: "open",
  },
  {
    id: "job-3",
    title: "Full-Stack Developer for E-commerce",
    description:
      "Building a modern e-commerce platform. Need full-stack expertise with React, Node.js, and PostgreSQL.",
    budget: 7500,
    company: "EcomPro",
    location: "Remote",
    requiredSkills: [
      { id: "1", name: "React", level: "expert" },
      { id: "3", name: "Node.js", level: "intermediate" },
      { id: "7", name: "PostgreSQL", level: "intermediate" },
    ],
    postedDate: new Date("2024-01-20"),
    deadline: new Date("2024-02-20"),
    status: "open",
  },
  {
    id: "job-4",
    title: "DevOps Engineer Required",
    description: "Infrastructure and deployment specialist needed for cloud architecture optimization.",
    budget: 6000,
    company: "DevOpsFlow",
    location: "Remote",
    requiredSkills: [{ id: "3", name: "Node.js", level: "intermediate" }],
    postedDate: new Date("2024-01-14"),
    deadline: new Date("2024-02-14"),
    status: "open",
  },
]

// Worker profiles
export const mockWorkers: Worker[] = [
  {
    id: "worker-1",
    name: "Alex Chen",
    title: "Senior Full-Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 47,
    skills: [
      { id: "1", name: "React", level: "expert" },
      { id: "2", name: "TypeScript", level: "expert" },
      { id: "6", name: "Next.js", level: "expert" },
      { id: "3", name: "Node.js", level: "expert" },
    ],
    availability: "available",
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications.",
    location: "San Francisco, CA",
    completedProjects: 52,
    reviews: mockReviews.slice(0, 2),
  },
  {
    id: "worker-2",
    name: "Jordan Phillips",
    title: "Product Designer & UX Specialist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    hourlyRate: 75,
    rating: 4.8,
    reviewCount: 38,
    skills: [
      { id: "4", name: "UI/UX Design", level: "expert" },
      { id: "5", name: "Figma", level: "expert" },
      { id: "9", name: "Tailwind CSS", level: "intermediate" },
    ],
    availability: "available",
    bio: "Creative designer focused on user-centered design and modern digital experiences.",
    location: "Austin, TX",
    completedProjects: 41,
    reviews: mockReviews.slice(0, 2),
  },
  {
    id: "worker-3",
    name: "Sam Rodriguez",
    title: "Senior Backend Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    hourlyRate: 90,
    rating: 4.95,
    reviewCount: 56,
    skills: [
      { id: "3", name: "Node.js", level: "expert" },
      { id: "2", name: "TypeScript", level: "expert" },
      { id: "7", name: "PostgreSQL", level: "expert" },
      { id: "8", name: "GraphQL", level: "expert" },
    ],
    availability: "busy",
    bio: "Backend architect specializing in scalable APIs and database optimization.",
    location: "New York, NY",
    completedProjects: 68,
    reviews: mockReviews,
  },
  {
    id: "worker-4",
    name: "Morgan Taylor",
    title: "Project Manager & Scrum Master",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
    hourlyRate: 65,
    rating: 4.7,
    reviewCount: 32,
    skills: [{ id: "10", name: "Project Management", level: "expert" }],
    availability: "available",
    bio: "Experienced PM driving project success through agile methodologies and clear communication.",
    location: "Chicago, IL",
    completedProjects: 35,
    reviews: mockReviews.slice(0, 1),
  },
]

// Portfolio items for workers
export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Dashboard Redesign",
    description: "Complete redesign of analytics dashboard for a SaaS platform",
    image: "/modern-data-dashboard.png",
    tags: ["UI Design", "Product Design", "Analytics"],
    link: "https://example.com",
  },
  {
    id: "portfolio-2",
    title: "Mobile App UI",
    description: "Cross-platform mobile application interface",
    image: "/mobile-app-interface.png",
    tags: ["Mobile Design", "UX", "iOS"],
    link: "https://example.com",
  },
  {
    id: "portfolio-3",
    title: "E-commerce Platform",
    description: "Full-featured e-commerce site with 3D product viewer",
    image: "/ecommerce-platform-concept.png",
    modelUrl: "/assets/3d/duck.glb",
    tags: ["Web Design", "E-commerce", "3D"],
    link: "https://example.com",
  },
  {
    id: "portfolio-4",
    title: "Design System",
    description: "Comprehensive component library and design system",
    image: "/design-system-abstract.png",
    tags: ["Design System", "Components", "Documentation"],
  },
]

// Bids for job listings
export const mockBids: Bid[] = [
  {
    id: "bid-1",
    jobId: "job-1",
    workerId: "worker-1",
    workerName: "Alex Chen",
    workerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    amount: 4500,
    duration: "2 weeks",
    proposal:
      "I have extensive experience with React and TypeScript. I can deliver this dashboard with high performance and clean code.",
    createdAt: new Date("2024-01-20"),
    status: "pending",
  },
  {
    id: "bid-2",
    jobId: "job-1",
    workerId: "worker-2",
    workerName: "Jordan Phillips",
    workerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    amount: 3800,
    duration: "3 weeks",
    proposal: "Designer here. I can create beautiful UI components with excellent UX.",
    createdAt: new Date("2024-01-19"),
    status: "pending",
  },
  {
    id: "bid-3",
    jobId: "job-1",
    workerId: "worker-3",
    workerName: "Sam Rodriguez",
    workerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    amount: 5200,
    duration: "1.5 weeks",
    proposal: "Backend specialist but can handle full-stack. Quick delivery guaranteed.",
    createdAt: new Date("2024-01-18"),
    status: "pending",
  },
]
