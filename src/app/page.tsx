import Link from "next/link"
import { BookOpen, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="">NTC Library</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
            <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
            </Link>
            <ModeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Smart Library Management for Everyone
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your library operations with our modern, intuitive,
                  and powerful management system. Track books, manage members,
                  and automate workflows.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                    <Button size="lg" className="px-8">Get Started</Button>
                </Link>
                <Link href="#">
                    <Button variant="outline" size="lg" className="px-8">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-white p-4 shadow-sm dark:bg-gray-900">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Catalog Management</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily add, organize, and track your entire collection of books
                  and digital assets.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-white p-4 shadow-sm dark:bg-gray-900">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Member Tracking</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage member profiles, track borrowing history, and handle
                  fines seamlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-white p-4 shadow-sm dark:bg-gray-900">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Advanced Search</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Powerful search capabilities to help members find exactly what
                  they are looking for in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NTC Library. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
