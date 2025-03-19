/**
 * TrainingInterface.tsx - Training and Evaluation Dashboard
 *
 * This file provides the main interface for training and evaluating the RAG system:
 * - Displays a comprehensive dashboard for monitoring system performance
 * - Provides tools for evaluating retrieval quality and answer accuracy
 * - Implements feedback collection for continuous improvement
 * - Visualizes performance metrics and trends over time
 * - Supports A/B testing of different retrieval and generation strategies
 * - Provides tools for error analysis and system debugging
 * - Implements batch testing capabilities for systematic evaluation
 * - Includes export functionality for performance reports
 * - Provides configuration management for system parameters
 * - Supports user annotation of results for supervised learning
 *
 * Usage:
 * 1. Use the dashboard to monitor overall system performance
 * 2. Use the evaluation tools to test specific queries and analyze results
 * 3. Provide feedback on answer quality to improve the system
 * 4. Use the configuration panel to adjust system parameters
 * 5. Export performance reports for documentation and analysis
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Loader2, ThumbsUp, ThumbsDown, Save, Download } from "lucide-react"

// Mock data for charts
const performanceData = [
  { name: "Retrieval Precision", value: 0.78 },
  { name: "Answer Accuracy", value: 0.82 },
  { name: "Relevance Score", value: 0.85 },
]

const historyData = [
  { date: "2023-01", precision: 0.65, accuracy: 0.7 },
  { date: "2023-02", precision: 0.68, accuracy: 0.72 },
  { date: "2023-03", precision: 0.72, accuracy: 0.75 },
  { date: "2023-04", precision: 0.75, accuracy: 0.78 },
  { date: "2023-05", precision: 0.78, accuracy: 0.82 },
]

const feedbackData = [
  { name: "Positive", value: 75, color: "#4ade80" },
  { name: "Negative", value: 25, color: "#f87171" },
]

export default function TrainingInterface() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [testQuery, setTestQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [feedbackText, setFeedbackText] = useState("")

  // Handle test query submission
  const handleTestQuery = async () => {
    if (!testQuery.trim()) return

    setIsProcessing(true)
    setTestResult(null)
    setFeedback(null)
    setFeedbackText("")

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock result
    setTestResult(`This is a simulated response to your test query: "${testQuery}".
    
In a real implementation, this would show:
1. The retrieved context from the vector database
2. The generated answer from the model
3. Evaluation metrics for this specific query
4. Suggestions for improvement

The system would use the OpenRouter Deepseek-r1 model to generate this response based on the retrieved context.`)

    setIsProcessing(false)
  }

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    // In a real implementation, this would save the feedback to a database
    alert(`Feedback submitted: ${feedback} - ${feedbackText}`)
    setFeedback(null)
    setFeedbackText("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>RAG System Training Interface</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              {performanceData.map((item) => (
                <Card key={item.name}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{(item.value * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">{item.name}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Bar dataKey="precision" name="Retrieval Precision" fill="#8884d8" />
                      <Bar dataKey="accuracy" name="Answer Accuracy" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">User Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={feedbackData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {feedbackData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 border-b">
                        <div className="text-sm">Test Query {i + 1}</div>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Test Query</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Enter a test query</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., What are the symptoms of appendicitis?"
                      value={testQuery}
                      onChange={(e) => setTestQuery(e.target.value)}
                    />
                    <Button onClick={handleTestQuery} disabled={isProcessing || !testQuery.trim()}>
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
                    </Button>
                  </div>
                </div>

                {(testResult || isProcessing) && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Result</label>
                    <div className="p-4 border rounded-md bg-gray-50 min-h-[200px]">
                      {isProcessing ? (
                        <div className="flex justify-center items-center h-full">
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{testResult}</div>
                      )}
                    </div>
                  </div>
                )}

                {testResult && !isProcessing && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Provide Feedback</label>
                      <div className="flex gap-2">
                        <Button
                          variant={feedback === "positive" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFeedback("positive")}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Good
                        </Button>
                        <Button
                          variant={feedback === "negative" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFeedback("negative")}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Needs Improvement
                        </Button>
                      </div>
                    </div>

                    {feedback && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Feedback Details</label>
                        <Textarea
                          placeholder="Please provide details about your feedback..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          rows={3}
                        />
                        <Button
                          className="mt-2"
                          size="sm"
                          onClick={handleFeedbackSubmit}
                          disabled={!feedbackText.trim()}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Submit Feedback
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Batch Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Upload a CSV file with test queries to evaluate the system in batch mode.
                  </p>
                  <div className="flex items-center justify-between">
                    <Input type="file" accept=".csv" />
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download Template
                    </Button>
                  </div>
                  <Button className="w-full">Run Batch Evaluation</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Retrieval Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Number of results to retrieve</label>
                  <Input type="number" defaultValue={5} min={1} max={20} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum similarity score</label>
                  <Input type="number" defaultValue={0.7} min={0} max={1} step={0.1} />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="hybrid-search" className="mr-2" defaultChecked />
                  <label htmlFor="hybrid-search" className="text-sm">
                    Enable hybrid search (vector + keyword)
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Model Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Temperature</label>
                  <Input type="number" defaultValue={0.7} min={0} max={1} step={0.1} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max tokens</label>
                  <Input type="number" defaultValue={1000} min={100} max={4000} step={100} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">System prompt</label>
                  <Textarea
                    defaultValue="You are an AI assistant specialized in medical exams. Provide accurate, concise answers based on the retrieved context. If the information is not in the context, say so."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Configuration</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Export utility functions for use in other components
export { TrainingInterface }

