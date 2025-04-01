"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut({ redirect: false })
        router.push("/")
      } catch (error) {
        console.error("Error during sign out:", error)
        router.push("/")
      }
    }

    performSignOut()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-2xl font-bold">Signing out...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  )
}

