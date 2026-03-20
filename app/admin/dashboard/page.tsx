'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ClipboardList,
  Pizza,
  Wine,
  LogOut,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  ChefHat,
  RefreshCw,
  DollarSign,
} from 'lucide-react'
import { useAdmin } from '@/components/admin-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { OrdersTab } from '@/components/admin/orders-tab'
import { PizzasTab } from '@/components/admin/pizzas-tab'
import { DrinksTab } from '@/components/admin/drinks-tab'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, logout, orders, pizzas, drinks, loading, refreshData } = useAdmin()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/admin')
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted || !isAuthenticated) {
    return null
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const preparingOrders = orders.filter((o) => o.status === 'preparing').length
  const deliveringOrders = orders.filter((o) => o.status === 'delivering').length
  const totalRevenue = orders.filter((o) => o.status === 'delivered').reduce((acc, o) => acc + o.total, 0)

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Sapore Artesanal"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="font-serif font-bold text-foreground text-lg">
                  Painel Administrativo
                </h1>
                <p className="text-xs text-muted-foreground">Sapore Artesanal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => refreshData()}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{preparingOrders}</p>
                  <p className="text-xs text-muted-foreground">Preparando</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{deliveringOrders}</p>
                  <p className="text-xs text-muted-foreground">Entregando</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">Total Pedidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Card */}
        <Card className="border-border mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Receita Total (Entregues)</p>
                  <p className="text-3xl font-bold text-green-600">
                    R$ {totalRevenue.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="orders" className="gap-2 data-[state=active]:bg-background">
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Pedidos</span>
              {pendingOrders > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {pendingOrders}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pizzas" className="gap-2 data-[state=active]:bg-background">
              <Pizza className="w-4 h-4" />
              <span className="hidden sm:inline">Pizzas</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {pizzas.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="drinks" className="gap-2 data-[state=active]:bg-background">
              <Wine className="w-4 h-4" />
              <span className="hidden sm:inline">Bebidas</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {drinks.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="pizzas">
            <PizzasTab />
          </TabsContent>

          <TabsContent value="drinks">
            <DrinksTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
