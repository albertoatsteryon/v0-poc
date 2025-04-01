"use client"

import { useUser } from "@descope/nextjs-sdk/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UserProfile() {
  const { user, isUserLoading } = useUser()

  if (isUserLoading || !user) return null

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.picture || ""} alt={user.name || "User"} />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name || "User"}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

