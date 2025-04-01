"use client"

import { useDescope } from "@descope/nextjs-sdk/client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LoginButton() {
  const sdk = useDescope()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await sdk.oidc.loginWithRedirect({
        redirect_uri: window.location.origin,
      })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign in with Descope"}
    </Button>
  )
}

