"use client";
import {
  BadgeCheck,
  Check,
  ChevronsUpDown,
  Folder,
  LogOut,
  Plus,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Folder = {
  id: string;
  name: string;
};

const AppSidebar = () => {
  const { user } = useUser();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      await createFolder(newFolderName);
      setNewFolderName("");
      setIsAddingFolder(false);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateFolder();
    } else if (e.key === "Escape") {
      setIsAddingFolder(false);
      setNewFolderName("");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  async function fetchFolders() {
    try {
      const response = await fetch("/api/folders");

      if (response.ok) {
        const data = await response.json();
        setFolders(data.content.folders);
      }
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
  }

  async function createFolder(inputName: string) {
    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputName }),
      });
      const data = await response.json();
      setFolders((prevFolders) => [...prevFolders, data.content.folder]);
    } catch (error) {
      console.error("Failed to create folder", error);
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarHeader className="text-xl font-bold">Note app</SidebarHeader>
          <Separator className="dark:bg-neutral-500" />
          <SidebarGroupContent className="mt-2 h-full w-full space-y-1 px-2">
            {folders?.length > 0 ? (
              <>
                <SidebarMenu>
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.id}>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-muted">
                        <Folder className="h-4 w-4" />
                        <span>{folder.name}</span>
                      </div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </>
            ) : (
              <p className="px-2 py-1 text-sm text-muted-foreground">
                No folders yet
              </p>
            )}

            {isAddingFolder ? (
              <div className="flex items-center gap-1 px-2 py-1">
                <Input
                  autoFocus
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Folder name"
                  className="h-8"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleCreateFolder}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => {
                    setIsAddingFolder(false);
                    setNewFolderName("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2"
                onClick={() => setIsAddingFolder(true)}
              >
                <Plus className="h-4 w-4" />
                Create folder
              </Button>
            )}
          </SidebarGroupContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="outline-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.imageUrl}
                          alt={user?.username?.charAt(0)}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
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
                    <SignOutButton redirectUrl="/sign-in">
                      <DropdownMenuItem>
                        <LogOut />
                        Log out
                      </DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
