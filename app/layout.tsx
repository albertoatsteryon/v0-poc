import type React from "react"
import { AuthProvider } from "@descope/nextjs-sdk"
import { ThemeProvider } from "@/components/theme-provider"
import { DESCOPE_PROJECT_ID } from "@/lib/descope"
import "./globals.css"

export const metadata = {
  title: "Protected Dashboard",
  description: "A secure dashboard with Descope authentication",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider projectId={DESCOPE_PROJECT_ID} oidcConfig={true}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'