"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Reader } from "./columns" // Import Reader type from columns
import { useEffect, useState } from "react"

interface ReaderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reader: Reader | null
  onSave: (reader: Partial<Reader>) => void
}

export function ReaderDialog({ open, onOpenChange, reader, onSave }: ReaderDialogProps) {
  const [formData, setFormData] = useState<Partial<Reader>>({
    name: "",
    email: "",
    phone: "",
    cardId: "",
    status: "Active"
  })

  useEffect(() => {
    if (reader) {
      setFormData(reader)
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        cardId: "",
        status: "Active"
      })
    }
  }, [reader, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{reader ? "Edit Reader" : "Add New Reader"}</DialogTitle>
          <DialogDescription>
            {reader ? "Update the reader's profile details." : "Register a new reader to the library system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nguyen Van A"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912..."
                />
             </div>
             <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                    value={formData.status} 
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>

          {!reader && (
               <div className="grid gap-2">
                <Label htmlFor="cardId">Card ID (Optional)</Label>
                <Input
                  id="cardId"
                  value={formData.cardId}
                  onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
                  placeholder="Leave empty to auto-generate"
                />
                 <p className="text-[0.8rem] text-muted-foreground">
                    System will generate a unique ID if left empty.
                 </p>
             </div>
          )}

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
