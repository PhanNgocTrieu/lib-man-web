"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Loan = {
  id: string
  readerId: string
  readerName: string
  bookId: string
  bookTitle: string
  borrowDate: string
  dueDate: string
  returnDate?: string
  status: "Active" | "Returned" | "Overdue"
  fine?: number
}

interface LoanColumnsProps {
  onReturn: (loan: Loan) => void
}

export const getColumns = ({ onReturn }: LoanColumnsProps): ColumnDef<Loan>[] => [
  {
    accessorKey: "id",
    header: "Loan ID",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "readerName",
    header: "Reader",
  },
  {
    accessorKey: "bookTitle",
    header: "Book",
  },
  {
    accessorKey: "borrowDate",
    header: "Borrow Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
        const date = row.getValue("dueDate") as string
        const isOverdue = new Date(date) < new Date() && row.original.status !== "Returned"
        return <span className={isOverdue ? "text-red-600 font-bold" : ""}>{date}</span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "Active" ? "secondary" : status === "Overdue" ? "destructive" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const loan = row.original

      if (loan.status === "Returned") return null

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
            <DropdownMenuItem onClick={() => onReturn(loan)}>
              Return Book
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
