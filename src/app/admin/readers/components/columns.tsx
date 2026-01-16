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

export type Reader = {
  id: string
  cardId: string // Library Card Number
  name: string
  email: string
  phone: string
  status: "Active" | "Expired" | "Blocked"
  activeLoans: number
  totalLoans: number
  joinedDate: string
}

interface ReaderColumnsProps {
  onEdit: (reader: Reader) => void
  onDelete: (reader: Reader) => void
}

export const getColumns = ({ onEdit, onDelete }: ReaderColumnsProps): ColumnDef<Reader>[] => [
  {
    accessorKey: "cardId",
    header: "Card ID",
    cell: ({ row }) => <span className="font-mono">{row.getValue("cardId")}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
        return (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("name")}</span>
                <span className="text-xs text-muted-foreground">{row.original.email}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "activeLoans",
    header: "Active Loans",
    cell: ({ row }) => {
        const active = row.original.activeLoans
        return (
            <Badge variant={active > 0 ? "secondary" : "outline"}>
                {active} Book{active !== 1 ? "s" : ""}
            </Badge>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "Active" ? "default" : status === "Blocked" ? "destructive" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reader = row.original

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
            <DropdownMenuItem onClick={() => onEdit(reader)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(reader)}
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
