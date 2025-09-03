"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, Flag, Wallet, Activity, AlertTriangle } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back to Sol3hive Admin Panel</p>
        </div>
        <Badge className="glass-badge bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
          <Activity className="w-3 h-3 mr-1" />
          System Healthy
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card glass-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#7921C5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              12,847
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card glass-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (USDC)</CardTitle>
            <DollarSign className="h-4 w-4 text-[#7921C5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              $89,432
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card glass-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            <Wallet className="h-4 w-4 text-[#7921C5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              8,924
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card glass-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <Flag className="h-4 w-4 text-[#7921C5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              23
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> new today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              Recent Activity
            </CardTitle>
            <CardDescription>Latest admin actions and system events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-[#7921C5] to-[#9333EA] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">User @cryptodev suspended</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <Badge className="glass-badge" variant="secondary">
                Moderation
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment retry successful for user #1247</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
              <Badge className="glass-badge" variant="secondary">
                Billing
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New content report submitted</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <Badge className="glass-badge" variant="secondary">
                Report
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-[#7921C5] to-[#9333EA] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Bulk user export completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge className="glass-badge" variant="secondary">
                System
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-[#7921C5] to-[#9333EA] bg-clip-text text-transparent">
              System Status
            </CardTitle>
            <CardDescription>Platform health overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response Time</span>
                <span className="text-sm font-medium">142ms</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Load</span>
                <span className="text-sm font-medium">34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="glass-button w-full">
                View Full Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="glass-card border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
            <AlertTriangle className="h-4 w-4" />
            Attention Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-200">23 pending moderation reports</p>
              <p className="text-sm text-orange-600 dark:text-orange-300">Some reports are over 24 hours old</p>
            </div>
            <Button variant="outline" size="sm" className="glass-button">
              Review Reports
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-200">5 failed payment retries</p>
              <p className="text-sm text-orange-600 dark:text-orange-300">Users may lose access soon</p>
            </div>
            <Button variant="outline" size="sm" className="glass-button">
              Handle Billing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
