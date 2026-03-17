'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Order, Pizza, Drink } from '@/lib/types'
import { pizzas as initialPizzas, drinks as initialDrinks } from '@/lib/menu-data'

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  pizzas: Pizza[]
  drinks: Drink[]
  addPizza: (pizza: Pizza) => void
  updatePizza: (id: string, pizza: Partial<Pizza>) => void
  deletePizza: (id: string) => void
  addDrink: (drink: Drink) => void
  updateDrink: (id: string, drink: Partial<Drink>) => void
  deleteDrink: (id: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'sapore2024'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas)
  const [drinks, setDrinks] = useState<Drink[]>(initialDrinks)

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    
    const savedOrders = localStorage.getItem('admin_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    
    const savedPizzas = localStorage.getItem('admin_pizzas')
    if (savedPizzas) {
      setPizzas(JSON.parse(savedPizzas))
    }
    
    const savedDrinks = localStorage.getItem('admin_drinks')
    if (savedDrinks) {
      setDrinks(JSON.parse(savedDrinks))
    }
  }, [])

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('admin_orders', JSON.stringify(orders))
    }
  }, [orders])

  useEffect(() => {
    localStorage.setItem('admin_pizzas', JSON.stringify(pizzas))
  }, [pizzas])

  useEffect(() => {
    localStorage.setItem('admin_drinks', JSON.stringify(drinks))
  }, [drinks])

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

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const addPizza = (pizza: Pizza) => {
    setPizzas((prev) => [...prev, pizza])
  }

  const updatePizza = (id: string, updates: Partial<Pizza>) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, ...updates } : pizza
      )
    )
  }

  const deletePizza = (id: string) => {
    setPizzas((prev) => prev.filter((pizza) => pizza.id !== id))
  }

  const addDrink = (drink: Drink) => {
    setDrinks((prev) => [...prev, drink])
  }

  const updateDrink = (id: string, updates: Partial<Drink>) => {
    setDrinks((prev) =>
      prev.map((drink) =>
        drink.id === id ? { ...drink, ...updates } : drink
      )
    )
  }

  const deleteDrink = (id: string) => {
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
