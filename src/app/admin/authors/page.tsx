"use client"

import { useState } from "react"
import { Plus } from "lucide-react" 
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { Author, getColumns } from "./components/columns"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialAuthors: Author[] = [
  { id: "1", name: "J.K. Rowling", bio: "British author, best known for the Harry Potter series.", booksCount: 15 },
  { id: "2", name: "George Orwell", bio: "English novelist and essayist, journalist and critic.", booksCount: 9 },
  { id: "3", name: "Agatha Christie", bio: "English writer known for her sixty-six detective novels and fourteen short story collections.", booksCount: 85 },
  { id: "4", name: "Isaac Asimov", bio: "American writer and professor of biochemistry at Boston University.", booksCount: 40 },
  { id: "5", name: "Haruki Murakami", bio: "Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally.", booksCount: 22 },
]

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>(initialAuthors)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({ name: "", bio: "" })
  const { toast } = useToast()

  const handleEdit = (author: Author) => {
    setCurrentAuthor(author)
    setFormData({ name: author.name, bio: author.bio })
    setIsDialogOpen(true)
  }

  const handleDelete = (author: Author) => {
    setCurrentAuthor(author)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentAuthor) return
    
    setAuthors(authors.filter(a => a.id !== currentAuthor.id))
    setIsDeleteDialogOpen(false)
    setCurrentAuthor(null)
    toast({
      title: "Author deleted",
      description: `${currentAuthor.name} has been removed.`,
    })
  }

  const handleSave = () => {
    if (currentAuthor) {
      // Edit
      setAuthors(authors.map(a => 
        a.id === currentAuthor.id 
          ? { ...a, name: formData.name, bio: formData.bio }
          : a
      ))
      toast({ title: "Author updated", description: "Changes saved successfully." })
    } else {
      // Add
      const newAuthor: Author = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        bio: formData.bio,
        booksCount: 0
      }
      setAuthors([...authors, newAuthor])
      toast({ title: "Author created", description: "New author added successfully." })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setCurrentAuthor(null)
    setFormData({ name: "", bio: "" })
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

  const table = useReactTable({
    data: authors,
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
        <h1 className="text-lg font-semibold md:text-2xl">Authors</h1>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Author
        </Button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter authors..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
            <DialogDescription>
              {currentAuthor ? "Update the author details below." : "Create a new author profile."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Author Name" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea 
                id="bio" 
                value={formData.bio} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief biography..." 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the author
              <span className="font-semibold text-foreground"> {currentAuthor?.name} </span>
              and remove them from our servers.
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
