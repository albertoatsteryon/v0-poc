"use client"

import { useSession, useUser } from "@descope/nextjs-sdk/client"
import { LoginButton } from "./login-button"
import { LogoutButton } from "./logout-button"
import { UserProfile } from "./user-profile"
import { DataDisplay } from "./data-display"

export function ProtectedContent() {
  const { isAuthenticated, isSessionLoading } = useSession()
  const { isUserLoading } = useUser()

  const isLoading = isSessionLoading || isUserLoading

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading authentication status...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <h2 className="text-2xl font-bold">Please sign in to view your dashboard</h2>
        <p className="text-muted-foreground">You need to be authenticated to access this content.</p>
        <LoginButton />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <UserProfile />
        <LogoutButton />
      </div>
      <h2 className="text-2xl font-bold">Your Projects</h2>
      <DataDisplay />
    </div>
  )
}

