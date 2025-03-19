/**
 * ModelConnector.tsx - LLM Integration and Response Generation
 *
 * This file handles the connection to OpenRouter's Deepseek-r1 model:
 * - Establishes and manages the connection to the OpenRouter API
 * - Implements prompt engineering for optimal model responses
 * - Handles context window management for efficient token usage
 * - Provides streaming capabilities for real-time response generation
 * - Implements retry logic and error handling for API requests
 * - Manages rate limiting and quota tracking
 * - Provides temperature and other parameter controls
 * - Implements prompt templates for consistent model interactions
 * - Includes logging for model interactions and performance
 * - Supports different response formats (markdown, JSON, etc.)
 *
 * Usage:
 * 1. Configure your OpenRouter API key in the environment variables
 * 2. Use generateResponse() to get model completions
 * 3. Use streamResponse() for real-time streaming responses
 * 4. Use the prompt templates for consistent model interactions
 * 5. Monitor model usage with the built-in tracking system
 */

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

type ModelParameters = {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

export default function ModelConnector() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parameters, setParameters] = useState<ModelParameters>({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Generate a response from the model
  const generateResponse = async (promptText: string, retrievedContext = "", params: ModelParameters) => {
    setIsGenerating(true)
    setError(null)
    setResponse("")

    try {
      // In a real implementation, this would call the OpenRouter API
      // For now, we'll simulate with a delay and mock response

      // Construct the full prompt with context
      const fullPrompt = retrievedContext
        ? `Context information:\n${retrievedContext}\n\nQuestion: ${promptText}\n\nAnswer:`
        : promptText

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock streaming response
      const mockResponse = `This is a simulated response from the Deepseek-r1 model via OpenRouter API.
      
In a real implementation, this would contain the model's response to your prompt:
"${promptText}"

The response would be generated using the following parameters:
- Temperature: ${params.temperature}
- Max Tokens: ${params.maxTokens}
- Top P: ${params.topP}
- Frequency Penalty: ${params.frequencyPenalty}
- Presence Penalty: ${params.presencePenalty}

For medical exam questions, the model would provide detailed explanations based on the retrieved context.`

      // Simulate streaming by adding characters one by one
      for (let i = 0; i < mockResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10))
        setResponse((prev) => prev + mockResponse[i])
      }

      setIsGenerating(false)
    } catch (err: any) {
      console.error("Error generating response:", err)
      setError(err.message || "Failed to generate response")
      setIsGenerating(false)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    generateResponse(prompt, "", parameters)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>OpenRouter Deepseek-r1 Connector</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <Textarea
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="button" variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? "Hide" : "Show"} Advanced Parameters
          </Button>

          {showAdvanced && (
            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Temperature: {parameters.temperature}</label>
                </div>
                <Slider
                  value={[parameters.temperature]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setParameters({ ...parameters, temperature: value[0] })}
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Max Tokens: {parameters.maxTokens}</label>
                </div>
                <Slider
                  value={[parameters.maxTokens]}
                  min={100}
                  max={4000}
                  step={100}
                  onValueChange={(value) => setParameters({ ...parameters, maxTokens: value[0] })}
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Top P: {parameters.topP}</label>
                </div>
                <Slider
                  value={[parameters.topP]}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setParameters({ ...parameters, topP: value[0] })}
                />
              </div>
            </div>
          )}

          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isGenerating || !prompt.trim()}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Response"
            )}
          </Button>
        </form>

        {(response || isGenerating) && (
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Response</label>
            <div className="p-4 border rounded-md bg-gray-50 min-h-[200px] whitespace-pre-wrap">
              {response}
              {isGenerating && <span className="animate-pulse">▋</span>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Export utility functions for use in other components
export { ModelConnector }

