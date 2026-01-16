"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Book, getColumns } from "./components/columns"
import { BookForm } from "./components/book-form"
import { useToast } from "@/hooks/use-toast"
import { Category } from "../categories/components/columns"
import { Author } from "../authors/components/columns"

// Mock data
// We need to import or mock categories/authors here to pass to the form, but for now we'll define them locally
const mockCategories: Category[] = [
  { id: "1", name: "Fiction", description: "Fictional literature", count: 120 },
  { id: "2", name: "Non-Fiction", description: "Factual books", count: 85 },
  { id: "3", name: "Science", description: "Science books", count: 45 },
]

const mockAuthors: Author[] = [
  { id: "1", name: "J.K. Rowling", bio: "...", booksCount: 15 },
  { id: "2", name: "George Orwell", bio: "...", booksCount: 9 },
]

const initialBooks: Book[] = [
  { 
    id: "1", 
    title: "Harry Potter and the Sorcerer's Stone", 
    authorId: "1", 
    authorName: "J.K. Rowling", 
    categoryId: "1", 
    categoryName: "Fiction",
    isbn: "978-0439708180",
    quantity: 5,
    available: 3,
    location: "A-01",
    status: "Available"
  },
  { 
    id: "2", 
    title: "1984", 
    authorId: "2", 
    authorName: "George Orwell", 
    categoryId: "1", 
    categoryName: "Fiction",
    isbn: "978-0451524935",
    quantity: 3,
    available: 0,
    location: "B-03",
    status: "Out of Stock"
  },
]

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  
  const { toast } = useToast()

  const handleEdit = (book: Book) => {
    setCurrentBook(book)
    setIsFormOpen(true)
  }

  const handleDelete = (book: Book) => {
    setCurrentBook(book)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentBook) return
    
    setBooks(books.filter(b => b.id !== currentBook.id))
    setIsDeleteDialogOpen(false)
    setCurrentBook(null)
    toast({
      title: "Book deleted",
      description: `${currentBook.title} has been removed.`,
    })
  }

  const handleSave = (formData: Partial<Book>) => {
    // In a real app, look up names based on IDs
    const category = mockCategories.find(c => c.id === formData.categoryId)
    const author = mockAuthors.find(a => a.id === formData.authorId)
    
    const enrichedData = {
        ...formData,
        categoryName: category?.name || "Unknown",
        authorName: author?.name || "Unknown",
        available: formData.quantity || 0, // Simplified available logic
        status: (formData.quantity || 0) > 0 ? "Available" : "Out of Stock"
    } as Book // Casting for mock

    if (currentBook) {
      // Edit
      setBooks(books.map(b => 
        b.id === currentBook.id 
          ? { ...b, ...enrichedData, id: b.id } // Keep ID
          : b
      ))
      toast({ title: "Book updated", description: "Changes saved successfully." })
    } else {
      // Add
      const newBook: Book = {
        ...enrichedData,
        id: Math.random().toString(36).substr(2, 9),
      }
      setBooks([...books, newBook])
      toast({ title: "Book created", description: "New book added successfully." })
    }
    setIsFormOpen(false)
    setCurrentBook(null)
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Books</h1>
        <Button onClick={() => { setCurrentBook(null); setIsFormOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm flex-1">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
                placeholder="Search books..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="pl-9"
             />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BookForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        book={currentBook}
        categories={mockCategories}
        authors={mockAuthors}
        onSave={handleSave}
      />

       {/* Delete Alert Dialog */}
       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete 
              <span className="font-semibold text-foreground"> {currentBook?.title} </span>
              and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
