import Link from "next/link"
import { Search, BookOpen, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock large dataset
const allBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", available: true },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Technology", available: true },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "History", available: false },
  { id: 4, title: "Atomic Habits", author: "James Clear", category: "Self-Help", available: true },
  { id: 5, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Technology", available: true },
  { id: 6, title: "1984", author: "George Orwell", category: "Classic", available: true },
  { id: 7, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", available: true },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : ""
  
  const filteredBooks = query 
    ? allBooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      )
    : allBooks

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
             <Link href="/">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
             </Link>
             <form className="flex-1 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search books, authors, or categories..."
                        className="w-full bg-background pl-8"
                        name="q"
                        defaultValue={query}
                    />
                </div>
                <Button type="submit">Search</Button>
             </form>
        </div>
      </header>

      <main className="flex-1 container py-8">
         <div className="space-y-4">
            <h1 className="text-2xl font-bold">
                {query ? `Search Results for "${query}"` : "All Books"}
            </h1>
            <p className="text-muted-foreground">Found {filteredBooks.length} results</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <Card key={book.id}>
                       <CardHeader>
                          <div className="flex items-center justify-between">
                             <Badge variant="outline">{book.category}</Badge>
                             {book.available ? <Badge className="bg-green-600">Available</Badge> : <Badge variant="destructive">Out of Stock</Badge>}
                          </div>
                          <CardTitle className="mt-2">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                       </CardHeader>
                       <CardFooter>
                           <Button className="w-full" variant={book.available ? "default" : "secondary"} disabled={!book.available}>
                             {book.available ? "Borrow Now" : "Waitlist"}
                          </Button>
                       </CardFooter>
                    </Card>
                ))}
            </div>
             
            {filteredBooks.length === 0 && (
                <div className="py-12 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">No books found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms.</p>
                </div>
            )}
         </div>
      </main>
    </div>
  )
}
