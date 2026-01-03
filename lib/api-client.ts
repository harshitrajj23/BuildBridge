const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false"

export interface ApiRequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

export class ApiClient {
  private baseUrl: string
  private useMock: boolean

  constructor(baseUrl: string = API_BASE_URL, useMock: boolean = USE_MOCK) {
    this.baseUrl = baseUrl
    this.useMock = useMock
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }
    return url.toString()
  }

  async request<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params)
    const { params, ...fetchConfig } = config || {}

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers: {
          "Content-Type": "application/json",
          ...fetchConfig?.headers,
        },
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
        }))
        throw new Error(error.message || `API Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      throw new Error(`API Request Failed: ${message}`)
    }
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
