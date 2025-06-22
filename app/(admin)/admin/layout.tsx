// app/layout.tsx
import { ReactNode } from "react";
import "../../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "My App",
  description: "A modern Next.js app with sidebar layout",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="flex min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
