"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Users, Activity, Download, Wallet, BookOpen } from "lucide-react"

const userGrowthData = [
  { month: "Jan", users: 1200, activeUsers: 980 },
  { month: "Feb", users: 1450, activeUsers: 1180 },
  { month: "Mar", users: 1680, activeUsers: 1350 },
  { month: "Apr", users: 1920, activeUsers: 1580 },
  { month: "May", users: 2150, activeUsers: 1780 },
  { month: "Jun", users: 2380, activeUsers: 1950 },
  { month: "Jul", users: 2650, activeUsers: 2180 },
  { month: "Aug", users: 2890, activeUsers: 2380 },
  { month: "Sep", users: 3120, activeUsers: 2580 },
  { month: "Oct", users: 3380, activeUsers: 2790 },
  { month: "Nov", users: 3650, activeUsers: 3020 },
  { month: "Dec", users: 3920, activeUsers: 3250 },
]

const revenueData = [
  { month: "Jan", revenue: 12500, subscriptions: 450 },
  { month: "Feb", revenue: 15200, subscriptions: 520 },
  { month: "Mar", revenue: 18900, subscriptions: 630 },
  { month: "Apr", revenue: 22100, subscriptions: 740 },
  { month: "May", revenue: 25800, subscriptions: 860 },
  { month: "Jun", revenue: 29200, subscriptions: 980 },
  { month: "Jul", revenue: 32800, subscriptions: 1100 },
  { month: "Aug", revenue: 36500, subscriptions: 1220 },
  { month: "Sep", revenue: 40200, subscriptions: 1340 },
  { month: "Oct", revenue: 44100, subscriptions: 1470 },
  { month: "Nov", revenue: 48200, subscriptions: 1610 },
  { month: "Dec", revenue: 52500, subscriptions: 1750 },
]

const engagementData = [
  { name: "Course Completions", value: 35, color: "#8884d8" },
  { name: "Community Posts", value: 28, color: "#82ca9d" },
  { name: "Wallet Connections", value: 22, color: "#ffc658" },
  { name: "Profile Updates", value: 15, color: "#ff7300" },
]

const dailyActivityData = [
  { day: "Mon", posts: 45, comments: 120, walletActivity: 89 },
  { day: "Tue", posts: 52, comments: 135, walletActivity: 95 },
  { day: "Wed", posts: 48, comments: 128, walletActivity: 87 },
  { day: "Thu", posts: 61, comments: 142, walletActivity: 103 },
  { day: "Fri", posts: 55, comments: 138, walletActivity: 98 },
  { day: "Sat", posts: 38, comments: 95, walletActivity: 72 },
  { day: "Sun", posts: 42, comments: 108, walletActivity: 78 },
]

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = React.useState("30d")
  const [userType, setUserType] = React.useState("all")

  const exportData = (format: string) => {
    // Mock export functionality
    console.log(`Exporting data as ${format}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportData("csv")} className="glass-button">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportData("pdf")} className="glass-button">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Connections</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,924</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> unique wallets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23.1%</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Total users vs active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area
                    type="monotone"
                    dataKey="activeUsers"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue in USDC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={{ fill: "#8884d8" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Activity breakdown by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Engagement"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity Breakdown</CardTitle>
          <CardDescription>Posts, comments, and wallet activity by day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                <Bar dataKey="walletActivity" fill="#ffc658" name="Wallet Activity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Most engaged posts and courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Solana DeFi Fundamentals</p>
                <p className="text-sm text-muted-foreground">Course</p>
              </div>
              <Badge className="bg-green-100 text-green-800">1,247 completions</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">NFT Trading Strategies</p>
                <p className="text-sm text-muted-foreground">Community Post</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">892 interactions</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wallet Security Best Practices</p>
                <p className="text-sm text-muted-foreground">Guide</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">756 views</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">User Retention (30d)</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Course Completion Rate</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[72%] h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">72%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Community Engagement</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[68%] h-full bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">68%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment Success Rate</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
