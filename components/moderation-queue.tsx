"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Search,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Flag,
  MessageSquare,
  ImageIcon,
  Video,
} from "lucide-react"
import { toast } from "sonner"

const reports = [
  {
    id: "1",
    type: "Post",
    content:
      "This is a sample post that has been reported for inappropriate content. The post contains language that violates community guidelines...",
    reporter: "user123",
    reportedUser: "cryptodev",
    reason: "Inappropriate Content",
    severity: "High",
    status: "Pending",
    createdAt: "2024-12-15 10:30 AM",
    contentId: "post_123",
  },
  {
    id: "2",
    type: "Comment",
    content:
      "This comment contains spam links and promotional content that is not allowed in our community discussions.",
    reporter: "moderator1",
    reportedUser: "spammer99",
    reason: "Spam",
    severity: "Medium",
    status: "Pending",
    createdAt: "2024-12-15 09:15 AM",
    contentId: "comment_456",
  },
  {
    id: "3",
    type: "Post",
    content:
      "A post that was reported for harassment but has been reviewed and found to be within community guidelines.",
    reporter: "user456",
    reportedUser: "nftcollector",
    reason: "Harassment",
    severity: "Low",
    status: "Resolved",
    createdAt: "2024-12-14 03:45 PM",
    contentId: "post_789",
  },
  {
    id: "4",
    type: "Image",
    content:
      "Image content reported for copyright violation. Contains copyrighted material without proper attribution.",
    reporter: "copyright_bot",
    reportedUser: "artsharer",
    reason: "Copyright",
    severity: "High",
    status: "Under Review",
    createdAt: "2024-12-14 11:20 AM",
    contentId: "image_321",
  },
]

export function ModerationQueue() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [severityFilter, setSeverityFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedReport, setSelectedReport] = React.useState<(typeof reports)[0] | null>(null)

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type.toLowerCase() === typeFilter
    const matchesSeverity = severityFilter === "all" || report.severity.toLowerCase() === severityFilter
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase().replace(" ", "") === statusFilter

    return matchesSearch && matchesType && matchesSeverity && matchesStatus
  })

  const handleModerationAction = (action: string, reportId: string) => {
    switch (action) {
      case "delete":
        toast.success("Content deleted and user warned")
        break
      case "warn":
        toast.success("Warning sent to user")
        break
      case "ban":
        toast.success("User banned and content removed")
        break
      case "resolve":
        toast.success("Report resolved - no action taken")
        break
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Pending</Badge>
      case "under review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Under Review</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getContentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "post":
        return <MessageSquare className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const pendingCount = reports.filter((r) => r.status === "Pending").length
  const underReviewCount = reports.filter((r) => r.status === "Under Review").length
  const highSeverityCount = reports.filter((r) => r.severity === "High").length

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moderation Queue</h1>
          <p className="text-muted-foreground">Review and moderate reported content</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">Currently being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <Flag className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highSeverityCount}</div>
            <p className="text-xs text-muted-foreground">Critical issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by content, user, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="comment">Comments</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="underreview">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <CardDescription>Review reported content and take appropriate action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="max-w-xs">
                      <div className="flex items-start gap-2">
                        {getContentIcon(report.type)}
                        <div>
                          <p className="text-sm line-clamp-2">{report.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">Reported by: {report.reporter}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback className="text-xs">
                            {report.reportedUser.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{report.reportedUser}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {report.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 glass-button">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedReport(report)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleModerationAction("resolve", report.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Resolve (No Action)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleModerationAction("warn", report.id)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Warn User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleModerationAction("delete", report.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Content
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleModerationAction("ban", report.id)}
                          >
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

      {/* Report Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getContentIcon(selectedReport.type)}
                  Report Details - {selectedReport.type}
                  {getSeverityBadge(selectedReport.severity)}
                </DialogTitle>
                <DialogDescription>
                  Review the reported content and take appropriate moderation action
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Report Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Report Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Reported User:</Label>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback className="text-xs">
                              {selectedReport.reportedUser.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{selectedReport.reportedUser}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Label>Reporter:</Label>
                        <span className="text-sm">{selectedReport.reporter}</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Reason:</Label>
                        <span className="text-sm">{selectedReport.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Date:</Label>
                        <span className="text-sm">{selectedReport.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Status:</Label>
                        {getStatusBadge(selectedReport.status)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Content Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{selectedReport.content}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">Content ID: {selectedReport.contentId}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Moderation Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Moderation Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="action-notes">Action Notes (Optional)</Label>
                        <Textarea
                          id="action-notes"
                          placeholder="Add notes about your moderation decision..."
                          className="mt-2"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleModerationAction("resolve", selectedReport.id)}
                          className="glass-button"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Resolve (No Action)
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleModerationAction("warn", selectedReport.id)}
                          className="glass-button"
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Send Warning
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleModerationAction("delete", selectedReport.id)}
                          className="glass-button"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Content
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleModerationAction("ban", selectedReport.id)}
                          className="glass-button-destructive"
                        >
                          Ban User
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
