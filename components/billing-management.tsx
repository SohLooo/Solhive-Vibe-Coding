"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  MoreHorizontal,
  Search,
  Download,
  RefreshCw,
  DollarSign,
  AlertCircle,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"

const transactions = [
  {
    id: "txn_001",
    user: "cryptodev",
    email: "dev@example.com",
    amount: 29.99,
    currency: "USDC",
    plan: "Premium Monthly",
    status: "Completed",
    date: "2024-12-15",
    paymentMethod: "Wallet",
    transactionHash: "5KJp9c2GVuPvGU4WR6wDvGydBEKpTU3aibVn5B9Rdgx",
  },
  {
    id: "txn_002",
    user: "nftcollector",
    email: "collector@example.com",
    amount: 99.99,
    currency: "USDC",
    plan: "Premium Annual",
    status: "Failed",
    date: "2024-12-14",
    paymentMethod: "Wallet",
    transactionHash: null,
    failureReason: "Insufficient funds",
  },
  {
    id: "txn_003",
    user: "solanawhale",
    email: "whale@example.com",
    amount: 29.99,
    currency: "USDC",
    plan: "Premium Monthly",
    status: "Pending",
    date: "2024-12-14",
    paymentMethod: "Wallet",
    transactionHash: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHkv",
  },
  {
    id: "txn_004",
    user: "defitrader",
    email: "trader@example.com",
    amount: 19.99,
    currency: "USDC",
    plan: "Basic Monthly",
    status: "Refunded",
    date: "2024-12-13",
    paymentMethod: "Wallet",
    transactionHash: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  },
]

const subscriptions = [
  {
    id: "sub_001",
    user: "cryptodev",
    plan: "Premium Monthly",
    status: "Active",
    nextBilling: "2025-01-15",
    amount: 29.99,
    currency: "USDC",
  },
  {
    id: "sub_002",
    user: "nftcollector",
    plan: "Premium Annual",
    status: "Payment Failed",
    nextBilling: "2024-12-20",
    amount: 99.99,
    currency: "USDC",
  },
  {
    id: "sub_003",
    user: "solanawhale",
    plan: "Premium Monthly",
    status: "Cancelled",
    nextBilling: null,
    amount: 29.99,
    currency: "USDC",
  },
]

