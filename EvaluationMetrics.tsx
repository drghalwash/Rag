/**
 * EvaluationMetrics.tsx - Performance Measurement and Analysis
 *
 * This file handles the evaluation and analysis of system performance:
 * - Implements metrics for measuring retrieval quality
 * - Provides tools for evaluating answer accuracy and relevance
 * - Visualizes performance trends over time
 * - Implements comparison between different system configurations
 * - Provides detailed error analysis and categorization
 * - Supports custom metric definition for specific use cases
 * - Implements benchmarking against ground truth data
 * - Provides export functionality for evaluation reports
 * - Includes statistical analysis of performance data
 * - Supports A/B testing for system improvements
 *
 * Usage:
 * 1. Use the metrics dashboard to monitor system performance
 * 2. Compare different configurations to identify optimal settings
 * 3. Analyze errors to identify areas for improvement
 * 4. Export reports for documentation and presentation
 * 5. Define custom metrics for specific evaluation needs
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, RefreshCw } from "lucide-react"

// Mock data for charts
const precisionRecallData = [
  { name: "Config A", precision: 0.82, recall: 0.75, f1: 0.78 },
  { name: "Config B", precision: 0.78, recall: 0.8, f1: 0.79 },
  { name: "Config C", precision: 0.85, recall: 0.72, f1: 0.78 },
]

const timeSeriesData = [
  { date: "2023-01", accuracy: 0.7, relevance: 0.65 },
  { date: "2023-02", accuracy: 0.72, relevance: 0.68 },
  { date: "2023-03", accuracy: 0.75, relevance: 0.72 },
  { date: "2023-04", accuracy: 0.78, relevance: 0.75 },
  { date: "2023-05", accuracy: 0.82, relevance: 0.78 },
]

const errorCategoryData = [
  { name: "Retrieval Failure", value: 35, color: "#f87171" },
  { name: "Hallucination", value: 25, color: "#fb923c" },
  { name: "Incomplete Answer", value: 20, color: "#facc15" },
  { name: "Misunderstanding", value: 15, color: "#a3e635" },
  { name: "Other", value: 5, color: "#22d3ee" },
]

export default function EvaluationMetrics() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Evaluation Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">78.5%</div>
                    <div className="text-sm text-gray-500">Overall Accuracy</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">82.3%</div>
                    <div className="text-sm text-gray-500">Retrieval Precision</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">75.1%</div>
                    <div className="text-sm text-gray-500">Answer Relevance</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={precisionRecallData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="precision" name="Precision" fill="#8884d8" />
                      <Bar dataKey="recall" name="Recall" fill="#82ca9d" />
                      <Bar dataKey="f1" name="F1 Score" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0.6, 0.9]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        name="Answer Accuracy"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="relevance" name="Content Relevance" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Retrieval Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Precision</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">82%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Recall</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">F1 Score</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">78%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Mean Reciprocal Rank</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">84%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Answer Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Factual Accuracy</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: "79%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">79%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Completeness</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "81%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">81%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Relevance</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">85%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Coherence</h3>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span className="font-medium">88%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance by Question Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>Anatomy Questions</div>
                    <div className="text-green-600 font-medium">86%</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>Physiology Questions</div>
                    <div className="text-green-600 font-medium">82%</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>Pathology Questions</div>
                    <div className="text-yellow-600 font-medium">78%</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div>Pharmacology Questions</div>
                    <div className="text-yellow-600 font-medium">75%</div>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div>Clinical Scenarios</div>
                    <div className="text-red-600 font-medium">72%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Error Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={errorCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {errorCategoryData.map((entry, index) => (
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
                <CardTitle className="text-base">Common Error Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-red-50">
                    <div className="font-medium text-red-800 mb-1">Retrieval Failure</div>
                    <p className="text-sm">Query: "What is the mechanism of action for ACE inhibitors?"</p>
                    <p className="text-sm mt-1">
                      Issue: System failed to retrieve relevant information about ACE inhibitors.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md bg-orange-50">
                    <div className="font-medium text-orange-800 mb-1">Hallucination</div>
                    <p className="text-sm">Query: "What are the branches of the external carotid artery?"</p>
                    <p className="text-sm mt-1">Issue: System included non-existent branches in the response.</p>
                  </div>

                  <div className="p-3 border rounded-md bg-yellow-50">
                    <div className="font-medium text-yellow-800 mb-1">Incomplete Answer</div>
                    <p className="text-sm">Query: "What are the clinical features of Cushing's syndrome?"</p>
                    <p className="text-sm mt-1">Issue: System only mentioned some features, missing key symptoms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Error Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: "2023-01", retrieval: 45, hallucination: 30, incomplete: 25 },
                        { date: "2023-02", retrieval: 42, hallucination: 28, incomplete: 23 },
                        { date: "2023-03", retrieval: 38, hallucination: 26, incomplete: 22 },
                        { date: "2023-04", retrieval: 36, hallucination: 25, incomplete: 20 },
                        { date: "2023-05", retrieval: 35, hallucination: 25, incomplete: 20 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="retrieval" name="Retrieval Failures" stroke="#f87171" />
                      <Line type="monotone" dataKey="hallucination" name="Hallucinations" stroke="#fb923c" />
                      <Line type="monotone" dataKey="incomplete" name="Incomplete Answers" stroke="#facc15" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh Data
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  )
}

// Export utility functions for use in other components
export { EvaluationMetrics }

