"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Book = {
  id: string
  title: string
  authorId: string
  authorName: string
  categoryId: string
  categoryName: string
  isbn: string
  quantity: number
  available: number
  location: string
  status: "Available" | "Low Stock" | "Out of Stock"
  coverUrl?: string
}

interface BookColumnsProps {
  onEdit: (book: Book) => void
  onDelete: (book: Book) => void
}

export const getColumns = ({ onEdit, onDelete }: BookColumnsProps): ColumnDef<Book>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("title")}</span>
    }
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("categoryName")}</Badge>,
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.getValue("isbn")}</span>
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
        const available = row.original.available
        const total = row.original.quantity
        return <span>{available} <span className="text-muted-foreground">/ {total}</span></span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
        cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "Available" ? "default" : status === "Out of Stock" ? "destructive" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(book)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(book)}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
