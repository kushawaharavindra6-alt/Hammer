import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface ProfileCardProps {
  name: string
  role: string
  avatar?: string
  skills?: string[]
}

export function ProfileCard({ name, role, avatar, skills }: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-accent text-primary font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <p className="text-xs text-muted-foreground capitalize">{role}</p>
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {skills.slice(0, 2).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs py-0 px-1.5">
                  {skill}
                </Badge>
              ))}
              {skills.length > 2 && (
                <Badge variant="outline" className="text-xs py-0 px-1.5">
                  +{skills.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
        <Button size="icon-sm" variant="outline">
          <UserPlus className="h-4 w-4" />
          <span className="sr-only">Connect with {name}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
