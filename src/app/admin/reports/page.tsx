"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for reports
const topBooks = [
  { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", borrowed: 145 },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowed: 120 },
  { id: 3, title: "1984", author: "George Orwell", borrowed: 98 },
  { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", borrowed: 85 },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", borrowed: 76 },
]

const overdueBooks = [
  { id: "LN-002", title: "1984", reader: "Tran Thi B", dueDate: "2024-02-15", daysOverdue: 5, fine: 5000 },
  { id: "LN-008", title: "The Hobbit", reader: "Le Van C", dueDate: "2024-02-18", daysOverdue: 2, fine: 2000 },
]

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Borrowed Books</CardTitle>
            <CardDescription>
              The most popular books in the library this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Borrows</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topBooks.map((book, index) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="text-right">{book.borrowed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Overdue Books</CardTitle>
            <CardDescription>
              Books that have not been returned by due date.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {overdueBooks.map((item) => (
                 <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Reader: {item.reader}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <Badge variant="destructive">{item.daysOverdue} days</Badge>
                       <span className="text-xs text-muted-foreground mt-1">
                          Fine: {item.fine.toLocaleString()} VND
                       </span>
                    </div>
                 </div>
               ))}
               {overdueBooks.length === 0 && (
                   <p className="text-sm text-muted-foreground">No overdue books at the moment.</p>
               )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
