"use client"
import { BadgeCheck, ChevronsUpDown, LogOut, NotebookPen, } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useUser } from "@clerk/nextjs"


const AppSidebar = () => {
    const items = [
        {
          title: "Notes",
          url: "/notes",
          icon: NotebookPen,
        },
      ]

      const { user} = useUser()

  return (
    <Sidebar>
    <SidebarContent>
      <SidebarGroup className="h-full">
        <SidebarHeader>Application</SidebarHeader>
        <SidebarGroupContent className="h-full">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground outline-none"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                       src={user?.imageUrl}
                       alt={user?.username?.charAt(0)}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                      {user?.username}
                      </span>
                      <span className="truncate text-xs">
                      {user?.emailAddresses[0].emailAddress}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.username?.charAt(0)}
                        />
                        <AvatarFallback className="rounded-lg">
                            {user?.username?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.username}
                        </span>
                        <span className="truncate text-xs">
                            {user?.emailAddresses[0].emailAddress}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  )
}

export default AppSidebar