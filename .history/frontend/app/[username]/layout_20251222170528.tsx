"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import useAuth from "@/hooks/use-auth";
import {
  User,
  Laptop,
  Package,
  Code,
  MessageCircleDashedIcon,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data} = useAuth()
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 50)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        routes={[
          {
            name: "Report",
            url: `/${data?.user?.fullName}`,
            icon: Package,
          },
          {
            name: "Users",
            url: `/${data?.user?.fullName}/users`,
            icon: User,
          },
          {
            name: "Team Members",
            url: `/${data?.user?.fullName}/team`,
            icon: Laptop,
          },
          {
            name: "Projects",
            url: `/${data?.user?.fullName}/projects`,
            icon: Code,
          },
          {
            name: "Messages",
            url: `/${data?.user?.fullName}/messages`,
            icon: MessageCircleDashedIcon,
          },
        ]}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 my-4">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