const refundHistory = [
  {
    id: "ref_001",
    transactionId: "txn_004",
    user: "defitrader",
    amount: 19.99,
    currency: "USDC",
    reason: "Service not as expected",
    status: "Completed",
    processedBy: "admin@sol3hive.com",
    processedAt: "2024-12-13 15:30",
    refundMethod: "Original Payment Method",
  },
  {
    id: "ref_002",
    transactionId: "txn_005",
    user: "unhappyuser",
    amount: 29.99,
    currency: "USDC",
    reason: "Accidental purchase",
    status: "Processing",
    processedBy: "admin@sol3hive.com",
    processedAt: "2024-12-15 09:15",
    refundMethod: "Solana Wallet",
  },
]

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [planFilter, setPlanFilter] = React.useState("all")
  const [selectedTransaction, setSelectedTransaction] = React.useState<(typeof transactions)[0] | null>(null)

  const [refundDialog, setRefundDialog] = React.useState(false)
  const [refundTransaction, setRefundTransaction] = React.useState<(typeof transactions)[0] | null>(null)
  const [refundReason, setRefundReason] = React.useState("")
  const [refundAmount, setRefundAmount] = React.useState("")
  const [isProcessingRefund, setIsProcessingRefund] = React.useState(false)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter
    const matchesPlan = planFilter === "all" || transaction.plan.toLowerCase().includes(planFilter)

    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleBillingAction = (action: string, transactionId?: string, transaction?: (typeof transactions)[0]) => {
    switch (action) {
      case "retry":
        toast.success("Payment retry initiated")
        break
      case "refund":
        if (transaction) {
          setRefundTransaction(transaction)
          setRefundAmount(transaction.amount.toString())
          setRefundDialog(true)
        }
        break
      case "cancel":
        toast.success("Subscription cancelled")
        break
      case "export":
        toast.success("Billing data exported successfully")
        break
    }
  }

  const processRefund = async () => {
    if (!refundTransaction) return

    setIsProcessingRefund(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success(`Refund of $${refundAmount} processed successfully`)
    setRefundDialog(false)
    setRefundTransaction(null)
    setRefundReason("")
    setRefundAmount("")
    setIsProcessingRefund(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Refunded</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
      case "payment failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Payment Failed</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Calculate stats
  const totalRevenue = transactions.filter((t) => t.status === "Completed").reduce((sum, t) => sum + t.amount, 0)

  const failedPayments = transactions.filter((t) => t.status === "Failed").length
  const activeSubscriptions = subscriptions.filter((s) => s.status === "Active").length
  const pendingRetries = transactions.filter((t) => t.status === "Failed").length

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">Manage payments, subscriptions, and billing issues</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleBillingAction("export")} className="glass-button">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPayments}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Retries</CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRetries}</div>
            <p className="text-xs text-muted-foreground">Automatic retry scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="issues">Billing Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, email, or transaction ID..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
              <CardDescription>All payment transactions and billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Transaction Hash</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>{transaction.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.user}</div>
                              <div className="text-sm text-muted-foreground">{transaction.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.plan}</TableCell>
                        <TableCell>
                          <div className="font-medium">${transaction.amount}</div>
                          <div className="text-sm text-muted-foreground">{transaction.currency}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {transaction.transactionHash ? (
                            <div className="font-mono text-xs">
                              {transaction.transactionHash.slice(0, 8)}...{transaction.transactionHash.slice(-4)}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {transaction.status === "Failed" && (
                                <DropdownMenuItem
                                  onClick={() => handleBillingAction("retry", transaction.id)}
                                  className="glass-button"
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                              {transaction.status === "Completed" && (
                                <DropdownMenuItem
                                  className="text-red-600 glass-button-destructive"
                                  onClick={() => handleBillingAction("refund", transaction.id, transaction)}
                                >
                                  Process Refund
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Manage user subscriptions and billing cycles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>{subscription.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{subscription.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>{subscription.plan}</TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell>
                          {subscription.nextBilling ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{subscription.nextBilling}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${subscription.amount}</div>
                          <div className="text-sm text-muted-foreground">{subscription.currency}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {subscription.status === "Payment Failed" && (
                                <DropdownMenuItem onClick={() => handleBillingAction("retry")} className="glass-button">
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Retry Payment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-red-600 glass-button-destructive"
                                onClick={() => handleBillingAction("cancel")}
                              >
                                Cancel Subscription
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
        </TabsContent>

        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund History</CardTitle>
              <CardDescription>All processed and pending refunds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Refund ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Processed By</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundHistory.map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-mono text-sm">{refund.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>{refund.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{refund.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${refund.amount}</div>
                          <div className="text-sm text-muted-foreground">{refund.currency}</div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm truncate">{refund.reason}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(refund.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {refund.processedBy}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {refund.processedAt}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                              </DropdownMenuItem>
                              {refund.status === "Processing" && (
                                <DropdownMenuItem className="text-red-600 glass-button-destructive">
                                  Cancel Refund
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertCircle className="h-4 w-4" />
                Critical Billing Issues
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-300">
                Issues requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-red-900 rounded-lg">
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">nftcollector - Payment Failed</p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Premium Annual subscription - Insufficient funds
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-400">Access expires in 2 days</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBillingAction("retry")}
                    className="glass-button"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                  <Button size="sm" variant="outline" className="glass-button">
                    Contact User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <DollarSign className="h-4 w-4" />
                Pending Refund Requests
              </CardTitle>
              <CardDescription className="text-orange-600 dark:text-orange-300">
                User-initiated refund requests awaiting review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-orange-900 rounded-lg">
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-200">cryptotrader99 - Refund Request</p>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Premium Monthly ($29.99) - "Course content not as advertised"
                  </p>
                  <p className="text-xs text-orange-500 dark:text-orange-400">Requested 2 hours ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass-button">
                    Review Request
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const mockTransaction = transactions.find((t) => t.user === "cryptotrader99") || transactions[0]
                      handleBillingAction("refund", mockTransaction.id, mockTransaction)
                    }}
                    className="glass-button-destructive"
                  >
                    Process Refund
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-orange-900 rounded-lg">
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-200">solanadev - Refund Request</p>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    Premium Annual ($99.99) - "Accidental duplicate purchase"
                  </p>
                  <p className="text-xs text-orange-500 dark:text-orange-400">Requested 1 day ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass-button">
                    Review Request
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const mockTransaction = transactions.find((t) => t.amount === 99.99) || transactions[1]
                      handleBillingAction("refund", mockTransaction.id, mockTransaction)
                    }}
                    className="glass-button-destructive"
                  >
                    Process Refund
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle>Invoice Details</DialogTitle>
                <DialogDescription>Transaction ID: {selectedTransaction.id}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Customer</Label>
                    <div className="mt-1">
                      <p className="font-medium">{selectedTransaction.user}</p>
                      <p className="text-sm text-muted-foreground">{selectedTransaction.email}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Payment Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedTransaction.plan}</p>
                      <p className="text-sm text-muted-foreground">Subscription Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${selectedTransaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{selectedTransaction.currency}</p>
                    </div>
                  </div>
                </div>

                {selectedTransaction.transactionHash && (
                  <div>
                    <Label className="text-sm font-medium">Transaction Hash</Label>
                    <div className="mt-1 font-mono text-xs bg-muted p-2 rounded">
                      {selectedTransaction.transactionHash}
                    </div>
                  </div>
                )}

                {selectedTransaction.failureReason && (
                  <div>
                    <Label className="text-sm font-medium">Failure Reason</Label>
                    <div className="mt-1 text-sm text-red-600">{selectedTransaction.failureReason}</div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" className="glass-button">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={() => setSelectedTransaction(null)} className="glass-button">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Processing Dialog */}
      <Dialog open={refundDialog} onOpenChange={setRefundDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-red-500" />
              Process Refund
            </DialogTitle>
            <DialogDescription>Process a refund for transaction {refundTransaction?.id}</DialogDescription>
          </DialogHeader>

          {refundTransaction && (
            <div className="space-y-6">
              {/* Transaction Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Transaction Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Customer</Label>
                      <div className="mt-1">
                        <p className="font-medium">{refundTransaction.user}</p>
                        <p className="text-sm text-muted-foreground">{refundTransaction.email}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mt-1">
                        <p className="font-medium">{refundTransaction.user}</p>
                        <p className="text-sm text-muted-foreground">{refundTransaction.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Original Amount</Label>
                      <div className="mt-1">
                        <p className="font-medium">
                          ${refundTransaction.amount} {refundTransaction.currency}
                        </p>
                        <p className="text-sm text-muted-foreground">{refundTransaction.plan}</p>
                      </div>
                    </div>
                  </div>

                  {refundTransaction.transactionHash && (
                    <div>
                      <Label className="text-sm font-medium">Transaction Hash</Label>
                      <div className="mt-1 font-mono text-xs bg-muted p-2 rounded break-all">
                        {refundTransaction.transactionHash}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Refund Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Refund Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="refund-amount">Refund Amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="refund-amount"
                          type="number"
                          value={refundAmount}
                          onChange={(e) => setRefundAmount(e.target.value)}
                          className="pl-8"
                          max={refundTransaction.amount}
                          step="0.01"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Maximum: ${refundTransaction.amount}</p>
                    </div>
                    <div>
                      <Label>Refund Method</Label>
                      <Select defaultValue="original">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Original Payment Method</SelectItem>
                          <SelectItem value="wallet">Solana Wallet</SelectItem>
                          <SelectItem value="manual">Manual Process</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="refund-reason">Reason for Refund</Label>
                    <Textarea
                      id="refund-reason"
                      placeholder="Enter the reason for this refund..."
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Refund Impact Warning */}
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Refund Impact</h4>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                          <li>• User's subscription will be cancelled immediately</li>
                          <li>• Access to premium features will be revoked</li>
                          <li>• Refund will be processed within 3-5 business days</li>
                          <li>• User will receive an email notification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Refund Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
                      </div>
                      <span className="text-sm">Validate refund eligibility and amount</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">2</span>
                      </div>
                      <span className="text-sm">Process blockchain transaction reversal</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">3</span>
                      </div>
                      <span className="text-sm">Update user subscription status</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">4</span>
                      </div>
                      <span className="text-sm">Send confirmation email to user</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setRefundDialog(false)}
              disabled={isProcessingRefund}
              className="glass-button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={processRefund}
              disabled={!refundAmount || !refundReason || isProcessingRefund}
              className="glass-button-destructive"
            >
              {isProcessingRefund ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing Refund...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Process Refund ${refundAmount}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
