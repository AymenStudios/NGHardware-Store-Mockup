"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data"

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    setOrders(savedOrders)
    setCustomers(savedUsers)
  }, [])

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const totalCustomers = customers.length

  // Top selling products
  const productSales = products.map((product) => ({
    ...product,
    totalSold: orders.reduce((sum, order) => {
      const orderItem = order.items.find((item: any) => item.id === product.id)
      return sum + (orderItem ? orderItem.quantity : 0)
    }, 0),
    revenue: orders.reduce((sum, order) => {
      const orderItem = order.items.find((item: any) => item.id === product.id)
      return sum + (orderItem ? orderItem.quantity * orderItem.price : 0)
    }, 0),
  }))

  const topProducts = productSales.sort((a, b) => b.totalSold - a.totalSold).slice(0, 10)

  // Category performance
  const categoryStats = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { count: 0, revenue: 0 }
      }
      acc[product.category].count++

      const productRevenue = orders.reduce((sum, order) => {
        const orderItem = order.items.find((item: any) => item.id === product.id)
        return sum + (orderItem ? orderItem.quantity * orderItem.price : 0)
      }, 0)

      acc[product.category].revenue += productRevenue
      return acc
    },
    {} as Record<string, { count: number; revenue: number }>,
  )

  // Recent activity
  const recentActivity = orders
    .slice(-20)
    .reverse()
    .map((order) => ({
      type: "order",
      message: `New order ${order.id} from ${order.customer.firstName}`,
      amount: order.total,
      time: new Date(order.date).toLocaleString(),
    }))

  const stats = [
    {
      title: "Total Revenue",
      value: `${totalRevenue.toLocaleString()} DA`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "Average Order Value",
      value: `${Math.round(averageOrderValue).toLocaleString()} DA`,
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Total Customers",
      value: totalCustomers.toString(),
      change: "-2.4%",
      trend: "down",
      icon: Users,
      description: "vs last month",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Analytics & Reports</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{product.totalSold} sold</p>
                      <p className="text-xs text-gray-600">{product.revenue.toLocaleString()} DA</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryStats)
                  .sort(([, a], [, b]) => b.revenue - a.revenue)
                  .map(([category, stats]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm capitalize">{category}</p>
                        <p className="text-xs text-gray-600">{stats.count} products</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{stats.revenue.toLocaleString()} DA</p>
                        <p className="text-xs text-gray-600">
                          {totalRevenue > 0 ? ((stats.revenue / totalRevenue) * 100).toFixed(1) : 0}% of total
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sales Trends */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sales chart would be displayed here</p>
                  <p className="text-sm text-gray-500">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {recentActivity.slice(0, 10).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-600">{activity.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.amount.toLocaleString()} DA
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Product Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Category</th>
                    <th className="text-right py-2">Units Sold</th>
                    <th className="text-right py-2">Revenue</th>
                    <th className="text-right py-2">Avg. Price</th>
                    <th className="text-right py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-2">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-600">ID: {product.id}</p>
                        </div>
                      </td>
                      <td className="py-2">{product.category}</td>
                      <td className="text-right py-2">{product.totalSold}</td>
                      <td className="text-right py-2">{product.revenue.toLocaleString()} DA</td>
                      <td className="text-right py-2">{product.price.toLocaleString()} DA</td>
                      <td className="text-right py-2">
                        <span className={`${(product.stock || 0) < 10 ? "text-red-600" : "text-gray-900"}`}>
                          {product.stock || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
