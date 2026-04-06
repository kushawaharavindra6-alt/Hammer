import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectCard } from "@/components/project-card"
import { ProfileCard } from "@/components/profile-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const feedPosts = [
  {
    id: "1",
    author: "Sarah Johnson",
    role: "contractor",
    content: "Just completed a major renovation project in downtown. Excited to share the results soon!",
    time: "2 hours ago",
  },
  {
    id: "2",
    author: "Mike Chen",
    role: "freelancer",
    content: "Looking for skilled electricians for an upcoming commercial project. DM if interested!",
    time: "5 hours ago",
  },
  {
    id: "3",
    author: "BuildRight Corp",
    role: "company",
    content: "We're hiring! Multiple positions available for our new development project.",
    time: "1 day ago",
  },
]

const suggestedUsers = [
  { name: "Alex Rivera", role: "contractor", skills: ["Plumbing", "HVAC", "Renovation"] },
  { name: "Emily Watson", role: "freelancer", skills: ["Architecture", "CAD", "Design"] },
  { name: "David Kim", role: "worker", skills: ["Electrical", "Safety"] },
]

const recommendedProjects = [
  { id: "1", title: "Office Building Renovation", budget: "$50,000 - $75,000", location: "New York, NY", description: "Complete renovation of a 10-floor office building including electrical and plumbing upgrades." },
  { id: "2", title: "Residential Complex Construction", budget: "$200,000+", location: "Los Angeles, CA", description: "New construction of a 50-unit residential complex with modern amenities." },
  { id: "3", title: "Commercial Kitchen Installation", budget: "$25,000 - $40,000", location: "Chicago, IL", description: "Full kitchen installation for a new restaurant including ventilation and equipment." },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-balance">Welcome back!</h1>
        <p className="text-muted-foreground">{"Here's what's happening in your network"}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
            </TabsList>
            <TabsContent value="feed" className="space-y-4 mt-4">
              {feedPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary font-semibold">
                        {post.author[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-xs text-muted-foreground capitalize bg-secondary px-2 py-0.5 rounded">
                            {post.role}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{post.time}</p>
                        <p className="mt-2 text-sm leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="reels" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Reels coming soon!</p>
                    <p className="text-sm text-muted-foreground mt-1">Share short video updates with your network</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Suggested Users */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedUsers.map((user) => (
                <ProfileCard key={user.name} {...user} />
              ))}
            </CardContent>
          </Card>

          {/* Recommended Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
