"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type FakeData = {
  id: number
  title: string
  description: string
  status: string
  lastUpdated: string
}

export function DataDisplay() {
  const [data, setData] = useState<FakeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch data. Please try again.")
      }

      const fakeData: FakeData[] = [
        {
          id: 1,
          title: "Project Alpha",
          description: "A cutting-edge application with advanced features",
          status: "Active",
          lastUpdated: "2023-11-15",
        },
        {
          id: 2,
          title: "Project Beta",
          description: "Revolutionary new technology platform",
          status: "In Development",
          lastUpdated: "2023-11-10",
        },
        {
          id: 3,
          title: "Project Gamma",
          description: "Next-generation platform for enterprise solutions",
          status: "Planning",
          lastUpdated: "2023-11-05",
        },
        {
          id: 4,
          title: "Project Delta",
          description: "Innovative solution for complex problems",
          status: "Active",
          lastUpdated: "2023-11-01",
        },
      ]

      setData(fakeData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="w-fit" onClick={fetchData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4 w-full max-w-3xl">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full max-w-3xl">
      {data.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>Project ID: {item.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <span>Status: {item.status}</span>
            <span>Last Updated: {item.lastUpdated}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

