import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Calendar, FileText, ArrowLeft, Clock } from "lucide-react"

// Mock project data - in real app this would be fetched based on ID
const project = {
  id: "1",
  title: "Office Building Renovation",
  description: `We are looking for experienced contractors to handle a complete renovation of our 10-floor office building in downtown Manhattan. The project includes:

- Complete electrical system upgrade to meet modern standards
- Plumbing overhaul including new fixtures in all restrooms
- HVAC system replacement for improved energy efficiency
- Interior finish work including painting, flooring, and ceiling tiles
- Structural repairs and reinforcements as needed
- ADA compliance updates throughout the building

The ideal contractor will have experience with commercial renovations of this scale and be able to manage subcontractors as needed. We expect the project to take 6-8 months to complete.`,
  budget: "$50,000 - $75,000",
  location: "New York, NY",
  postedDate: "March 15, 2024",
  deadline: "April 30, 2024",
  boqFile: "BOQ_Office_Renovation.pdf",
  poster: {
    name: "Metropolitan Properties LLC",
    role: "company",
    avatar: null,
  },
  bidsCount: 12,
}

export default function ProjectDetailPage() {
  const posterInitials = project.poster.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-2">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="mt-2">
                Posted on {project.postedDate}
              </CardDescription>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href={`/bid?projectId=${project.id}`}>
                Place Bid
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Project Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <DollarSign className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-semibold text-sm">{project.budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold text-sm">{project.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <Calendar className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="font-semibold text-sm">{project.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Bids</p>
                <p className="font-semibold text-sm">{project.bidsCount} received</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Project Description</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {project.description.split("\n").map((paragraph, index) => (
                <p key={index} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* BOQ File */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Documents</h3>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <div className="p-2 rounded bg-secondary">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{project.boqFile}</p>
                <p className="text-xs text-muted-foreground">Bill of Quantities</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Posted By */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Posted By</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={project.poster.avatar || undefined} alt={project.poster.name} />
                <AvatarFallback className="bg-accent text-primary font-semibold">
                  {posterInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{project.poster.name}</p>
                <Badge variant="secondary" className="capitalize mt-1">
                  {project.poster.role}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Interested in this project?</h3>
              <p className="text-primary-foreground/80 text-sm">
                Submit your bid now to express your interest
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/bid?projectId=${project.id}`}>
                Place Your Bid
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
