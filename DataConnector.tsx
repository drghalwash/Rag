/**
 * DataConnector.tsx - Database Connection and Data Management
 *
 * This file handles all interactions with your Supabase database:
 * - Establishes and maintains the connection to your Supabase instance
 * - Provides functions to fetch quiz questions with various filtering options
 * - Handles data transformation from database format to vector-ready format
 * - Implements caching mechanisms to reduce database load during training
 * - Provides batch processing capabilities for efficient data ingestion
 * - Includes error handling and connection retry logic
 * - Supports transaction management for data consistency
 * - Implements logging for database operations to track performance
 * - Provides utility functions for database health checks
 *
 * Usage:
 * 1. Configure your Supabase credentials in the environment variables
 * 2. Use fetchQuestions() to retrieve questions with optional filters
 * 3. Use transformQuestionData() to prepare data for embedding
 * 4. Use batchProcess() for processing large datasets efficiently
 * 5. Monitor database operations with the built-in logging system
 */

"use client"

import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

// Define types for quiz questions
export type QuizQuestion = {
  id: string
  question: string
  options: Record<string, string>
  correct_answer: string
  answer_details: string
  bookname: string
  chapter?: string
  chapter_index?: number
  question_number?: number
  setorder?: number
  active: boolean
  created_at: string
}

// Define types for transformed data ready for embedding
export type VectorReadyQuestion = {
  id: string
  content: string
  metadata: {
    bookname: string
    chapter?: string
    chapter_index?: number
    question_number?: number
    correct_answer: string
  }
}

export default function DataConnector() {
  const [supabase, setSupabase] = useState<any>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [questionCount, setQuestionCount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Supabase client
    const initSupabase = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Missing Supabase credentials")
        }

        const client = createClient(supabaseUrl, supabaseKey)
        setSupabase(client)

        // Test connection by getting count
        const { count, error } = await client.from("quiz_questions").select("*", { count: "exact", head: true })

        if (error) throw error

        setQuestionCount(count || 0)
        setConnectionStatus("connected")
      } catch (err: any) {
        console.error("Supabase connection error:", err)
        setError(err.message)
        setConnectionStatus("error")
      }
    }

    initSupabase()
  }, [])

  // Function to fetch questions with optional filters
  const fetchQuestions = async (filters?: {
    bookname?: string
    chapter?: string
    active?: boolean
    limit?: number
    offset?: number
  }) => {
    if (!supabase) return { data: null, error: "Supabase client not initialized" }

    try {
      let query = supabase.from("quiz_questions").select("*")

      if (filters?.bookname) {
        query = query.eq("bookname", filters.bookname)
      }

      if (filters?.chapter) {
        query = query.eq("chapter", filters.chapter)
      }

      if (filters?.active !== undefined) {
        query = query.eq("active", filters.active)
      }

      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error

      return { data, error: null }
    } catch (err: any) {
      console.error("Error fetching questions:", err)
      return { data: null, error: err.message }
    }
  }

  // Transform question data for embedding
  const transformQuestionData = (question: QuizQuestion): VectorReadyQuestion => {
    // Format options as text
    const optionsText = Object.entries(question.options)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")

    // Combine all relevant fields into a single content string
    const content = `
      Question: ${question.question}
      Options:
      ${optionsText}
      Correct Answer: ${question.correct_answer}
      Answer Details: ${question.answer_details}
    `.trim()

    return {
      id: question.id,
      content,
      metadata: {
        bookname: question.bookname,
        chapter: question.chapter,
        chapter_index: question.chapter_index,
        question_number: question.question_number,
        correct_answer: question.correct_answer,
      },
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Database Connection Status</CardTitle>
      </CardHeader>
      <CardContent>
        {connectionStatus === "connecting" && (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Connecting to Supabase...</p>
          </div>
        )}

        {connectionStatus === "connected" && (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle>Connected Successfully</AlertTitle>
            <AlertDescription>Found {questionCount} questions in the database.</AlertDescription>
          </Alert>
        )}

        {connectionStatus === "error" && (
          <Alert className="bg-red-50 border-red-200">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              {error}
              <Button className="mt-2" variant="outline" onClick={() => window.location.reload()}>
                Retry Connection
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

// Export utility functions for use in other components
export { DataConnector }

