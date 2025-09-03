"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, Download, UserX, UserCheck, Eye, Wallet, CreditCard } from "lucide-react"
import { toast } from "sonner"

const users = [
  {
    id: "1",
    username: "cryptodev",
    email: "dev@example.com",
    wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHkv",
    role: "Premium",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    posts: 45,
    subscriptionStatus: "Active",
  },
  {
    id: "2",
    username: "solanawhale",
    email: "whale@example.com",
    wallet: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    role: "Basic",
    status: "Suspended",
    joinDate: "2024-02-20",
    lastActive: "1 day ago",
    posts: 23,
    subscriptionStatus: "Expired",
  },
  {
    id: "3",
    username: "nftcollector",
    email: "collector@example.com",
    wallet: "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
    role: "Premium",
    status: "Active",
    joinDate: "2024-03-10",
    lastActive: "30 minutes ago",
    posts: 78,
    subscriptionStatus: "Active",
  },
  {
    id: "4",
    username: "defitrader",
    email: "trader@example.com",
    wallet: "8qbHbw2BbbTHBW1sbeqakYXVKRQM8Ne7pLK7m6CVfeR",
    role: "Basic",
    status: "Banned",
    joinDate: "2024-01-05",
    lastActive: "1 week ago",
    posts: 12,
    subscriptionStatus: "Cancelled",
  },
]

export function UserManagement() {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [selectedUser, setSelectedUser] = React.useState<(typeof users)[0] | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.wallet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const handleUserAction = (action: string, userId?: string) => {
    const userIds = userId ? [userId] : selectedUsers
    const userCount = userIds.length

    switch (action) {
      case "suspend":
        toast.success(`${userCount} user(s) suspended successfully`)
        break
      case "ban":
        toast.success(`${userCount} user(s) banned successfully`)
        break
      case "reinstate":
        toast.success(`${userCount} user(s) reinstated successfully`)
        break
      case "export":
        toast.success("User data exported successfully")
        break
    }

    if (!userId) {
      setSelectedUsers([])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
      case "suspended":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Suspended</Badge>
        )
      case "banned":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Banned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    return role === "Premium" ? (
      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Premium</Badge>
    ) : (
      <Badge variant="outline">Basic</Badge>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and account status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleUserAction("export")} className="glass-button">
            <Download className="mr-2 h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username, email, or wallet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {selectedUsers.length} user(s) selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserAction("suspend")}
                  className="glass-button"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Suspend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUserAction("reinstate")}
                  className="glass-button"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Reinstate
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="glass-button-destructive">
                      Ban Users
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ban Selected Users</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to ban {selectedUsers.length} user(s)? This action will immediately revoke
                        their access.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" className="glass-button">
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleUserAction("ban")}
                        className="glass-button-destructive"
                      >
                        Ban Users
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Wallet</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                  <TableHead className="hidden lg:table-cell">Posts</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="font-mono text-xs">
                        {user.wallet.slice(0, 8)}...{user.wallet.slice(-4)}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.posts}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 glass-button">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Active" && (
                            <DropdownMenuItem onClick={() => handleUserAction("suspend", user.id)}>
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          {user.status !== "Active" && (
                            <DropdownMenuItem onClick={() => handleUserAction("reinstate", user.id)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Reinstate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600" onClick={() => handleUserAction("ban", user.id)}>
                            Ban User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Profile Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{selectedUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {selectedUser.username}
                  {getStatusBadge(selectedUser.status)}
                </DialogTitle>
                <DialogDescription>User profile and activity overview</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="moderation">Moderation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Account Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="w-20">Email:</Label>
                          <span className="text-sm">{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-20">Role:</Label>
                          {getRoleBadge(selectedUser.role)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-20">Joined:</Label>
                          <span className="text-sm">{selectedUser.joinDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-20">Posts:</Label>
                          <span className="text-sm">{selectedUser.posts}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          Wallet Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label>Wallet Address:</Label>
                          <div className="font-mono text-xs bg-muted p-2 rounded">{selectedUser.wallet}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Posted in "DeFi Strategies" - 2 hours ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Completed course "Solana Fundamentals" - 1 day ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Joined community discussion - 3 days ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Subscription Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge
                            className={
                              selectedUser.subscriptionStatus === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {selectedUser.subscriptionStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Plan:</span>
                          <span>{selectedUser.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Billing:</span>
                          <span>Dec 15, 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="moderation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Moderation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">No moderation actions on record</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
