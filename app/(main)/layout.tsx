import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="lg:pl-64 pb-20 lg:pb-0">
        <div className="container px-4 py-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
