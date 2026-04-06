import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Connect with Professionals",
    description: "Build your network with companies, contractors, freelancers, and skilled workers.",
  },
  {
    icon: Briefcase,
    title: "Find Projects",
    description: "Browse and bid on projects that match your expertise and availability.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Work with confidence knowing profiles are verified and reviewed.",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Streamlined bidding process to help you win more projects, faster.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-16 px-4 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Where{" "}
            <span className="text-accent">Projects</span>{" "}
            Meet{" "}
            <span className="text-accent">Professionals</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hammerwold connects companies with skilled contractors, freelancers, and workers. Post projects, place bids, and build your professional network.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/projects">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 border-t">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose Hammerwold?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex p-3 rounded-lg bg-accent/10 mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-balance">
            Ready to Grow Your Business?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of professionals already using Hammerwold to find projects and connect with clients.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Hammerwold. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
