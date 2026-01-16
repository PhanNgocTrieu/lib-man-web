"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Author = {
  id: string
  name: string
  bio: string
  booksCount: number
}

interface AuthorColumnsProps {
  onEdit: (author: Author) => void
  onDelete: (author: Author) => void
}

export const getColumns = ({ onEdit, onDelete }: AuthorColumnsProps): ColumnDef<Author>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bio",
    header: "Biography",
    cell: ({ row }) => {
      const bio = row.original.bio
      return <div className="max-w-[500px] truncate" title={bio}>{bio}</div>
    }
  },
  {
    accessorKey: "booksCount",
    header: "Books",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original

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
            <DropdownMenuItem onClick={() => onEdit(author)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(author)}
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
