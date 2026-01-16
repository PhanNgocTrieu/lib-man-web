import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function RecentActivities() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>NV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nguyen Van A</p>
          <p className="text-sm text-muted-foreground">
            Borrowed "Harry Potter"
          </p>
        </div>
        <div className="ml-auto font-medium">+1 Book</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>TB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tran Thi B</p>
          <p className="text-sm text-muted-foreground">
            Borrowed "1984"
          </p>
        </div>
        <div className="ml-auto font-medium">+1 Book</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>LC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Le Van C</p>
          <p className="text-sm text-muted-foreground">
            Returned "The Hobbit"
          </p>
        </div>
        <div className="ml-auto font-medium text-green-600">Returned</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>PD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pham Van D</p>
          <p className="text-sm text-muted-foreground">
            Returned "Clean Code"
          </p>
        </div>
        <div className="ml-auto font-medium text-green-600">Returned</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>HE</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Hoang Thi E</p>
          <p className="text-sm text-muted-foreground">
            Overdue "Silent Patient"
          </p>
        </div>
        <div className="ml-auto font-medium text-red-600">Overdue</div>
      </div>
    </div>
  )
}
