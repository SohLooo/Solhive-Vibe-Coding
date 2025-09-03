"use client"

import * as React from "react"
import {
  BarChart3,
  Bell,
  CreditCard,
  Home,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  Users,
  Wallet,
  ChevronDown,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DashboardOverview } from "@/components/dashboard-overview"
import { UserManagement } from "@/components/user-management"
import { ModerationQueue } from "@/components/moderation-queue"
import { BillingManagement } from "@/components/billing-management"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { AdminSettings } from "@/components/admin-settings"

const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "User Management",
    icon: Users,
    id: "users",
  },
  {
    title: "Moderation",
    icon: Shield,
    id: "moderation",
  },
  {
    title: "Billing & Subscriptions",
    icon: CreditCard,
    id: "billing",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
]

export function AdminDashboard() {
  const [activeView, setActiveView] = React.useState("dashboard")
  const { theme, setTheme } = useTheme()

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "moderation":
        return <ModerationQueue />
      case "billing":
        return <BillingManagement />
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return <AdminSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="glass-sidebar border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7921C5] to-[#9333EA] text-white shadow-lg">
                  <Wallet className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Sol3hive</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className={`w-full transition-all duration-200 ${
                        activeView === item.id ? "glass-button shadow-lg" : ""
                      }`}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#7921C5] to-[#9333EA] text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Admin User</span>
                      <span className="truncate text-xs text-muted-foreground">admin@sol3hive.com</span>
                    </div>
                    <ChevronDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="glass-dropdown w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#7921C5] to-[#9333EA] text-white">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Admin User</span>
                        <span className="truncate text-xs text-muted-foreground">admin@sol3hive.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="glass-header flex h-16 shrink-0 items-center gap-2 border-b-0 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users, content, transactions..." className="glass-input pl-8" />
            </div>
            <Button variant="ghost" size="icon" className="glass-button relative">
              <Bell className="h-4 w-4" />
              <Badge className="glass-badge absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-[#7921C5] to-[#9333EA] text-white">
                3
              </Badge>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="dashboard-container m-4 p-6">{renderContent()}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
