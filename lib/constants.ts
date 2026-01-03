/**
 * Application-wide constants
 */

export const APP_NAME = "BuildBridge"
export const APP_DESCRIPTION = "Connect development teams and streamline collaboration"

export const NAVBAR_HEIGHT = 56 // h-14 in pixels

export const ROUTES = {
  HOME: "/",
  FEATURES: "/features",
  PRICING: "/pricing",
  DOCS: "/docs",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
} as const

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const
