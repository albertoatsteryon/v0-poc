import { LoginButton } from "@/components/login-button"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">Sign in to access your dashboard</p>
        <div className="pt-4">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

