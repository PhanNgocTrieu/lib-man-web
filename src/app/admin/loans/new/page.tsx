"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock data (should be fetched from API in real app)
const mockReaders = [
    { id: "1", name: "Nguyen Van A" },
    { id: "2", name: "Tran Thi B" },
]
const mockBooks = [
    { id: "1", title: "Harry Potter", available: 3 },
    { id: "2", title: "1984", available: 0 },
]

export default function NewLoanPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [readerId, setReaderId] = useState("")
  const [bookId, setBookId] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const book = mockBooks.find(b => b.id === bookId)
    if (book && book.available <= 0) {
        toast({
            title: "Book not available",
            description: "This book is currently out of stock.",
            variant: "destructive"
        })
        return
    }

    toast({
        title: "Loan created successfully",
        description: "The book has been checked out.",
    })
    
    // In real app: POST to API
    setTimeout(() => {
        router.push("/admin/loans")
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Loan</CardTitle>
          <CardDescription>Select a reader and book to check out.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="reader">Reader</Label>
              <Select value={readerId} onValueChange={setReaderId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reader" />
                </SelectTrigger>
                <SelectContent>
                  {mockReaders.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="book">Book</Label>
              <Select value={bookId} onValueChange={setBookId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  {mockBooks.map(b => (
                      <SelectItem key={b.id} value={b.id} disabled={b.available === 0}>
                        {b.title} {b.available === 0 ? "(Out of Stock)" : ""}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={!readerId || !bookId || !dueDate}>Create Loan</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
