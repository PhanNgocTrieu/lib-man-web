"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

interface AuthorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: FormSchema & { id?: string }) => void
  initialData?: (FormSchema & { id: string }) | null
}

export function AuthorDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: AuthorDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        bio: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name)
      setValue("bio", initialData.bio || "")
    } else {
      reset({
          name: "",
          bio: "",
      })
    }
  }, [initialData, reset, setValue])

  const onSubmit = (data: FormSchema) => {
    onSave({ ...data, id: initialData?.id })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Author" : "Add Author"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to the author here."
              : "Add a new author to your library."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                  <Input
                    id="name"
                    {...register("name")}
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                {...register("bio")}
                className="col-span-3"
              />
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
