'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Order, Pizza, Drink, PizzaSizeOption } from '@/lib/types'

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  created_at: string
  total_orders: number
  total_spent: number
}

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  orders: Order[]
  addOrder: (order: Order) => Promise<void>
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  pizzas: Pizza[]
  drinks: Drink[]
  customers: Customer[]
  addPizza: (pizza: Omit<Pizza, 'id'>) => Promise<void>
  updatePizza: (id: string, pizza: Partial<Pizza>) => Promise<void>
  deletePizza: (id: string) => Promise<void>
  addDrink: (drink: Omit<Drink, 'id'>) => Promise<void>
  updateDrink: (id: string, drink: Partial<Drink>) => Promise<void>
  deleteDrink: (id: string) => Promise<void>
  loading: boolean
  refreshData: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'sapore2024'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const fetchPizzas = useCallback(async () => {
    const { data, error } = await supabase
      .from('pizzas')
      .select('*')
      .eq('available', true)
      .order('category', { ascending: true })

    if (error) {
      console.error('Error fetching pizzas:', error)
      return
    }

    const formattedPizzas: Pizza[] = (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image,
      category: p.category,
      isVegetarian: p.is_vegetarian,
      isSpicy: p.is_spicy,
      sizes: p.sizes as PizzaSizeOption[],
    }))

    setPizzas(formattedPizzas)
  }, [supabase])

  const fetchDrinks = useCallback(async () => {
    const { data, error } = await supabase
      .from('drinks')
      .select('*')
      .eq('available', true)
      .order('category', { ascending: true })

    if (error) {
      console.error('Error fetching drinks:', error)
      return
    }

    const formattedDrinks: Drink[] = (data || []).map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      image: d.image,
      price: d.price,
      volume: d.volume,
      category: d.category,
    }))

    setDrinks(formattedDrinks)
  }, [supabase])

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (
          name,
          phone,
          email
        ),
        order_items (
          *
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return
    }

    const formattedOrders: Order[] = (data || []).map((o) => ({
      id: o.id,
      customer: {
        name: o.customers?.name || o.customer_name,
        phone: o.customers?.phone || o.customer_phone,
        email: o.customers?.email,
        address: o.delivery_address,
        complement: o.delivery_complement,
        paymentMethod: o.payment_method,
        deliveryType: o.delivery_type,
        change: o.change_for,
      },
      items: (o.order_items || []).map((item: { id: string; item_type: string; item_name: string; quantity: number; unit_price: number; item_details: Record<string, unknown> }) => ({
        id: item.id,
        type: item.item_type,
        name: item.item_name,
        quantity: item.quantity,
        price: item.unit_price,
        ...(item.item_details || {}),
      })),
      total: o.total,
      deliveryFee: o.delivery_fee,
      status: o.status,
      createdAt: new Date(o.created_at),
    }))

    setOrders(formattedOrders)
  }, [supabase])

  const fetchCustomers = useCallback(async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching customers:', error)
      return
    }

    setCustomers(data || [])
  }, [supabase])

  const refreshData = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchPizzas(), fetchDrinks(), fetchOrders(), fetchCustomers()])
    setLoading(false)
  }, [fetchPizzas, fetchDrinks, fetchOrders, fetchCustomers])

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    
    refreshData()
  }, [refreshData])

  // Subscribe to realtime updates
  useEffect(() => {
    const ordersChannel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(ordersChannel)
    }
  }, [supabase, fetchOrders])

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  const addOrder = async (order: Order) => {
    // First, create or get customer
    let customerId = null
    
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', order.customer.phone)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({
          name: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email,
        })
        .select('id')
        .single()
      
      customerId = newCustomer?.id
    }

    // Create the order
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        delivery_type: order.customer.deliveryType,
        delivery_address: order.customer.deliveryType === 'entrega' 
          ? `${order.customer.street}, ${order.customer.number} - ${order.customer.neighborhood}`
          : null,
        delivery_complement: order.customer.complement,
        payment_method: order.customer.paymentMethod,
        change_for: order.customer.change ? parseFloat(String(order.customer.change)) : null,
        subtotal: order.total - order.deliveryFee,
        delivery_fee: order.deliveryFee,
        total: order.total,
        status: 'pending',
      })
      .select('id')
      .single()

    if (orderError || !newOrder) {
      console.error('Error creating order:', orderError)
      return
    }

    // Create order items
    const orderItems = order.items.map((item) => ({
      order_id: newOrder.id,
      item_type: item.type,
      item_name: item.type === 'pizza' ? `Pizza ${(item as { sizeLabel: string }).sizeLabel}` : item.name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      item_details: item.type === 'pizza' ? {
        size: (item as { size: string }).size,
        sizeLabel: (item as { sizeLabel: string }).sizeLabel,
        flavors: (item as { flavors: { id: string; name: string }[] }).flavors,
        border: (item as { border?: { id: string; name: string; price: number } }).border,
      } : null,
    }))

    await supabase.from('order_items').insert(orderItems)

    // Refresh orders
    fetchOrders()
  }

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    if (error) {
      console.error('Error updating order status:', error)
      return
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const addPizza = async (pizza: Omit<Pizza, 'id'>) => {
    const { data, error } = await supabase
      .from('pizzas')
      .insert({
        name: pizza.name,
        description: pizza.description,
        image: pizza.image,
        category: pizza.category,
        is_vegetarian: pizza.isVegetarian,
        is_spicy: pizza.isSpicy,
        sizes: pizza.sizes,
        available: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding pizza:', error)
      return
    }

    const newPizza: Pizza = {
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
      category: data.category,
      isVegetarian: data.is_vegetarian,
      isSpicy: data.is_spicy,
      sizes: data.sizes,
    }

    setPizzas((prev) => [...prev, newPizza])
  }

  const updatePizza = async (id: string, updates: Partial<Pizza>) => {
    const dbUpdates: Record<string, unknown> = {}
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.image !== undefined) dbUpdates.image = updates.image
    if (updates.category !== undefined) dbUpdates.category = updates.category
    if (updates.isVegetarian !== undefined) dbUpdates.is_vegetarian = updates.isVegetarian
    if (updates.isSpicy !== undefined) dbUpdates.is_spicy = updates.isSpicy
    if (updates.sizes !== undefined) dbUpdates.sizes = updates.sizes
    dbUpdates.updated_at = new Date().toISOString()

    const { error } = await supabase
      .from('pizzas')
      .update(dbUpdates)
      .eq('id', id)

    if (error) {
      console.error('Error updating pizza:', error)
      return
    }

    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, ...updates } : pizza
      )
    )
  }

  const deletePizza = async (id: string) => {
    const { error } = await supabase
      .from('pizzas')
      .update({ available: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error deleting pizza:', error)
      return
    }

    setPizzas((prev) => prev.filter((pizza) => pizza.id !== id))
  }

  const addDrink = async (drink: Omit<Drink, 'id'>) => {
    const { data, error } = await supabase
      .from('drinks')
      .insert({
        name: drink.name,
        description: drink.description,
        image: drink.image,
        price: drink.price,
        volume: drink.volume,
        category: drink.category,
        available: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding drink:', error)
      return
    }

    const newDrink: Drink = {
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      volume: data.volume,
      category: data.category,
    }

    setDrinks((prev) => [...prev, newDrink])
  }

  const updateDrink = async (id: string, updates: Partial<Drink>) => {
    const dbUpdates: Record<string, unknown> = { ...updates }
    dbUpdates.updated_at = new Date().toISOString()

    const { error } = await supabase
      .from('drinks')
      .update(dbUpdates)
      .eq('id', id)

    if (error) {
      console.error('Error updating drink:', error)
      return
    }

    setDrinks((prev) =>
      prev.map((drink) =>
        drink.id === id ? { ...drink, ...updates } : drink
      )
    )
  }

  const deleteDrink = async (id: string) => {
    const { error } = await supabase
      .from('drinks')
      .update({ available: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error deleting drink:', error)
      return
    }

    setDrinks((prev) => prev.filter((drink) => drink.id !== id))
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        orders,
        addOrder,
        updateOrderStatus,
        pizzas,
        drinks,
        customers,
        addPizza,
        updatePizza,
        deletePizza,
        addDrink,
        updateDrink,
        deleteDrink,
        loading,
        refreshData,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
