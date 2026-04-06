import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizes[size]}
      >
        {/* Network nodes */}
        <circle cx="20" cy="8" r="3" className="fill-accent" />
        <circle cx="8" cy="20" r="3" className="fill-accent" />
        <circle cx="32" cy="20" r="3" className="fill-accent" />
        <circle cx="12" cy="32" r="3" className="fill-accent" />
        <circle cx="28" cy="32" r="3" className="fill-accent" />
        
        {/* H shape with connections */}
        <path
          d="M14 10V30M26 10V30M14 20H26"
          className="stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Connection lines */}
        <path
          d="M17 10L20 8M23 10L20 8M11 17L8 20M11 23L8 20M29 17L32 20M29 23L32 20M14 30L12 32M26 30L28 32"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-bold text-primary">Hammerwold</span>
    </div>
  )
}
