"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const logs = [
  { id: 1, action: "LOGIN", user: "Admin", details: "Logged in successfully", time: "2024-03-15 08:30:00" },
  { id: 2, action: "CREATE_BOOK", user: "Admin", details: "Added 'The Great Gatsby'", time: "2024-03-15 09:15:00" },
  { id: 3, action: "UPDATE_READER", user: "Admin", details: "Updated profile for 'Nguyen Van A'", time: "2024-03-15 10:00:00" },
  { id: 4, action: "LOAN_CREATED", user: "Admin", details: "Loan created for '1984'", time: "2024-03-15 11:20:00" },
  { id: 5, action: "BOOK_RETURNED", user: "Admin", details: "Returned 'Clean Code'", time: "2024-03-15 14:45:00" },
  { id: 6, action: "SETTINGS_UPDATE", user: "SuperAdmin", details: "Changed fine per day to 2000", time: "2024-03-14 16:00:00" },
]

export default function AuditLogsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
      </div>

      <div className="rounded-md border bg-card">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {logs.map((log) => (
                  <TableRow key={log.id}>
                     <TableCell className="font-mono text-xs text-muted-foreground">{log.time}</TableCell>
                     <TableCell className="font-medium">{log.user}</TableCell>
                     <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                     </TableCell>
                     <TableCell>{log.details}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
    </div>
  )
}
