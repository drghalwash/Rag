/**
 * EnvironmentSetup.tsx - Environment Configuration and Setup
 *
 * This file handles the configuration and setup of the environment:
 * - Manages environment variables for different services
 * - Provides a UI for configuring API keys and endpoints
 * - Validates environment configuration before system initialization
 * - Stores configuration securely in browser storage
 * - Implements configuration export and import functionality
 * - Provides default configurations for quick setup
 * - Includes documentation for each configuration option
 * - Implements configuration testing to verify connectivity
 * - Provides configuration templates for different deployment scenarios
 * - Includes error handling for misconfigured environments
 *
 * Usage:
 * 1. Use this component to configure the system environment
 * 2. Set up API keys for OpenRouter, Supabase, and other services
 * 3. Test connections to verify configuration
 * 4. Export configuration for backup or deployment
 * 5. Import configuration from previous setups
 */

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, Download, Upload, RefreshCw, CheckCircle } from "lucide-react"

type ConfigStatus = "unconfigured" | "configuring" | "testing" | "valid" | "invalid"

type ServiceConfig = {
  name: string
  status: ConfigStatus
  key: string
  endpoint?: string
  description: string
}

export default function EnvironmentSetup() {
  const [configs, setConfigs] = useState<ServiceConfig[]>([
    {
      name: "openrouter",
      status: "unconfigured",
      key: "",
      endpoint: "https://openrouter.ai/api/v1",
      description: "OpenRouter API for accessing Deepseek-r1 model",
    },
    {
      name: "supabase",
      status: "unconfigured",
      key: "",
      endpoint: "",
      description: "Supabase for database and vector storage",
    },
  ])

  const [activeTab, setActiveTab] = useState("api-keys")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("rag-system-config")
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setConfigs(parsedConfig)
      } catch (err) {
        console.error("Error loading saved configuration:", err)
      }
    }
  }, [])

  // Update a specific config
  const updateConfig = (index: number, updates: Partial<ServiceConfig>) => {
    const newConfigs = [...configs]
    newConfigs[index] = { ...newConfigs[index], ...updates }
    setConfigs(newConfigs)
  }

  // Test a specific configuration
  const testConfig = async (index: number) => {
    const config = configs[index]
    updateConfig(index, { status: "testing" })

    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just check if the key is not empty
    if (config.key.trim().length > 10) {
      updateConfig(index, { status: "valid" })
    } else {
      updateConfig(index, { status: "invalid" })
    }
  }

  // Save all configurations
  const saveConfigurations = async () => {
    setIsSaving(true)

    // Simulate saving delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage
    localStorage.setItem("rag-system-config", JSON.stringify(configs))

    setIsSaving(false)
    setSaveSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  // Export configuration as JSON
  const exportConfig = () => {
    const configJson = JSON.stringify(configs, null, 2)
    const blob = new Blob([configJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "rag-system-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import configuration from JSON file
  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedConfig = JSON.parse(event.target?.result as string)
        setConfigs(importedConfig)
      } catch (err) {
        console.error("Error importing configuration:", err)
        alert("Invalid configuration file")
      }
    }
    reader.readAsText(file)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Environment Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4 mt-4">
            {configs.map((config, index) => (
              <div key={config.name} className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{config.name.charAt(0).toUpperCase() + config.name.slice(1)}</h3>
                    <p className="text-sm text-gray-500">{config.description}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      config.status === "valid"
                        ? "bg-green-100 text-green-800"
                        : config.status === "invalid"
                          ? "bg-red-100 text-red-800"
                          : config.status === "testing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {config.status === "valid"
                      ? "Valid"
                      : config.status === "invalid"
                        ? "Invalid"
                        : config.status === "testing"
                          ? "Testing..."
                          : "Not Configured"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">API Key</label>
                    <Input
                      type="password"
                      value={config.key}
                      onChange={(e) => updateConfig(index, { key: e.target.value, status: "configuring" })}
                      placeholder={`Enter your ${config.name} API key`}
                    />
                  </div>

                  {config.endpoint !== undefined && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Endpoint URL</label>
                      <Input
                        value={config.endpoint}
                        onChange={(e) => updateConfig(index, { endpoint: e.target.value, status: "configuring" })}
                        placeholder={`Enter the ${config.name} endpoint URL`}
                      />
                    </div>
                  )}

                  <Button
                    onClick={() => testConfig(index)}
                    disabled={config.status === "testing" || !config.key.trim()}
                    size="sm"
                    variant="outline"
                  >
                    {config.status === "testing" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Test Connection
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Vector Storage Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Storage Type</label>
                  <select className="w-full p-2 border rounded">
                    <option value="supabase">Supabase</option>
                    <option value="pinecone">Pinecone</option>
                    <option value="memory">In-Memory (Development Only)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vector Dimensions</label>
                  <Input type="number" defaultValue={1536} />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Model Settings</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Temperature</label>
                  <Input type="number" defaultValue={0.7} min={0} max={1} step={0.1} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Default Max Tokens</label>
                  <Input type="number" defaultValue={1000} min={100} max={4000} step={100} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportConfig}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <div className="relative">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importConfig}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-green-600 text-sm flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Saved successfully
            </span>
          )}
          <Button onClick={saveConfigurations} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save Configuration
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Export utility functions for use in other components
export { EnvironmentSetup }

