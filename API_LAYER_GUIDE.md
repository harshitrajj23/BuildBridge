# BuildBridge API Layer Guide

This document explains the API layer architecture and how to use it.

## Overview

The API layer is built with:
- **Mock Service Worker (MSW)** - Intercepts HTTP requests for mocking during development
- **React Query (TanStack Query)** - Client-side data fetching, caching, and state management
- **TypeScript API Client** - Type-safe HTTP client with support for switching between mock and real APIs

## File Structure

\`\`\`
lib/
├── api-client.ts          # Type-safe HTTP client
├── api-hooks.ts           # React Query hooks for data fetching
└── msw-setup.ts           # MSW handlers and configuration

mocks/
└── data.ts                # Mock data for jobs, workers, skills, etc.

components/
├── providers/
│   └── query-provider.tsx # React Query provider setup
└── data/
    ├── job-card.tsx       # Job listing card component
    ├── worker-card.tsx    # Worker profile card component
    ├── card-skeleton.tsx  # Loading skeleton components
    └── error-state.tsx    # Error display component
\`\`\`

## API Client Usage

### Basic Usage

\`\`\`typescript
import { apiClient } from '@/lib/api-client'

// GET request
const data = await apiClient.get('/jobs')

// POST request
const response = await apiClient.post('/jobs', { title: 'New Job' })

// PUT request
const updated = await apiClient.put('/jobs/1', { title: 'Updated' })

// DELETE request
await apiClient.delete('/jobs/1')

// Query parameters
const data = await apiClient.get('/jobs', {
  params: { page: 1, limit: 10 }
})
\`\`\`

### Switching Between Mock and Real API

The API layer automatically switches between MSW (mock) and real API based on environment variables:

\`\`\`env
# Use mock API (development)
NEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Use real API (production)
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=https://api.buildbridge.com
\`\`\`

## React Query Hooks

### useJobs

Fetch paginated list of jobs.

\`\`\`typescript
'use client'
import { useJobs } from '@/lib/api-hooks'

export function JobsList() {
  const { data: jobs, isLoading, error } = useJobs({ page: 1, limit: 10 })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{jobs?.map(job => <JobCard key={job.id} job={job} />)}</div>
}
\`\`\`

### useJob

Fetch a single job by ID.

\`\`\`typescript
'use client'
import { useJob } from '@/lib/api-hooks'

export function JobDetail({ jobId }: { jobId: string }) {
  const { data: job, isLoading } = useJob(jobId)
  
  return job ? <div>{job.title}</div> : null
}
\`\`\`

### useWorkers

Fetch paginated list of workers.

\`\`\`typescript
'use client'
import { useWorkers } from '@/lib/api-hooks'

export function WorkersList() {
  const { data: workers, isLoading } = useWorkers({ page: 1, limit: 10 })
  
  return workers?.map(worker => <WorkerCard key={worker.id} worker={worker} />)
}
\`\`\`

### useWorker

Fetch a single worker by ID.

\`\`\`typescript
'use client'
import { useWorker } from '@/lib/api-hooks'

export function WorkerDetail({ workerId }: { workerId: string }) {
  const { data: worker } = useWorker(workerId)
  
  return worker ? <div>{worker.name}</div> : null
}
\`\`\`

### useSearchWorkers

Search workers by skill.

\`\`\`typescript
'use client'
import { useSearchWorkers } from '@/lib/api-hooks'

export function SearchWorkers() {
  const { data: workers } = useSearchWorkers('React')
  
  return workers?.map(worker => <WorkerCard key={worker.id} worker={worker} />)
}
\`\`\`

## Data Components

### JobCard

Displays job listing with details, skills, and actions.

\`\`\`tsx
<JobCard 
  job={job} 
  onClick={() => handleJobSelect(job)}
  index={0}
/>
\`\`\`

### WorkerCard

Displays worker profile with rating, skills, and actions.

\`\`\`tsx
<WorkerCard 
  worker={worker} 
  onClick={() => handleWorkerSelect(worker)}
  index={0}
/>
\`\`\`

### Skeletons

Loading states for cards.

\`\`\`tsx
<JobCardSkeleton />
<WorkerCardSkeleton />
\`\`\`

### ErrorState

Error display component.

\`\`\`tsx
<ErrorState 
  title="Failed to load jobs"
  description="An error occurred while loading."
  onRetry={() => refetch()}
/>
\`\`\`

## Mock Data Structure

Mock data is defined in `/mocks/data.ts` and includes:

### Jobs
- id, title, description, budget, company, location
- requiredSkills, postedDate, deadline, status

### Workers
- id, name, title, avatar, hourlyRate, rating
- skills, availability, bio, location
- completedProjects, reviews

### Skills
- id, name, level (beginner/intermediate/expert)

### Reviews
- id, rating, comment, authorName, date

## Adding New API Endpoints

### Step 1: Add MSW Handler

Edit `/lib/msw-setup.ts`:

\`\`\`typescript
http.get(`${API_BASE}/api/new-endpoint`, ({ request }) => {
  return HttpResponse.json({ success: true, data: [] }, { status: 200 })
})
\`\`\`

### Step 2: Add React Query Hook

Edit `/lib/api-hooks.ts`:

\`\`\`typescript
export function useNewEndpoint(options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["new-endpoint"],
    queryFn: async () => {
      const response = await apiClient.get("/new-endpoint")
      if (!response.success) throw new Error(response.error)
      return response.data
    },
    ...options,
  })
}
\`\`\`

### Step 3: Use in Components

\`\`\`typescript
'use client'
import { useNewEndpoint } from '@/lib/api-hooks'

export function MyComponent() {
  const { data, isLoading, error } = useNewEndpoint()
  // ...
}
\`\`\`

## Error Handling

All errors are caught and transformed into user-friendly messages:

\`\`\`typescript
try {
  const data = await apiClient.get('/jobs')
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  // Show error to user
}
\`\`\`

Query hooks automatically handle errors and expose them via the `error` property:

\`\`\`typescript
const { data, error } = useJobs()

if (error) {
  return <ErrorState onRetry={() => refetch()} />
}
\`\`\`

## Caching Strategy

React Query is configured with:
- **staleTime**: 5 minutes - Data is considered fresh for 5 minutes
- **gcTime**: 10 minutes - Cached data is kept for 10 minutes
- **retry**: 1 - Failed requests are retried once

Configure per-query:

\`\`\`typescript
useJobs(
  { page: 1 },
  {
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20,    // 20 minutes
    retry: 3,
  }
)
\`\`\`

## Development Tips

1. **Enable DevTools**: Install React Query DevTools for debugging
2. **Mock Delays**: Add artificial delays to MSW handlers for testing loading states
3. **Network Throttling**: Use browser DevTools to test slow connections
4. **Test Data**: Modify `/mocks/data.ts` to test different scenarios

## Migration to Real API

When ready to use a real API:

1. Create API routes in `/app/api/` or connect to external API
2. Keep MSW handlers as fallback for testing
3. Update environment variables to use real API URL
4. Update MSW handlers to match real API responses
