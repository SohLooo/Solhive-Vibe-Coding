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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  Shield,
  Bell,
  Mail,
  Database,
  Key,
  Globe,
  DollarSign,
  Users,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "john@sol3hive.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-12-15 10:30 AM",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Sarah Moderator",
    email: "sarah@sol3hive.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "2024-12-15 09:15 AM",
    permissions: ["moderation", "users"],
  },
  {
    id: "3",
    name: "Mike Support",
    email: "mike@sol3hive.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2024-12-10 02:45 PM",
    permissions: ["users", "billing"],
  },
]

const apiKeys = [
  {
    id: "1",
    name: "Production API",
    key: "sk_live_51H7...",
    created: "2024-01-15",
    lastUsed: "2024-12-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Development API",
    key: "sk_test_51H7...",
    created: "2024-02-20",
    lastUsed: "2024-12-14",
    status: "Active",
  },
  {
    id: "3",
    name: "Analytics API",
    key: "sk_analytics_51H7...",
    created: "2024-03-10",
    lastUsed: "2024-12-10",
    status: "Inactive",
  },
]

export function AdminSettings() {
  const [settings, setSettings] = React.useState({
    // Platform Settings
    platformName: "Sol3hive",
    platformDescription: "Web3 Learning Platform on Solana",
    maintenanceMode: false,
    registrationEnabled: true,

    // Security Settings
    twoFactorRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    moderationAlerts: true,
    billingAlerts: true,

    // Payment Settings
    stripeEnabled: true,
    solanaPayEnabled: true,
    minimumPayment: 1.0,
    refundWindow: 30,

    // Content Settings
    autoModeration: true,
    contentApprovalRequired: false,
    maxFileSize: 10,
    allowedFileTypes: "jpg,png,gif,pdf,mp4",

    // Email Settings
    smtpHost: "smtp.sol3hive.com",
    smtpPort: 587,
    smtpUsername: "noreply@sol3hive.com",
    smtpPassword: "••••••••",
  })

  const [showApiKey, setShowApiKey] = React.useState<string | null>(null)
  const [newAdminDialog, setNewAdminDialog] = React.useState(false)
  const [newApiKeyDialog, setNewApiKeyDialog] = React.useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    toast.success("Settings saved successfully")
  }

  const exportSettings = () => {
    toast.success("Settings exported successfully")
  }

  const importSettings = () => {
    toast.success("Settings imported successfully")
  }

  const testEmailSettings = () => {
    toast.success("Test email sent successfully")
  }

  const generateApiKey = () => {
    toast.success("New API key generated")
    setNewApiKeyDialog(false)
  }

  const revokeApiKey = (keyId: string) => {
    toast.success("API key revoked")
  }

  const addAdminUser = () => {
    toast.success("Admin user added successfully")
    setNewAdminDialog(false)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Super Admin</Badge>
      case "Moderator":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Moderator</Badge>
      case "Support":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Support</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Inactive</Badge>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage platform configuration and admin preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSettings} className="glass-button">
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button variant="outline" onClick={importSettings} className="glass-button">
            <Upload className="mr-2 h-4 w-4" />
            Import Settings
          </Button>
          <Button onClick={saveSettings} className="glass-button-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
          <TabsTrigger value="api">API & Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Platform Settings
                </CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    value={settings.platformName}
                    onChange={(e) => handleSettingChange("platformName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    value={settings.platformDescription}
                    onChange={(e) => handleSettingChange("platformDescription", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new user signups</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Content Settings
                </CardTitle>
                <CardDescription>Content moderation and upload settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Moderation</Label>
                    <p className="text-sm text-muted-foreground">Automatically flag inappropriate content</p>
                  </div>
                  <Switch
                    checked={settings.autoModeration}
                    onCheckedChange={(checked) => handleSettingChange("autoModeration", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Content Approval Required</Label>
                    <p className="text-sm text-muted-foreground">Require admin approval for new posts</p>
                  </div>
                  <Switch
                    checked={settings.contentApprovalRequired}
                    onCheckedChange={(checked) => handleSettingChange("contentApprovalRequired", checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                  <Input
                    id="max-file-size"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange("maxFileSize", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="allowed-file-types">Allowed File Types</Label>
                  <Input
                    id="allowed-file-types"
                    value={settings.allowedFileTypes}
                    onChange={(e) => handleSettingChange("allowedFileTypes", e.target.value)}
                    placeholder="jpg,png,gif,pdf,mp4"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Configuration
              </CardTitle>
              <CardDescription>SMTP settings for outgoing emails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={settings.smtpHost}
                    onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleSettingChange("smtpPort", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    value={settings.smtpUsername}
                    onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={testEmailSettings} className="glass-button">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Authentication Settings
                </CardTitle>
                <CardDescription>Security and authentication configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication Required</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorRequired}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorRequired", checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data & Privacy
                </CardTitle>
                <CardDescription>Data retention and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Data Retention Period</Label>
                  <Select defaultValue="365">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cookie Consent</Label>
                  <Select defaultValue="required">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Analytics Tracking</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="anonymized">Anonymized Only</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure admin notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">General Notifications</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Alert Types</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Moderation Alerts</Label>
                      <p className="text-sm text-muted-foreground">New reports and flagged content</p>
                    </div>
                    <Switch
                      checked={settings.moderationAlerts}
                      onCheckedChange={(checked) => handleSettingChange("moderationAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Billing Alerts</Label>
                      <p className="text-sm text-muted-foreground">Payment failures and refunds</p>
                    </div>
                    <Switch
                      checked={settings.billingAlerts}
                      onCheckedChange={(checked) => handleSettingChange("billingAlerts", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Notification Schedule</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Daily Summary</Label>
                    <Select defaultValue="09:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Weekly Report</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Monthly Report</Label>
                    <Select defaultValue="first">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="first">1st of month</SelectItem>
                        <SelectItem value="last">Last day of month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Configure accepted payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Stripe Payments</Label>
                    <p className="text-sm text-muted-foreground">Credit card payments via Stripe</p>
                  </div>
                  <Switch
                    checked={settings.stripeEnabled}
                    onCheckedChange={(checked) => handleSettingChange("stripeEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Solana Pay</Label>
                    <p className="text-sm text-muted-foreground">USDC payments on Solana</p>
                  </div>
                  <Switch
                    checked={settings.solanaPayEnabled}
                    onCheckedChange={(checked) => handleSettingChange("solanaPayEnabled", checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="minimum-payment">Minimum Payment Amount ($)</Label>
                  <Input
                    id="minimum-payment"
                    type="number"
                    step="0.01"
                    value={settings.minimumPayment}
                    onChange={(e) => handleSettingChange("minimumPayment", Number.parseFloat(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refund Settings
                </CardTitle>
                <CardDescription>Refund policies and automation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="refund-window">Refund Window (days)</Label>
                  <Input
                    id="refund-window"
                    type="number"
                    value={settings.refundWindow}
                    onChange={(e) => handleSettingChange("refundWindow", Number.parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Number of days users can request refunds</p>
                </div>
                <div>
                  <Label>Auto-Refund Threshold</Label>
                  <Select defaultValue="disabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="10">$10 and under</SelectItem>
                      <SelectItem value="25">$25 and under</SelectItem>
                      <SelectItem value="50">$50 and under</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">Automatically approve refunds under this amount</p>
                </div>
                <div>
                  <Label>Refund Approval Required</Label>
                  <Select defaultValue="always">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always</SelectItem>
                      <SelectItem value="over-threshold">Over threshold only</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin Users
              </CardTitle>
              <CardDescription>Manage admin accounts and permissions</CardDescription>
              <div className="flex justify-end">
                <Dialog open={newAdminDialog} onOpenChange={setNewAdminDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Admin User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Admin User</DialogTitle>
                      <DialogDescription>Create a new admin account with specific permissions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="admin-name">Full Name</Label>
                          <Input id="admin-name" placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="admin-email">Email Address</Label>
                          <Input id="admin-email" type="email" placeholder="john@sol3hive.com" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="admin-role">Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="super-admin">Super Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-users" />
                            <Label htmlFor="perm-users">User Management</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-moderation" />
                            <Label htmlFor="perm-moderation">Content Moderation</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-billing" />
                            <Label htmlFor="perm-billing">Billing & Payments</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-analytics" />
                            <Label htmlFor="perm-analytics">Analytics</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-settings" />
                            <Label htmlFor="perm-settings">Settings</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setNewAdminDialog(false)} className="glass-button">
                        Cancel
                      </Button>
                      <Button onClick={addAdminUser} className="glass-button-primary">
                        Add Admin User
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                      <TableHead className="hidden lg:table-cell">Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>
                                {admin.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{admin.name}</div>
                              <div className="text-sm text-muted-foreground">{admin.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(admin.role)}</TableCell>
                        <TableCell>{getStatusBadge(admin.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {admin.lastLogin}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex gap-1">
                            {admin.permissions.includes("all") ? (
                              <Badge variant="outline">All Permissions</Badge>
                            ) : (
                              admin.permissions.slice(0, 2).map((perm) => (
                                <Badge key={perm} variant="outline" className="text-xs">
                                  {perm}
                                </Badge>
                              ))
                            )}
                            {admin.permissions.length > 2 && !admin.permissions.includes("all") && (
                              <Badge variant="outline" className="text-xs">
                                +{admin.permissions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" className="glass-button">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {admin.role !== "Super Admin" && (
                              <Button variant="ghost" size="sm" className="text-red-600 glass-button-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API keys for external integrations</CardDescription>
              <div className="flex justify-end">
                <Dialog open={newApiKeyDialog} onOpenChange={setNewApiKeyDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Generate API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate New API Key</DialogTitle>
                      <DialogDescription>Create a new API key for external integrations</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="api-name">API Key Name</Label>
                        <Input id="api-name" placeholder="Production API" />
                      </div>
                      <div>
                        <Label htmlFor="api-description">Description</Label>
                        <Textarea id="api-description" placeholder="Describe the purpose of this API key..." rows={3} />
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="api-read" />
                            <Label htmlFor="api-read">Read Access</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="api-write" />
                            <Label htmlFor="api-write">Write Access</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="api-admin" />
                            <Label htmlFor="api-admin">Admin Access</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setNewApiKeyDialog(false)} className="glass-button">
                        Cancel
                      </Button>
                      <Button onClick={generateApiKey} className="glass-button-primary">
                        Generate Key
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>API Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Created</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Used</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-sm">
                              {showApiKey === apiKey.id ? apiKey.key : "••••••••••••••••"}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowApiKey(showApiKey === apiKey.id ? null : apiKey.id)}
                            >
                              {showApiKey === apiKey.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {apiKey.created}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {apiKey.lastUsed}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" className="glass-button">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 glass-button-destructive"
                              onClick={() => revokeApiKey(apiKey.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Integration guides and API reference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">REST API</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete REST API for user management, content, and billing
                  </p>
                  <Button variant="outline" size="sm" className="glass-button">
                    View Docs
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Webhooks</h4>
                  <p className="text-sm text-muted-foreground mb-3">Real-time notifications for events and updates</p>
                  <Button variant="outline" size="sm" className="glass-button">
                    Configure
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">SDKs</h4>
                  <p className="text-sm text-muted-foreground mb-3">Official SDKs for JavaScript, Python, and more</p>
                  <Button variant="outline" size="sm" className="glass-button">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
