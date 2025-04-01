import { ProtectedContent } from "@/components/protected-content"

export default function Home() {
  return (
    <main className="min-h-screen bg-green-100">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-10">Secure Dashboard</h1>
        <ProtectedContent />
      </div>
    </main>
  )
}

