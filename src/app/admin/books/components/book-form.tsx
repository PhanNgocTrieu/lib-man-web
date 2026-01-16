"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Book } from "./columns"
import { useEffect, useState } from "react"
import { Category } from "../../categories/components/columns"
import { Author } from "../../authors/components/columns"

interface BookFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  book: Book | null
  categories: Category[]
  authors: Author[]
  onSave: (book: Partial<Book>) => void
}

export function BookForm({ open, onOpenChange, book, categories, authors, onSave }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    isbn: "",
    quantity: 1,
    location: "",
    categoryId: "",
    authorId: "",
  })

  useEffect(() => {
    if (book) {
      setFormData(book)
    } else {
      setFormData({
        title: "",
        isbn: "",
        quantity: 1,
        location: "",
        categoryId: "",
        authorId: "",
      })
    }
  }, [book, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{book ? "Edit Book" : "Add New Book"}</SheetTitle>
          <SheetDescription>
            {book ? "Make changes to the book details here." : "Fill in the details for the new book."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Book Title"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.categoryId} 
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
               <Select 
                value={formData.authorId} 
                onValueChange={(value) => setFormData({ ...formData, authorId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="ISBN-13"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Shelf Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. A-12-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Total Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              />
            </div>
             {/* Add Cover Image Upload Logic Later */}
          </div>

          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save Changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
