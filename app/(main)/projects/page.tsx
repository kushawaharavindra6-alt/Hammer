"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

// Mock projects data
const allProjects = [
  { id: "1", title: "Office Building Renovation", budget: "$50,000 - $75,000", location: "New York, NY", description: "Complete renovation of a 10-floor office building including electrical and plumbing upgrades." },
  { id: "2", title: "Residential Complex Construction", budget: "$200,000+", location: "Los Angeles, CA", description: "New construction of a 50-unit residential complex with modern amenities." },
  { id: "3", title: "Commercial Kitchen Installation", budget: "$25,000 - $40,000", location: "Chicago, IL", description: "Full kitchen installation for a new restaurant including ventilation and equipment." },
  { id: "4", title: "Warehouse Electrical Upgrade", budget: "$15,000 - $25,000", location: "Dallas, TX", description: "Complete electrical system upgrade for a 50,000 sq ft warehouse." },
  { id: "5", title: "Hotel Lobby Renovation", budget: "$100,000 - $150,000", location: "Miami, FL", description: "Luxury renovation of a 5-star hotel lobby including custom finishes." },
  { id: "6", title: "School Building Repair", budget: "$30,000 - $50,000", location: "Seattle, WA", description: "Structural repairs and safety upgrades for a public school building." },
  { id: "7", title: "Shopping Mall HVAC System", budget: "$75,000 - $100,000", location: "Phoenix, AZ", description: "Installation of new HVAC system for a 200,000 sq ft shopping mall." },
  { id: "8", title: "Healthcare Facility Build-out", budget: "$150,000+", location: "Boston, MA", description: "Medical office build-out with specialized equipment installations." },
]

const budgetRanges = [
  { value: "all", label: "All Budgets" },
  { value: "under-25k", label: "Under $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-plus", label: "$100,000+" },
]

const locations = [
  { value: "all", label: "All Locations" },
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "dallas", label: "Dallas" },
  { value: "miami", label: "Miami" },
  { value: "seattle", label: "Seattle" },
  { value: "phoenix", label: "Phoenix" },
  { value: "boston", label: "Boston" },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Simple filter matching (would be more sophisticated with real data)
    const matchesLocation = locationFilter === "all" || 
      project.location.toLowerCase().includes(locationFilter.replace("-", " "))
    
    return matchesSearch && matchesLocation
  })

  const clearFilters = () => {
    setSearchQuery("")
    setBudgetFilter("all")
    setLocationFilter("all")
  }

  const hasActiveFilters = searchQuery || budgetFilter !== "all" || locationFilter !== "all"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Find projects that match your expertise</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters - Always visible on desktop, toggleable on mobile */}
            <div className={`grid gap-4 sm:grid-cols-3 ${showFilters ? "block" : "hidden sm:grid"}`}>
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </p>
        
        {filteredProjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear all filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
