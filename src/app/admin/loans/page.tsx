"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react" 
import { Button } from "@/components/ui/button"
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
} from "@tanstack/react-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Loan, getColumns } from "./components/columns"
import { useToast } from "@/hooks/use-toast"

// Mock Loan Data
const initialLoans: Loan[] = [
  { 
    id: "LN-001", 
    readerId: "1", 
    readerName: "Nguyen Van A", 
    bookId: "1", 
    bookTitle: "Harry Potter", 
    borrowDate: "2024-03-01", 
    dueDate: "2024-03-15", 
    status: "Active" 
  },
  { 
    id: "LN-002", 
    readerId: "2", 
    readerName: "Tran Thi B", 
    bookId: "2", 
    bookTitle: "1984", 
    borrowDate: "2024-02-01", 
    dueDate: "2024-02-15", 
    status: "Overdue" 
  },
  { 
    id: "LN-003", 
    readerId: "1", 
    readerName: "Nguyen Van A", 
    bookId: "3", 
    bookTitle: "The Hobbit", 
    borrowDate: "2024-01-10", 
    dueDate: "2024-01-24", 
    returnDate: "2024-01-20",
    status: "Returned" 
  },
]

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans)
  const { toast } = useToast()

  const handleReturn = (loan: Loan) => {
    // In real app: Update logic and potential fine calculation
    const updatedLoans = loans.map(l => 
        l.id === loan.id 
        ? { ...l, status: "Returned" as const, returnDate: new Date().toISOString().split('T')[0] } 
        : l
    )
    setLoans(updatedLoans)
    toast({
        title: "Book Returned",
        description: `Loan ${loan.id} has been marked as returned.`
    })
  }

  const columns = getColumns({ onReturn: handleReturn })

  // Filtering for Tabs
  const activeLoans = loans.filter(l => l.status === "Active" || l.status === "Overdue")
  const overdueLoans = loans.filter(l => l.status === "Overdue")
  const historyLoans = loans.filter(l => l.status === "Returned")

  const table = useReactTable({
    data: activeLoans,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // Helper to verify if we need separate tables for tabs or just re-render with different data.
  // For simplicity using one table instance but ideally we define separate tables per tab or switch data.
  
  const renderTable = (data: Loan[]) => {
      // Re-using table instance logic slightly inefficiently here for brevity, 
      // strictly should use new table instance per data set.
      // Let's just create a quick table component or map manually since we lack a robust reusable Table component here.
      // Actually, let's just use the table instance but we need to update data.
      // React Table is reactive, so updating state 'loans' works, but filtering is manual.
      
      // Better approach for UI: Just map the rows manually for this simple view or create a sub-component.
      // Let's use a sub-component pattern implicitly by just rendering the Table markup.
      return (
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => {
                 // Determine header text
                 let headerText = "";
                 if (col.id === "actions") {
                    headerText = "Actions";
                 } else if (typeof col.header === "string") {
                    headerText = col.header;
                 } else if ("accessorKey" in col) {
                    headerText = col.accessorKey as string;
                 }

                 return (
                   <TableHead key={col.id || ("accessorKey" in col ? (col.accessorKey as string) : index)}>
                       {headerText}
                   </TableHead>
                 )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? data.map((row) => (
                <TableRow key={row.id}>
                    <TableCell><span className="font-mono text-xs text-muted-foreground">#{row.id}</span></TableCell>
                    <TableCell>{row.readerName}</TableCell>
                    <TableCell>{row.bookTitle}</TableCell>
                    <TableCell>{row.borrowDate}</TableCell>
                    <TableCell>
                         <span className={row.status === "Overdue" ? "text-red-600 font-bold" : ""}>{row.dueDate}</span>
                    </TableCell>
                    <TableCell>
                         <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${row.status === "Active" ? "border-transparent bg-secondary text-secondary-foreground" : row.status === "Overdue" ? "border-transparent bg-destructive text-destructive-foreground" : "text-foreground border-input"}`}>
                            {row.status}
                        </span>
                    </TableCell>
                     <TableCell>
                        {row.status !== "Returned" && (
                             <Button size="sm" variant="outline" onClick={() => handleReturn(row)}>Return</Button>
                        )}
                     </TableCell>
                </TableRow>
            )) : (
                 <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Loans & Circulation</h1>
        <Link href="/admin/loans/new">
            <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Loan
            </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
            <TabsTrigger value="active">Active Loans ({activeLoans.length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({overdueLoans.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
            {renderTable(activeLoans)}
        </TabsContent>
        <TabsContent value="overdue">
             {renderTable(overdueLoans)}
        </TabsContent>
        <TabsContent value="history">
             {renderTable(historyLoans)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
