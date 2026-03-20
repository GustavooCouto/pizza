'use client'

import { useState } from 'react'
import { Users, Phone, Mail, MapPin, ShoppingBag, DollarSign, Search } from 'lucide-react'
import { useAdmin } from '@/components/admin-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function CustomersTab() {
  const { customers, orders } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calcular estatisticas para cada cliente
  const customersWithStats = filteredCustomers.map((customer) => {
    const customerOrders = orders.filter(
      (order) => order.customer.phone === customer.phone
    )
    const totalSpent = customerOrders.reduce((acc, order) => acc + order.total, 0)
    const totalOrders = customerOrders.length
    const lastOrder = customerOrders.length > 0
      ? new Date(Math.max(...customerOrders.map(o => new Date(o.createdAt).getTime())))
      : null

    return {
      ...customer,
      totalSpent,
      totalOrders,
      lastOrder,
    }
  }).sort((a, b) => b.totalSpent - a.totalSpent)

  const formatDate = (date: Date | null) => {
    if (!date) return 'Nunca'
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  if (customers.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum cliente ainda
          </h3>
          <p className="text-muted-foreground text-sm">
            Os clientes aparecerao aqui apos o primeiro pedido.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, telefone ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filteredCustomers.length} cliente(s)
        </span>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{customers.length}</p>
                <p className="text-xs text-muted-foreground">Total Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  R$ {customersWithStats.reduce((acc, c) => acc + c.totalSpent, 0).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">Total em Vendas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {(customersWithStats.reduce((acc, c) => acc + c.totalSpent, 0) / Math.max(customers.length, 1)).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">Ticket Medio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {customersWithStats.filter(c => c.totalOrders > 1).length}
                </p>
                <p className="text-xs text-muted-foreground">Clientes Recorrentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers List */}
      <ScrollArea className="h-[calc(100vh-450px)]">
        <div className="space-y-3 pr-4">
          {customersWithStats.map((customer) => (
            <Card key={customer.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {customer.name || 'Cliente sem nome'}
                      </h3>
                      {customer.totalOrders > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          Recorrente
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                      )}
                      {customer.street && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {customer.street}, {customer.number} - {customer.neighborhood}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-lg font-bold text-primary">
                      R$ {customer.totalSpent.toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground">
                      <span>{customer.totalOrders} pedido(s)</span>
                      <span>•</span>
                      <span>Ultimo: {formatDate(customer.lastOrder)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
