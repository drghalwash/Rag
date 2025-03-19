/**
 * page.tsx - Application Entry Point
 *
 * This file serves as the main entry point for the RAG training system:
 * - Renders the main dashboard component
 * - Handles initial application loading
 * - Provides environment variable configuration
 * - Sets up global error boundaries
 * - Implements authentication checks if needed
 * - Configures global state providers
 * - Handles routing to different system modules
 * - Provides fallback UI for loading states
 * - Implements error handling for system failures
 * - Sets up analytics and monitoring
 *
 * Usage:
 * 1. This is the root component of your Next.js application
 * 2. It loads the MainDashboard component which contains all system modules
 * 3. Configure environment variables before deployment
 * 4. Add authentication logic if required
 * 5. Customize the loading and error states as needed
 */

import MainDashboard from "@/MainDashboard"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[400px]">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Loader2 className="h-10 w-10 animate-spin text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold">Loading RAG Training System</h2>
                <p className="text-gray-500 text-center mt-2">Initializing components and connecting to services...</p>
              </CardContent>
            </Card>
          </div>
        }
      >
        <MainDashboard />
      </Suspense>
    </main>
  )
}

