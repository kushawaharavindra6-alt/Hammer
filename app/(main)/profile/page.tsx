import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Pencil, Briefcase, Star } from "lucide-react"

// Mock user data
const user = {
  name: "John Doe",
  role: "contractor",
  location: "New York, NY",
  avatar: null,
  skills: ["Construction", "Project Management", "Electrical", "Plumbing", "HVAC", "Safety Compliance"],
  bio: "Experienced contractor with over 15 years in commercial and residential construction. Specialized in renovation projects and new builds. Committed to delivering high-quality work on time and within budget.",
  portfolio: [
    { id: "1", title: "Downtown Office Renovation", image: null, year: "2024" },
    { id: "2", title: "Residential Complex Build", image: null, year: "2023" },
    { id: "3", title: "Restaurant Kitchen Installation", image: null, year: "2023" },
  ],
  completedProjects: 47,
  rating: 4.9,
}

export default function ProfilePage() {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback className="bg-accent text-primary text-3xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge className="capitalize w-fit mx-auto sm:mx-0">{user.role}</Badge>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user.completedProjects} projects</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {user.bio}
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/profile/edit">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Portfolio */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="skills" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {user.portfolio.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.year}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
