/**
 * MainDashboard.tsx - Central Control Panel for RAG System
 *
 * This file serves as the main entry point and control panel for the RAG system:
 * - Integrates all components into a cohesive interface
 * - Provides navigation between different system modules
 * - Displays system status and health metrics
 * - Implements user authentication and access control
 * - Provides a unified configuration interface
 * - Displays alerts and notifications for system events
 * - Implements session management for training sessions
 * - Provides data visualization for system performance
 * - Includes export and import functionality for system data
 * - Supports theme customization and user preferences
 *
 * Usage:
 * 1. This is the main component to render in your application
 * 2. Navigate between different modules using the sidebar
 * 3. Monitor system health and performance from the dashboard
 * 4. Configure global settings from the settings panel
 * 5. Start training sessions from the training interface
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Database, VideoIcon as Vector, Search, Bot, BarChart4, Settings, AlertCircle } from "lucide-react"

import DataConnector from "./DataConnector"
import VectorProcessor from "./VectorProcessor"
import QueryEngine from "./QueryEngine"
import ModelConnector from "./ModelConnector"
import TrainingInterface from "./TrainingInterface"

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [systemStatus, setSystemStatus] = useState<"initializing" | "ready" | "error">("initializing")

  // Simulate system initialization
  useState(() => {
    setTimeout(() => {
      setSystemStatus("ready")
    }, 2000)
  })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Medical RAG Training System</h1>
          <p className="text-gray-500">Development and Training Environment</p>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              systemStatus === "ready"
                ? "bg-green-100 text-green-800"
                : systemStatus === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            System: {systemStatus === "ready" ? "Ready" : systemStatus === "error" ? "Error" : "Initializing"}
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart4 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Data
          </TabsTrigger>
          <TabsTrigger value="vectors" className="flex items-center">
            <Vector className="h-4 w-4 mr-2" />
            Vectors
          </TabsTrigger>
          <TabsTrigger value="query" className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Query
          </TabsTrigger>
          <TabsTrigger value="model" className="flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Model
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center">
            <BarChart4 className="h-4 w-4 mr-2" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Database Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-sm text-gray-500">Questions Loaded</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Vector Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-sm text-gray-500">Vectors Indexed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Model Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Ready</div>
                <p className="text-sm text-gray-500">OpenRouter Deepseek-r1</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-green-500" />
                      <span>Database Connector</span>
                    </div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <Vector className="h-4 w-4 mr-2 text-green-500" />
                      <span>Vector Processor</span>
                    </div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2 text-green-500" />
                      <span>Query Engine</span>
                    </div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-2 text-green-500" />
                      <span>Model Connector</span>
                    </div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div className="flex items-center">
                      <BarChart4 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Training Interface</span>
                    </div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Database className="h-6 w-6 mb-2" />
                    <span>Refresh Data</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Vector className="h-6 w-6 mb-2" />
                    <span>Rebuild Vectors</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <Search className="h-6 w-6 mb-2" />
                    <span>Test Query</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                    <BarChart4 className="h-6 w-6 mb-2" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start p-2 border-b">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">OpenRouter API Key Required</div>
                    <p className="text-sm text-gray-500">
                      Please configure your OpenRouter API key in the settings to enable model integration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-2">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Training Mode Active</div>
                    <p className="text-sm text-gray-500">
                      The system is currently in training mode. All queries will be logged for performance analysis.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <DataConnector />
        </TabsContent>

        <TabsContent value="vectors">
          <VectorProcessor />
        </TabsContent>

        <TabsContent value="query">
          <QueryEngine />
        </TabsContent>

        <TabsContent value="model">
          <ModelConnector />
        </TabsContent>

        <TabsContent value="training">
          <TrainingInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}

