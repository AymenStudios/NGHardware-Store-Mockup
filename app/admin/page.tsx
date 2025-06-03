"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  AlertTriangle,
  Download,
  Bell,
  Moon,
  Sun,
  Maximize2,
  RefreshCw,
  Calendar,
  Target,
  Activity,
  Zap,
  Shield,
  Database,
  Mail,
  FileText,
  BarChart,
  PieChart,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/data"

export default function EnhancedAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [orders, setOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [adminProducts, setAdminProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    status: "all",
    dateRange: "all",
  })

  useEffect(() => {
    // Load data from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const savedNotifications = JSON.parse(localStorage.getItem("admin_notifications") || "[]")

    setOrders(savedOrders)
    setCustomers(savedUsers)
    setNotifications(savedNotifications)

    // Generate sample notifications if none exist
    if (savedNotifications.length === 0) {
      const sampleNotifications = [
        {
          id: 1,
          type: "order",
          title: "New Order Received",
          message: "Order #ORD-001 has been placed",
          time: new Date().toISOString(),
          read: false,
          priority: "high",
        },
        {
          id: 2,
          type: "stock",
          title: "Low Stock Alert",
          message: "Gaming Laptop RTX 4070 is running low (5 left)",
          time: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          priority: "medium",
        },
        {
          id: 3,
          type: "customer",
          title: "New Customer Registration",
          message: "Ahmed Benali has created an account",
          time: new Date(Date.now() - 7200000).toISOString(),
          read: true,
          priority: "low",
        },
      ]
      setNotifications(sampleNotifications)
      localStorage.setItem("admin_notifications", JSON.stringify(sampleNotifications))
    }

    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      setLastRefresh(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Enhanced analytics calculations
  const analytics = {
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    totalProducts: adminProducts.length,
    totalCustomers: customers.length,
    lowStockProducts: adminProducts.filter((p) => (p.stock || 0) < 10),
    outOfStockProducts: adminProducts.filter((p) => !p.inStock),
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
    conversionRate: 3.2,
    customerRetentionRate: 68.5,
    topSellingCategory: "Hardware",
    monthlyGrowth: 12.5,
    dailyOrders: orders.filter((order) => {
      const orderDate = new Date(order.date)
      const today = new Date()
      return orderDate.toDateString() === today.toDateString()
    }).length,
    weeklyRevenue: orders
      .filter((order) => {
        const orderDate = new Date(order.date)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        return orderDate >= weekAgo
      })
      .reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    processingOrders: orders.filter((order) => order.status === "processing").length,
    shippedOrders: orders.filter((order) => order.status === "shipped").length,
    completedOrders: orders.filter((order) => order.status === "completed" || order.status === "confirmed").length,
  }

  const enhancedStats = [
    {
      title: "Total Revenue",
      value: `${analytics.totalRevenue.toLocaleString()} DA`,
      change: `+${analytics.monthlyGrowth}%`,
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "vs last month",
      target: 3000000,
      current: analytics.totalRevenue,
    },
    {
      title: "Orders Today",
      value: analytics.dailyOrders.toString(),
      change: "+23%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "vs yesterday",
      target: 50,
      current: analytics.dailyOrders,
    },
    {
      title: "Active Products",
      value: analytics.totalProducts.toString(),
      change: "+5%",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "vs last week",
      target: 500,
      current: analytics.totalProducts,
    },
    {
      title: "Customer Growth",
      value: analytics.totalCustomers.toString(),
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "vs last month",
      target: 5000,
      current: analytics.totalCustomers,
    },
    {
      title: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      change: "+0.3%",
      trend: "up",
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      description: "vs last week",
      target: 5,
      current: analytics.conversionRate,
    },
    {
      title: "Avg Order Value",
      value: `${Math.round(analytics.averageOrderValue).toLocaleString()} DA`,
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      description: "vs last month",
      target: 100000,
      current: analytics.averageOrderValue,
    },
  ]

  const recentOrders = orders.slice(-10).reverse()
  const topProducts = adminProducts.sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 5)
  const unreadNotifications = notifications.filter((n) => !n.read).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "out_of_stock":
        return "bg-red-100 text-red-700 border-red-200"
      case "cancelled":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setAdminProducts((prev) => prev.filter((p) => p.id !== productId))

      // Add notification
      const newNotification = {
        id: Date.now(),
        type: "product",
        title: "Product Deleted",
        message: `Product ID ${productId} has been deleted`,
        time: new Date().toISOString(),
        read: false,
        priority: "medium",
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    // Add notification
    const newNotification = {
      id: Date.now(),
      type: "order",
      title: "Order Status Updated",
      message: `Order ${orderId} status changed to ${newStatus}`,
      time: new Date().toISOString(),
      read: false,
      priority: "low",
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markNotificationAsRead = (notificationId: number) => {
    const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)
    localStorage.setItem("admin_notifications", JSON.stringify(updatedNotifications))
  }

  const exportData = (type: string) => {
    let data: any[] = []
    let filename = ""

    switch (type) {
      case "orders":
        data = orders
        filename = `orders_${new Date().toISOString().split("T")[0]}.json`
        break
      case "products":
        data = adminProducts
        filename = `products_${new Date().toISOString().split("T")[0]}.json`
        break
      case "customers":
        data = customers
        filename = `customers_${new Date().toISOString().split("T")[0]}.json`
        break
      case "analytics":
        data = [analytics]
        filename = `analytics_${new Date().toISOString().split("T")[0]}.json`
        break
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const refreshData = () => {
    setLastRefresh(new Date())
    // In a real app, this would fetch fresh data from the API
    console.log("Refreshing data...")
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Enhanced Header */}
      <header
        className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b sticky top-0 z-50 backdrop-blur-md bg-opacity-95`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NG</span>
                </div>
                <div>
                  <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    NGHardware Admin
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Period Selector */}
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Today</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={refreshData} title="Refresh Data">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={toggleFullscreen} title="Toggle Fullscreen">
                  <Maximize2 className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                      <p className="text-sm text-gray-600">{unreadNotifications} unread</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <p className="text-xs text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.time).toLocaleString()}
                              </p>
                            </div>
                            <Badge className={getPriorityColor(notification.priority)} variant="outline">
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/admin/products/new">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside
          className={`w-64 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r min-h-screen`}
        >
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                  <Badge className="ml-auto" variant="secondary">
                    Live
                  </Badge>
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                  <Badge className="ml-auto" variant="secondary">
                    Pro
                  </Badge>
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("products")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Products
                  <Badge className="ml-auto" variant="outline">
                    {analytics.totalProducts}
                  </Badge>
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Orders
                  <Badge className="ml-auto" variant="outline">
                    {analytics.pendingOrders}
                  </Badge>
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "customers" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("customers")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Customers
                  <Badge className="ml-auto" variant="outline">
                    {analytics.totalCustomers}
                  </Badge>
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "inventory" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("inventory")}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Inventory
                  {analytics.lowStockProducts.length > 0 && (
                    <Badge className="ml-auto bg-red-500">{analytics.lowStockProducts.length}</Badge>
                  )}
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "reports" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("reports")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </li>
            </ul>

            <Separator className="my-6" />

            {/* Quick Stats */}
            <div className="space-y-3">
              <h4 className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Today's Sales</span>
                  <span className="font-medium">{analytics.dailyOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Processing</span>
                  <span className="font-medium">{analytics.processingOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Low Stock</span>
                  <span className="font-medium text-red-600">{analytics.lowStockProducts.length}</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enhancedStats.map((stat, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                          <span className="text-gray-500">{stat.description}</span>
                        </div>
                      </div>
                      {stat.target && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress to target</span>
                            <span>{Math.round((stat.current / stat.target) * 100)}%</span>
                          </div>
                          <Progress value={(stat.current / stat.target) * 100} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Critical Alerts */}
              {(analytics.lowStockProducts.length > 0 || analytics.pendingOrders > 5) && (
                <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Critical Alerts</span>
                      <Badge className="bg-red-500">
                        {analytics.lowStockProducts.length + (analytics.pendingOrders > 5 ? 1 : 0)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analytics.lowStockProducts.length > 0 && (
                      <div className="p-3 bg-white rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-orange-800">Low Stock Products</h4>
                          <Badge variant="outline" className="text-orange-700 border-orange-300">
                            {analytics.lowStockProducts.length} items
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {analytics.lowStockProducts.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                              <span>{product.name}</span>
                              <Badge variant="outline" className="text-red-700 border-red-300">
                                {product.stock || 0} left
                              </Badge>
                            </div>
                          ))}
                          {analytics.lowStockProducts.length > 3 && (
                            <p className="text-xs text-gray-600">+{analytics.lowStockProducts.length - 3} more items</p>
                          )}
                        </div>
                      </div>
                    )}

                    {analytics.pendingOrders > 5 && (
                      <div className="p-3 bg-white rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-orange-800">High Pending Orders</h4>
                          <Badge variant="outline" className="text-orange-700 border-orange-300">
                            {analytics.pendingOrders} pending
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          You have {analytics.pendingOrders} orders waiting for processing
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Enhanced Recent Orders */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => exportData("orders")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {order.customer.firstName} {order.customer.lastName}
                              </p>
                              <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.total.toLocaleString()} DA</p>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Top Products */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Top Performing Products</CardTitle>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span>{product.sales || 0} sold</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{product.price.toLocaleString()} DA</p>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-500">+12%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Order Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completed</span>
                      <span className="font-medium">{analytics.completedOrders}</span>
                    </div>
                    <Progress value={(analytics.completedOrders / analytics.totalOrders) * 100} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span>Processing</span>
                      <span className="font-medium">{analytics.processingOrders}</span>
                    </div>
                    <Progress value={(analytics.processingOrders / analytics.totalOrders) * 100} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span>Pending</span>
                      <span className="font-medium">{analytics.pendingOrders}</span>
                    </div>
                    <Progress value={(analytics.pendingOrders / analytics.totalOrders) * 100} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Inventory Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>In Stock</span>
                      <span className="font-medium text-green-600">
                        {analytics.totalProducts - analytics.outOfStockProducts.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Low Stock</span>
                      <span className="font-medium text-yellow-600">{analytics.lowStockProducts.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Out of Stock</span>
                      <span className="font-medium text-red-600">{analytics.outOfStockProducts.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Customer Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Retention Rate</span>
                      <span className="font-medium">{analytics.customerRetentionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Avg. Orders/Customer</span>
                      <span className="font-medium">
                        {analytics.totalCustomers > 0
                          ? (analytics.totalOrders / analytics.totalCustomers).toFixed(1)
                          : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>New This Month</span>
                      <span className="font-medium">+{Math.round(analytics.totalCustomers * 0.08)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>This Week</span>
                      <span className="font-medium">{analytics.weeklyRevenue.toLocaleString()} DA</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Avg. Daily</span>
                      <span className="font-medium">{Math.round(analytics.weeklyRevenue / 7).toLocaleString()} DA</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-medium text-green-600">+{analytics.monthlyGrowth}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Custom Range
                  </Button>
                  <Button variant="outline" onClick={() => exportData("analytics")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <LineChart className="h-5 w-5" />
                      <span>Revenue Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Revenue chart would be displayed here</p>
                        <p className="text-sm text-gray-500">Integration with Chart.js or similar needed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Sales by Category</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Category breakdown chart</p>
                        <p className="text-sm text-gray-500">Pie chart showing sales distribution</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics Tables */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Product</th>
                          <th className="text-left py-2">Category</th>
                          <th className="text-right py-2">Views</th>
                          <th className="text-right py-2">Conversion</th>
                          <th className="text-right py-2">Revenue</th>
                          <th className="text-right py-2">Profit Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="py-2">
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-gray-600">SKU: {product.id}</p>
                              </div>
                            </td>
                            <td className="py-2">{product.category}</td>
                            <td className="text-right py-2">{Math.round(Math.random() * 1000 + 100)}</td>
                            <td className="text-right py-2">{(Math.random() * 5 + 2).toFixed(1)}%</td>
                            <td className="text-right py-2">
                              {((product.sales || 0) * product.price).toLocaleString()} DA
                            </td>
                            <td className="text-right py-2">
                              <span className="text-green-600">{(Math.random() * 30 + 15).toFixed(1)}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedFilters.category}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" onClick={() => exportData("products")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Bulk Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Bulk Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export Selected
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Link href="/admin/products/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminProducts
                        .filter(
                          (product) =>
                            (selectedFilters.category === "all" ||
                              product.category.toLowerCase() === selectedFilters.category) &&
                            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.category.toLowerCase().includes(searchQuery.toLowerCase())),
                        )
                        .map((product) => (
                          <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell>
                              <input type="checkbox" className="rounded" />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">ID: {product.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{product.price.toLocaleString()} DA</p>
                                {product.originalPrice && (
                                  <p className="text-sm text-gray-500 line-through">
                                    {product.originalPrice.toLocaleString()} DA
                                  </p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`${(product.stock || 0) < 10 ? "text-red-600 font-medium" : "text-gray-900"}`}
                                >
                                  {product.stock || 0}
                                </span>
                                {(product.stock || 0) < 10 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{product.sales || 0}</p>
                                <p className="text-sm text-gray-600">
                                  {((product.sales || 0) * product.price).toLocaleString()} DA
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(product.inStock ? "active" : "out_of_stock")}>
                                {product.inStock ? "Active" : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-sm text-green-600">+{Math.round(Math.random() * 20 + 5)}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Product
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Product
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart className="h-4 w-4 mr-2" />
                                    View Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Product
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Auto Reorder
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Stock Report
                  </Button>
                </div>
              </div>

              {/* Inventory Alerts */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Critical Stock</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-900 mb-2">{analytics.outOfStockProducts.length}</div>
                    <p className="text-sm text-red-700">Products out of stock</p>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-yellow-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Low Stock</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-900 mb-2">{analytics.lowStockProducts.length}</div>
                    <p className="text-sm text-yellow-700">Products below threshold</p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <Shield className="h-5 w-5" />
                      <span>Healthy Stock</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-900 mb-2">
                      {analytics.totalProducts -
                        analytics.lowStockProducts.length -
                        analytics.outOfStockProducts.length}
                    </div>
                    <p className="text-sm text-green-700">Products in good stock</p>
                  </CardContent>
                </Card>
              </div>

              {/* Inventory Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Stock Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Restocked</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminProducts.map((product) => {
                        const reorderLevel = 10
                        const currentStock = product.stock || 0
                        const status = currentStock === 0 ? "out" : currentStock <= reorderLevel ? "low" : "good"

                        return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 rounded"></div>
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>SKU-{product.id}</TableCell>
                            <TableCell>
                              <span
                                className={`font-medium ${
                                  status === "out"
                                    ? "text-red-600"
                                    : status === "low"
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {currentStock}
                              </span>
                            </TableCell>
                            <TableCell>{reorderLevel}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  status === "out"
                                    ? "bg-red-100 text-red-700"
                                    : status === "low"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }
                              >
                                {status === "out" ? "Out of Stock" : status === "low" ? "Low Stock" : "In Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                Restock
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedFilters.status}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={() => exportData("orders")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Orders
                  </Button>

                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Bulk Email
                  </Button>
                </div>
              </div>

              {/* Order Stats */}
              <div className="grid lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.pendingOrders}</p>
                        <p className="text-sm text-gray-600">Pending Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.processingOrders}</p>
                        <p className="text-sm text-gray-600">Processing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.shippedOrders}</p>
                        <p className="text-sm text-gray-600">Shipped</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.completedOrders}</p>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders
                        .filter(
                          (order) =>
                            (selectedFilters.status === "all" || order.status === selectedFilters.status) &&
                            (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              order.customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              order.customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())),
                        )
                        .map((order) => (
                          <TableRow key={order.id} className="hover:bg-gray-50">
                            <TableCell>
                              <input type="checkbox" className="rounded" />
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/admin/orders/${order.id}`}
                                className="font-medium text-blue-600 hover:underline"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-medium">
                                    {order.customer.firstName.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {order.customer.firstName} {order.customer.lastName}
                                  </p>
                                  <p className="text-sm text-gray-600">{order.customer.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.items.length} items</p>
                                <p className="text-sm text-gray-600">
                                  {order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)} units
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">{order.total.toLocaleString()} DA</p>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="processing">Processing</SelectItem>
                                  <SelectItem value="shipped">Shipped</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">{new Date(order.date).toLocaleTimeString()}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-700">
                                {order.customer.paymentMethod === "card" ? "Card" : "Cash"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Newsletter
                  </Button>
                  <Button variant="outline" onClick={() => exportData("customers")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Customers
                  </Button>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.totalCustomers}</p>
                        <p className="text-sm text-gray-600">Total Customers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.round(analytics.totalCustomers * 0.08)}
                        </p>
                        <p className="text-sm text-gray-600">New This Month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{analytics.customerRetentionRate}%</p>
                        <p className="text-sm text-gray-600">Retention Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.round(analytics.averageOrderValue).toLocaleString()} DA
                        </p>
                        <p className="text-sm text-gray-600">Avg. Order Value</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers
                        .filter(
                          (customer) =>
                            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
                        )
                        .map((customer) => {
                          const customerOrders = orders.filter((order) => order.customer.email === customer.email)
                          const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0)
                          const lastOrder = customerOrders.sort(
                            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                          )[0]

                          return (
                            <TableRow key={customer.id} className="hover:bg-gray-50">
                              <TableCell>
                                <input type="checkbox" className="rounded" />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                      {customer.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-gray-600">ID: {customer.id}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="font-medium">{customer.email}</p>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{customerOrders.length}</p>
                                  <p className="text-sm text-gray-600">
                                    {customerOrders.reduce((sum, order) => sum + order.items.length, 0)} items
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="font-medium">{totalSpent.toLocaleString()} DA</p>
                              </TableCell>
                              <TableCell>
                                {lastOrder ? (
                                  <div>
                                    <p className="font-medium">{new Date(lastOrder.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">{lastOrder.total.toLocaleString()} DA</p>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">No orders</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    customerOrders.length > 5
                                      ? "bg-green-100 text-green-700"
                                      : customerOrders.length > 0
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {customerOrders.length > 5 ? "VIP" : customerOrders.length > 0 ? "Active" : "New"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <ShoppingCart className="h-4 w-4 mr-2" />
                                      View Orders
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail className="h-4 w-4 mr-2" />
                                      Send Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Customer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Revenue</span>
                      <span className="font-medium">{analytics.totalRevenue.toLocaleString()} DA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Orders</span>
                      <span className="font-medium">{analytics.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Order Value</span>
                      <span className="font-medium">{Math.round(analytics.averageOrderValue).toLocaleString()} DA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-medium text-green-600">+{analytics.monthlyGrowth}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Products</span>
                      <span className="font-medium">{analytics.totalProducts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Best Category</span>
                      <span className="font-medium">{analytics.topSellingCategory}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Low Stock Items</span>
                      <span className="font-medium text-yellow-600">{analytics.lowStockProducts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Out of Stock</span>
                      <span className="font-medium text-red-600">{analytics.outOfStockProducts.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Store Name</label>
                      <Input defaultValue="NGHardware" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Store Description</label>
                      <Input defaultValue="Your tech destination in Djelfa, Algeria" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact Email</label>
                      <Input defaultValue="info@nghardware.dz" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <Input defaultValue="+213 XX XX XX XX" className="mt-1" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-gray-600">Enable dark theme for admin panel</p>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive notifications for new orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto Refresh</h4>
                        <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Low Stock Alerts</h4>
                        <p className="text-sm text-gray-600">Get alerted when products are low</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
