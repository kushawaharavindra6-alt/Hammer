"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Upload, FileText, X } from "lucide-react"

export default function PostProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [boqFile, setBoqFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBoqFile(file)
    }
  }

  const removeFile = () => {
    setBoqFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("description", formData.description)
      submitData.append("budget", formData.budget)
      submitData.append("location", formData.location)
      if (boqFile) {
        submitData.append("boqFile", boqFile)
      }

      // Placeholder for API integration
      const response = await fetch("/api/projects", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Project posting failed")
      }

      router.push("/projects?posted=true")
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
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Post a New Project</CardTitle>
          <CardDescription>
            Create a new project listing to find skilled professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Project Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="e.g., Office Building Renovation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <FieldDescription>
                  Choose a clear, descriptive title for your project
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Project Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. Include scope of work, requirements, timeline expectations, and any specific skills or certifications needed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  required
                />
                <FieldDescription>
                  Be detailed - the more information you provide, the better bids you'll receive
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="budget">Budget Range</FieldLabel>
                <Input
                  id="budget"
                  placeholder="e.g., $50,000 - $75,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
                <FieldDescription>
                  Provide a realistic budget range for the project
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <FieldDescription>
                  Where is the project located?
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>BOQ File (Optional)</FieldLabel>
                {boqFile ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <div className="p-2 rounded bg-secondary">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{boqFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(boqFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button type="button" variant="ghost" size="icon-sm" onClick={removeFile}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="boq-upload"
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload BOQ File</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, Excel, or Word (max 10MB)
                    </p>
                    <input
                      id="boq-upload"
                      type="file"
                      accept=".pdf,.xlsx,.xls,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                <FieldDescription>
                  Upload a Bill of Quantities if available
                </FieldDescription>
              </Field>

              {error && <FieldError>{error}</FieldError>}

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Posting...
                    </>
                  ) : (
                    "Post Project"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/projects">Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
