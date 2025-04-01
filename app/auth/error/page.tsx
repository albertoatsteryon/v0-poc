"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")

  useEffect(() => {
    // Get error from URL
    const error = searchParams?.get("error") || "default"

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      Configuration: "There is a problem with the server configuration.",
      AccessDenied: "You do not have permission to sign in.",
      Verification: "The verification link may have been used or is no longer valid.",
      OAuthSignin: "There was a problem with the OAuth sign in.",
      OAuthCallback: "There was a problem with the OAuth callback.",
      OAuthCreateAccount: "There was a problem creating your account.",
      EmailCreateAccount: "There was a problem creating your account.",
      Callback: "There was a problem with the authentication callback.",
      OAuthAccountNotLinked: "This account is already linked to another user.",
      EmailSignin: "There was a problem sending the email.",
      CredentialsSignin: "The credentials you provided were invalid.",
      SessionRequired: "You must be signed in to access this page.",
      CLIENT_FETCH_ERROR: "Failed to connect to the authentication server. Please try again later.",
      default: "An unexpected error occurred during authentication.",
    }

    setErrorMessage(errorMessages[error] || errorMessages.default)

    // Log the error for debugging
    console.error("Auth error:", error)
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
        <div className="pt-4 flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

