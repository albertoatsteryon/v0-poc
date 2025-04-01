"use client"

import { useDescope } from "@descope/nextjs-sdk/client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LogoutButton() {
  const sdk = useDescope()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await sdk.oidc.logout({
        post_logout_redirect_uri: window.location.origin,
      })
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-primary text-primary hover:bg-primary/10"
      disabled={isLoading}
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  )
}

