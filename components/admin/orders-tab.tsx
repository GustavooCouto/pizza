'use client'

import { useState } from 'react'
import {
  Clock,
  CheckCircle2,
  Truck,
  Package,
  ChefHat,
  Phone,
  MapPin,
  CreditCard,
  ArrowRight,
  Store,
} from 'lucide-react'
import { useAdmin } from '@/components/admin-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Order, PizzaCartItem, DrinkCartItem } from '@/lib/types'

function isPizzaItem(item: PizzaCartItem | DrinkCartItem): item is PizzaCartItem {
  return item.type === 'pizza'
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmado',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    icon: CheckCircle2,
  },
  preparing: {
    label: 'Preparando',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    icon: ChefHat,
  },
  delivering: {
    label: 'Saindo para Entrega',
    color: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
    icon: Truck,
  },
  delivered: {
    label: 'Entregue',
    color: 'bg-green-500/10 text-green-600 border-green-500/30',
    icon: Package,
  },
}

const statusFlow: Order['status'][] = ['pending', 'confirmed', 'preparing', 'delivering', 'delivered']

export function OrdersTab() {
  const { orders, updateOrderStatus } = useAdmin()
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all')

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((order) => order.status === filter)

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const currentIndex = statusFlow.indexOf(currentStatus)
    if (currentIndex < statusFlow.length - 1) {
      return statusFlow[currentIndex + 1]
    }
    return null
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (orders.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="p-12 text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum pedido ainda
          </h3>
          <p className="text-muted-foreground text-sm">
            Os pedidos recebidos via WhatsApp aparecerao aqui.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={filter} onValueChange={(v) => setFilter(v as Order['status'] | 'all')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os pedidos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="confirmed">Confirmados</SelectItem>
            <SelectItem value="preparing">Preparando</SelectItem>
            <SelectItem value="delivering">Em Entrega</SelectItem>
            <SelectItem value="delivered">Entregues</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filteredOrders.length} pedido(s)
        </span>
      </div>

      {/* Orders List */}
      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="space-y-4 pr-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            const nextStatus = getNextStatus(order.status)
            const isDelivery = order.customer.deliveryType === 'entrega'

            return (
              <Card key={order.id} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        Pedido #{order.id.slice(-6).toUpperCase()}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${status.color} border`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {isDelivery ? (
                          <><Truck className="w-3 h-3 mr-1" /> Entrega</>
                        ) : (
                          <><Store className="w-3 h-3 mr-1" /> Retirada</>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <p className="font-medium text-foreground">{order.customer.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {order.customer.phone}
                    </div>
                    {isDelivery && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mt-0.5" />
                        <span>
                          {order.customer.address}
                          {order.customer.complement && ` - ${order.customer.complement}`}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-3 h-3" />
                      {order.customer.paymentMethod === 'pix' && 'PIX'}
                      {order.customer.paymentMethod === 'cartao' && 'Cartao'}
                      {order.customer.paymentMethod === 'dinheiro' && (
                        <>
                          Dinheiro
                          {order.customer.change && ` (Troco para R$ ${order.customer.change})`}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Itens:</p>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.quantity}x{' '}
                          {isPizzaItem(item) ? (
                            <>
                              Pizza {item.sizeLabel} ({item.flavors.map(f => f.name).join(', ')})
                              {item.border && ` + ${item.border.name}`}
                            </>
                          ) : (
                            item.name
                          )}
                        </span>
                        <span className="text-foreground font-medium">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                    {isDelivery && (
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="text-muted-foreground">Taxa de entrega</span>
                        <span className="text-foreground">
                          R$ {order.deliveryFee.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {nextStatus && (
                    <Button
                      onClick={() => updateOrderStatus(order.id, nextStatus)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Avancar para: {statusConfig[nextStatus].label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
