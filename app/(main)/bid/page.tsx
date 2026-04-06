"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, DollarSign, Calendar, FileText } from "lucide-react"

function BidForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId") || "1"
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    amount: "",
    timeline: "",
    proposal: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Placeholder for API integration
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, ...formData }),
      })

      if (!response.ok) {
        throw new Error("Bid submission failed")
      }

      router.push(`/projects/${projectId}?bidSubmitted=true`)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-2">
        <Link href={`/projects/${projectId}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Project
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Place Your Bid</CardTitle>
          <CardDescription>
            Submit your proposal for the project. Be detailed and competitive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="amount">Bid Amount</FieldLabel>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="50000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="pl-10"
                    required
                    min="1"
                  />
                </div>
                <FieldDescription>
                  Enter your total bid amount in USD
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="timeline">Estimated Timeline</FieldLabel>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="timeline"
                    placeholder="e.g., 3 months, 90 days"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
                <FieldDescription>
                  How long will you need to complete the project?
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="proposal">Proposal</FieldLabel>
                <div className="relative">
                  <Textarea
                    id="proposal"
                    placeholder="Describe your approach to the project, your relevant experience, why you're the best fit, and any other details that would help the client make their decision..."
                    value={formData.proposal}
                    onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                    rows={8}
                    required
                  />
                </div>
                <FieldDescription>
                  Be specific about your approach, experience, and what sets you apart
                </FieldDescription>
              </Field>

              {/* Tips Card */}
              <Card className="bg-secondary/50 border-0">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tips for a winning bid</p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>Be specific about your methodology and timeline</li>
                        <li>Highlight relevant past projects and experience</li>
                        <li>Address any unique requirements mentioned in the project</li>
                        <li>Be competitive but realistic with your pricing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && <FieldError>{error}</FieldError>}

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Bid"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={`/projects/${projectId}`}>Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BidPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <BidForm />
    </Suspense>
  )
}
