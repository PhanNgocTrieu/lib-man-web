"use client"

import { useState } from "react"
import { Bell, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Book Added",
    description: "'Clean Code' has been added to the library.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Overdue Alert",
    description: "Book '1984' is overdue by 5 days.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "New Reader Registered",
    description: "Nguyen Van A has joined.",
    time: "1 day ago",
    read: true,
  },
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent dropdown from closing
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs leading-none text-muted-foreground">
              You have {unreadCount} unread messages.
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-primary hover:bg-transparent"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
             <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications.
             </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-default flex-col items-start gap-1 p-3 focus:bg-muted/50"
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                    <span className={cn("text-sm font-semibold", notification.read && "text-muted-foreground font-medium")}>
                      {notification.title}
                    </span>
                  </div>
                  {!notification.read && (
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 hover:bg-muted text-muted-foreground"
                        onClick={(e) => markAsRead(notification.id, e)}
                        title="Mark as read"
                     >
                        <Check className="h-3 w-3" />
                     </Button>
                  )}
                </div>
                <p className={cn("text-xs line-clamp-2", notification.read ? "text-muted-foreground" : "")}>
                  {notification.description}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {notification.time}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-center cursor-pointer text-xs text-muted-foreground justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
