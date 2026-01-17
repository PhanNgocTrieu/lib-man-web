import Link from "next/link"
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    cover: "/covers/gatsby.jpg", 
    available: true,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    cover: "/covers/cleancode.jpg", 
    available: true,
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    cover: "/covers/sapiens.jpg", 
    available: false,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    cover: "/covers/atomic.jpg", 
    available: true,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
             <BookOpen className="h-6 w-6" />
             <span>NTC Library</span>
          </div>
          <nav className="flex items-center gap-4">
             <Link href="/auth/login">
                <Button variant="ghost">Admin Login</Button>
             </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
           <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                 <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                       Welcome to NTC Library
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                       Discover your next great adventure. Search through thousands of books, articles, and resources.
                    </p>
                 </div>
                 <div className="w-full max-w-sm space-y-2">
                    <form action="/search" className="flex space-x-2">
                       <Input className="max-w-lg flex-1" placeholder="Search for books..." type="text" name="q" />
                       <Button type="submit">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                       </Button>
                    </form>
                 </div>
              </div>
           </div>
        </section>

        {/* Featured Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
              <div className="flex items-center justify-between mb-8">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Featured Books</h2>
                    <p className="text-gray-500 dark:text-gray-400">Curated selections just for you</p>
                 </div>
                 <Link href="/search">
                    <Button variant="ghost" className="hidden sm:flex">
                       View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {featuredBooks.map((book) => (
                    <Card key={book.id} className="flex flex-col h-full">
                       <CardHeader>
                          <div className="aspect-[2/3] w-full bg-muted rounded-md mb-4 flex items-center justify-center text-muted-foreground">
                              {/* Placeholder for real book cover */}
                              <BookOpen className="h-10 w-10 opacity-20" />
                          </div>
                          <div className="flex items-center justify-between">
                             <Badge variant="outline">{book.category}</Badge>
                             {book.available ? (
                                <Badge className="bg-green-600">Available</Badge>
                             ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                             )}
                          </div>
                          <CardTitle className="mt-2 text-lg line-clamp-1">{book.title}</CardTitle>
                          <CardDescription className="line-clamp-1">{book.author}</CardDescription>
                       </CardHeader>
                       <CardContent className="flex-1">
                          
                       </CardContent>
                       <CardFooter>
                          <Button className="w-full" variant={book.available ? "default" : "secondary"} disabled={!book.available}>
                             {book.available ? "Borrow Now" : "Waitlist"}
                          </Button>
                       </CardFooter>
                    </Card>
                 ))}
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t font-light text-xs text-muted-foreground">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 NTC Library. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
