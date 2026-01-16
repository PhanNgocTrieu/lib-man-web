"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, History, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  
  // Mock Settings State
  const [libraryName, setLibraryName] = useState("NTC Library")
  const [finePerDay, setFinePerDay] = useState(1000)
  const [maxBooksPerReader, setMaxBooksPerReader] = useState(5)

  const handleSaveSettings = () => {
     toast({
        title: "Settings Saved",
        description: "System configurations have been updated.",
     })
  }

  const handleExportData = (type: 'books' | 'readers') => {
      // Mock CSV Export logic
      const headers = type === 'books' ? "ID,Title,Author,ISBN\n" : "ID,Name,Email,Phone\n";
      const rows = type === 'books' 
          ? "1,Clean Code,Robert C. Martin,978-0132350884\n2,The Pragmatic Programmer,Andrew Hunt,978-0201616224"
          : "1,Nguyen Van A,a@example.com,0909090909\n2,Tran Thi B,b@example.com,0808080808";
      
      const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${type}_backup_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: `${type === 'books' ? 'Books' : 'Readers'} data has been exported to CSV.`,
     })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
         {/* General Configuration */}
         <Card>
            <CardHeader>
               <CardTitle>General Configuration</CardTitle>
               <CardDescription>
                  Manage global system settings.
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="library-name">Library Name</Label>
                  <Input 
                      id="library-name" 
                      value={libraryName} 
                      onChange={(e) => setLibraryName(e.target.value)} 
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="fine-per-day">Fine (VND / Day)</Label>
                     <Input 
                        id="fine-per-day" 
                        type="number"
                        value={finePerDay} 
                        onChange={(e) => setFinePerDay(Number(e.target.value))} 
                    />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="max-books">Max Books / Reader</Label>
                     <Input 
                        id="max-books" 
                        type="number"
                        value={maxBooksPerReader} 
                        onChange={(e) => setMaxBooksPerReader(Number(e.target.value))} 
                     />
                  </div>
               </div>
            </CardContent>
            <CardFooter>
               <Button onClick={handleSaveSettings}>
                   <Save className="mr-2 h-4 w-4" />
                   Save Changes
               </Button>
            </CardFooter>
         </Card>

         {/* Data Management */}
         <div className="space-y-4">
             <Card>
                <CardHeader>
                   <CardTitle>Data Backup</CardTitle>
                   <CardDescription>
                      Export system data for backup purposes.
                   </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                         <h4 className="text-sm font-medium">Books Data</h4>
                         <p className="text-xs text-muted-foreground">Export all books metadata.</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleExportData('books')}>
                         <Download className="mr-2 h-4 w-4" /> Export
                      </Button>
                   </div>
                   <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                         <h4 className="text-sm font-medium">Readers Data</h4>
                         <p className="text-xs text-muted-foreground">Export reader profiles.</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleExportData('readers')}>
                         <Download className="mr-2 h-4 w-4" /> Export
                      </Button>
                   </div>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                   <CardTitle>Audit Logs</CardTitle>
                   <CardDescription>
                      View system activity history.
                   </CardDescription>
                </CardHeader>
                <CardContent>
                   <Link href="/admin/settings/logs">
                      <Button variant="secondary" className="w-full">
                         <History className="mr-2 h-4 w-4" />
                         View Full System Logs
                      </Button>
                   </Link>
                </CardContent>
             </Card>
         </div>
      </div>
    </div>
  )
}
