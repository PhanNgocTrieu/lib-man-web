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
import { Category, getColumns } from "./components/columns"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialCategories: Category[] = [
  { id: "1", name: "Fiction", description: "Fictional literature and stories", count: 120 },
  { id: "2", name: "Non-Fiction", description: "Factual and informative books", count: 85 },
  { id: "3", name: "Science", description: "Scientific research and discoveries", count: 45 },
  { id: "4", name: "History", description: "Historical events and figures", count: 60 },
  { id: "5", name: "Technology", description: "Computers, programming, and tech", count: 30 },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({ name: "", description: "" })
  const { toast } = useToast()

  const handleEdit = (category: Category) => {
    setCurrentCategory(category)
    setFormData({ name: category.name, description: category.description })
    setIsDialogOpen(true)
  }

  const handleDelete = (category: Category) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentCategory) return
    
    setCategories(categories.filter(c => c.id !== currentCategory.id))
    setIsDeleteDialogOpen(false)
    setCurrentCategory(null)
    toast({
      title: "Category deleted",
      description: `${currentCategory.name} has been removed.`,
    })
  }

  const handleSave = () => {
    if (currentCategory) {
      // Edit
      setCategories(categories.map(c => 
        c.id === currentCategory.id 
          ? { ...c, name: formData.name, description: formData.description }
          : c
      ))
      toast({ title: "Category updated", description: "Changes saved successfully." })
    } else {
      // Add
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        description: formData.description,
        count: 0
      }
      setCategories([...categories, newCategory])
      toast({ title: "Category created", description: "New category added successfully." })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setCurrentCategory(null)
    setFormData({ name: "", description: "" })
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

  const table = useReactTable({
    data: categories,
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
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter categories..."
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
            <DialogTitle>{currentCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {currentCategory ? "Update the category details below." : "Create a new book category."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Fiction, Science, etc." 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the category..." 
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
              This action cannot be undone. This will permanently delete the category
              <span className="font-semibold text-foreground"> {currentCategory?.name} </span>
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
