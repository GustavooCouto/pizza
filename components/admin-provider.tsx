'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { Order, Pizza, Drink } from '@/lib/types'
import { pizzas as initialPizzas, drinks as initialDrinks } from '@/lib/menu-data'

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  orders: Order[]
  addOrder: (order: Order) => Promise<void>
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  pizzas: Pizza[]
  drinks: Drink[]
  addPizza: (pizza: Pizza) => Promise<void>
  updatePizza: (id: string, pizza: Partial<Pizza>) => Promise<void>
  deletePizza: (id: string) => Promise<void>
  addDrink: (drink: Drink) => Promise<void>
  updateDrink: (id: string, drink: Partial<Drink>) => Promise<void>
  deleteDrink: (id: string) => Promise<void>
  refreshData: () => Promise<void>
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'sapore2024'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas)
  const [drinks, setDrinks] = useState<Drink[]>(initialDrinks)
  const [isLoading, setIsLoading] = useState(true)
  const [useApi, setUseApi] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [pizzasRes, drinksRes, ordersRes] = await Promise.all([
        fetch('/api/pizzas'),
        fetch('/api/drinks'),
        fetch('/api/orders'),
      ])

      if (pizzasRes.ok && drinksRes.ok && ordersRes.ok) {
        const [pizzasData, drinksData, ordersData] = await Promise.all([
          pizzasRes.json(),
          drinksRes.json(),
          ordersRes.json(),
        ])

        // Only use API data if we got valid arrays
        if (Array.isArray(pizzasData) && pizzasData.length > 0) {
          setPizzas(pizzasData.map(transformPizzaFromDb))
          setUseApi(true)
        }
        if (Array.isArray(drinksData) && drinksData.length > 0) {
          setDrinks(drinksData.map(transformDrinkFromDb))
          setUseApi(true)
        }
        if (Array.isArray(ordersData)) {
          setOrders(ordersData.map(transformOrderFromDb))
          setUseApi(true)
        }
      }
    } catch (error) {
      console.log('[v0] API not available, using local data:', error)
      // Keep using initial data if API fails
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Transform database format to app format
  function transformPizzaFromDb(dbPizza: Record<string, unknown>): Pizza {
    return {
      id: dbPizza.id as string,
      name: dbPizza.name as string,
      description: dbPizza.description as string,
      image: dbPizza.image as string,
      category: dbPizza.category as Pizza['category'],
      isVegetarian: dbPizza.is_vegetarian as boolean,
      isSpicy: dbPizza.is_spicy as boolean,
      sizes: dbPizza.sizes as Pizza['sizes'],
    }
  }

  function transformDrinkFromDb(dbDrink: Record<string, unknown>): Drink {
    return {
      id: dbDrink.id as string,
      name: dbDrink.name as string,
      description: dbDrink.description as string,
      image: dbDrink.image as string,
      price: Number(dbDrink.price),
      volume: dbDrink.volume as string,
      category: dbDrink.category as Drink['category'],
    }
  }

  function transformOrderFromDb(dbOrder: Record<string, unknown>): Order {
    return {
      id: dbOrder.id as string,
      items: dbOrder.items as Order['items'],
      total: Number(dbOrder.total),
      deliveryFee: Number(dbOrder.delivery_fee || 0),
      status: dbOrder.status as Order['status'],
      customerInfo: {
        name: dbOrder.customer_name as string,
        phone: dbOrder.customer_phone as string,
        email: dbOrder.customer_email as string,
        address: {
          street: dbOrder.customer_street as string,
          number: dbOrder.customer_number as string,
          neighborhood: dbOrder.customer_neighborhood as string,
          complement: dbOrder.customer_complement as string,
        },
      },
      paymentMethod: dbOrder.payment_method as Order['paymentMethod'],
      changeAmount: dbOrder.change_amount ? Number(dbOrder.change_amount) : undefined,
      deliveryType: dbOrder.delivery_type as Order['deliveryType'],
      createdAt: dbOrder.created_at as string,
    }
  }

  // Transform app format to database format
  function transformPizzaToDb(pizza: Pizza) {
    return {
      name: pizza.name,
      description: pizza.description,
      image: pizza.image,
      category: pizza.category,
      is_vegetarian: pizza.isVegetarian,
      is_spicy: pizza.isSpicy,
      sizes: pizza.sizes,
    }
  }

  function transformDrinkToDb(drink: Drink) {
    return {
      name: drink.name,
      description: drink.description,
      image: drink.image,
      price: drink.price,
      volume: drink.volume,
      category: drink.category,
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    fetchData()
  }, [fetchData])

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

  const refreshData = async () => {
    await fetchData()
  }

  const addOrder = async (order: Order) => {
    if (useApi) {
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        })
        if (res.ok) {
          const newOrder = await res.json()
          setOrders((prev) => [transformOrderFromDb(newOrder), ...prev])
          return
        }
      } catch (error) {
        console.log('[v0] Failed to add order via API:', error)
      }
    }
    // Fallback to local state
    setOrders((prev) => [order, ...prev])
  }

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (useApi) {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
        if (res.ok) {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === orderId ? { ...order, status } : order
            )
          )
          return
        }
      } catch (error) {
        console.log('[v0] Failed to update order via API:', error)
      }
    }
    // Fallback to local state
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const addPizza = async (pizza: Pizza) => {
    if (useApi) {
      try {
        const res = await fetch('/api/pizzas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformPizzaToDb(pizza)),
        })
        if (res.ok) {
          const newPizza = await res.json()
          setPizzas((prev) => [...prev, transformPizzaFromDb(newPizza)])
          return
        }
      } catch (error) {
        console.log('[v0] Failed to add pizza via API:', error)
      }
    }
    // Fallback to local state
    setPizzas((prev) => [...prev, pizza])
  }

  const updatePizza = async (id: string, updates: Partial<Pizza>) => {
    if (useApi) {
      try {
        const res = await fetch(`/api/pizzas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformPizzaToDb(updates as Pizza)),
        })
        if (res.ok) {
          setPizzas((prev) =>
            prev.map((pizza) =>
              pizza.id === id ? { ...pizza, ...updates } : pizza
            )
          )
          return
        }
      } catch (error) {
        console.log('[v0] Failed to update pizza via API:', error)
      }
    }
    // Fallback to local state
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, ...updates } : pizza
      )
    )
  }

  const deletePizza = async (id: string) => {
    if (useApi) {
      try {
        const res = await fetch(`/api/pizzas/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          setPizzas((prev) => prev.filter((pizza) => pizza.id !== id))
          return
        }
      } catch (error) {
        console.log('[v0] Failed to delete pizza via API:', error)
      }
    }
    // Fallback to local state
    setPizzas((prev) => prev.filter((pizza) => pizza.id !== id))
  }

  const addDrink = async (drink: Drink) => {
    if (useApi) {
      try {
        const res = await fetch('/api/drinks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformDrinkToDb(drink)),
        })
        if (res.ok) {
          const newDrink = await res.json()
          setDrinks((prev) => [...prev, transformDrinkFromDb(newDrink)])
          return
        }
      } catch (error) {
        console.log('[v0] Failed to add drink via API:', error)
      }
    }
    // Fallback to local state
    setDrinks((prev) => [...prev, drink])
  }

  const updateDrink = async (id: string, updates: Partial<Drink>) => {
    if (useApi) {
      try {
        const res = await fetch(`/api/drinks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformDrinkToDb(updates as Drink)),
        })
        if (res.ok) {
          setDrinks((prev) =>
            prev.map((drink) =>
              drink.id === id ? { ...drink, ...updates } : drink
            )
          )
          return
        }
      } catch (error) {
        console.log('[v0] Failed to update drink via API:', error)
      }
    }
    // Fallback to local state
    setDrinks((prev) =>
      prev.map((drink) =>
        drink.id === id ? { ...drink, ...updates } : drink
      )
    )
  }

  const deleteDrink = async (id: string) => {
    if (useApi) {
      try {
        const res = await fetch(`/api/drinks/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          setDrinks((prev) => prev.filter((drink) => drink.id !== id))
          return
        }
      } catch (error) {
        console.log('[v0] Failed to delete drink via API:', error)
      }
    }
    // Fallback to local state
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
        addPizza,
        updatePizza,
        deletePizza,
        addDrink,
        updateDrink,
        deleteDrink,
        refreshData,
        isLoading,
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
