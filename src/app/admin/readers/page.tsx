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
import { Reader, getColumns } from "./components/columns"
import { ReaderDialog } from "./components/reader-dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialReaders: Reader[] = [
  { 
    id: "1", 
    cardId: "RD-2024001", 
    name: "Nguyen Van A", 
    email: "nguyenvana@example.com", 
    phone: "0912345678", 
    status: "Active", 
    activeLoans: 2, 
    totalLoans: 15, 
    joinedDate: "2024-01-15" 
  },
  { 
    id: "2", 
    cardId: "RD-2024002", 
    name: "Tran Thi B", 
    email: "tranthib@example.com", 
    phone: "0987654321", 
    status: "Blocked", 
    activeLoans: 0, 
    totalLoans: 5, 
    joinedDate: "2024-02-20" 
  },
  { 
    id: "3", 
    cardId: "RD-2024003", 
    name: "Le Van C", 
    email: "levanc@example.com", 
    phone: "0909090909", 
    status: "Expired", 
    activeLoans: 0, 
    totalLoans: 30, 
    joinedDate: "2023-11-05" 
  },
]

export default function ReadersPage() {
  const [readers, setReaders] = useState<Reader[]>(initialReaders)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentReader, setCurrentReader] = useState<Reader | null>(null)
  
  const { toast } = useToast()

  const handleEdit = (reader: Reader) => {
    setCurrentReader(reader)
    setIsDialogOpen(true)
  }

  const handleDelete = (reader: Reader) => {
    setCurrentReader(reader)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!currentReader) return
    
    // In a real app, check if reader has active loans before deleting
    if (currentReader.activeLoans > 0) {
        toast({
            title: "Cannot delete reader",
            description: "This reader has active book loans. Please return all books first.",
            variant: "destructive"
        })
        setIsDeleteDialogOpen(false)
        return
    }
    
    setReaders(readers.filter(r => r.id !== currentReader.id))
    setIsDeleteDialogOpen(false)
    setCurrentReader(null)
    toast({
      title: "Reader deleted",
      description: `${currentReader.name} has been removed.`,
    })
  }

  const handleSave = (formData: Partial<Reader>) => {
    if (currentReader) {
      // Edit
      setReaders(readers.map(r => 
        r.id === currentReader.id 
          ? { ...r, ...formData } as Reader
          : r
      ))
      toast({ title: "Reader updated", description: "Changes saved successfully." })
    } else {
      // Add
      const newReader: Reader = {
        id: Math.random().toString(36).substr(2, 9),
        cardId: formData.cardId || `RD-${new Date().getFullYear()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: formData.name || "Unknown",
        email: formData.email || "",
        phone: formData.phone || "",
        status: formData.status || "Active",
        activeLoans: 0,
        totalLoans: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      } as Reader

      setReaders([...readers, newReader])
      toast({ title: "Reader registered", description: `New reader card ${newReader.cardId} created.` })
    }
    setIsDialogOpen(false)
    setCurrentReader(null)
  }

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete })

  const table = useReactTable({
    data: readers,
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
        <h1 className="text-lg font-semibold md:text-2xl">Readers</h1>
        <Button onClick={() => { setCurrentReader(null); setIsDialogOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reader
        </Button>
      </div>

      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm flex-1">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
                placeholder="Search readers by name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
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

      <ReaderDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        reader={currentReader}
        onSave={handleSave}
      />

       {/* Delete Alert Dialog */}
       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will delete the reader account for
              <span className="font-semibold text-foreground"> {currentReader?.name} </span>.
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
