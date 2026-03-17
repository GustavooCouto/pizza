'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CartItem, PizzaCartItem, DrinkCartItem, PizzaSize } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addPizza: (item: Omit<PizzaCartItem, 'quantity'>) => void
  addDrink: (item: Omit<DrinkCartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const generatePizzaId = (item: Omit<PizzaCartItem, 'quantity'>) => {
    const flavorIds = item.flavors.map(f => f.id).sort().join('-')
    const borderId = item.border?.id || 'sem-borda'
    return `pizza-${item.size}-${flavorIds}-${borderId}`
  }

  const addPizza = useCallback((item: Omit<PizzaCartItem, 'quantity'>) => {
    const id = generatePizzaId(item)
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === id)
      
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        }
        return updated
      }
      
      return [...prev, { ...item, id, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const addDrink = useCallback((item: Omit<DrinkCartItem, 'quantity'>) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id)
      
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        }
        return updated
      }
      
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id))
      return
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  return (
    <CartContext.Provider value={{
      items,
      addPizza,
      addDrink,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
