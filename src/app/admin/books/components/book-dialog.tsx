"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorId: z.string().min(1, "Author is required"),
  categoryId: z.string().min(1, "Category is required"),
  isbn: z.string().optional(),
  quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
})

type FormSchema = z.infer<typeof formSchema>

interface BookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: FormSchema & { id?: string }) => void
  initialData?: (FormSchema & { id: string }) | null
}

// Mock options (ideally these come from props or API)
const authors = [
  { id: "1", name: "J.K. Rowling" },
  { id: "2", name: "George Orwell" },
  { id: "3", name: "J.R.R. Tolkien" },
  { id: "4", name: "Agatha Christie" },
]

const categories = [
  { id: "1", name: "Fiction" },
  { id: "2", name: "Science" },
  { id: "3", name: "History" },
  { id: "4", name: "Technology" },
]

export function BookDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: BookDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        authorId: "",
        categoryId: "",
        isbn: "",
        quantity: "1",
    },
  })

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title)
      setValue("authorId", initialData.authorId)
      setValue("categoryId", initialData.categoryId)
      setValue("isbn", initialData.isbn || "")
      setValue("quantity", initialData.quantity.toString())
    } else {
      reset({
          title: "",
          authorId: "",
          categoryId: "",
          isbn: "",
          quantity: "1",
      })
    }
  }, [initialData, reset, setValue])

  const onSubmit = (data: FormSchema) => {
    onSave({ ...data, id: initialData?.id })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Book" : "Add Book"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to the book details here."
              : "Add a new book to the library."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3">
                  <Input
                    id="title"
                    {...register("title")}
                    className="w-full"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                  )}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <div className="col-span-3">
                <Controller
                    control={control}
                    name="authorId"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                            <SelectContent>
                                {authors.map((author) => (
                                    <SelectItem key={author.id} value={author.id}>
                                        {author.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                 {errors.authorId && (
                    <p className="text-xs text-red-500 mt-1">{errors.authorId.message}</p>
                  )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
               <div className="col-span-3">
                <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.categoryId && (
                    <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>
                  )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isbn" className="text-right">
                ISBN
              </Label>
              <Input
                id="isbn"
                {...register("isbn")}
                className="col-span-3"
              />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <div className="col-span-3">
                <Input
                    id="quantity"
                    type="number"
                    min="1"
                    {...register("quantity")}
                />
                {errors.quantity && (
                    <p className="text-xs text-red-500 mt-1">{errors.quantity.message}</p>
                  )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
