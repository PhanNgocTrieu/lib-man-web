"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Book,
  LayoutDashboard,
  Settings,
  Users,
  Tag,
  UserPen,
} from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: Tag,
    },
    {
        title: "Authors",
        href: "/admin/authors",
        icon: UserPen,
    },
    {
      title: "Books",
      href: "/admin/books",
      icon: Book,
    },
    {
      title: "Readers",
      href: "/admin/readers",
      icon: Users,
    },
    {
      title: "Loans",
      href: "/admin/loans",
      icon: Book,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
              isActive
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
