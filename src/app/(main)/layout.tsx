import AppSidebar from "@/components/app-siderbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row lg:flex-row xl:flex-row">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger />
            </header>
            <div className="flex flex-1 flex-col px-4">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
