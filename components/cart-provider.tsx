'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CartItem, PizzaSize } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size?: PizzaSize) => void
  updateQuantity: (id: string, quantity: number, size?: PizzaSize) => void
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

  const getItemKey = (id: string, size?: PizzaSize) => size ? `${id}-${size}` : id

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const key = getItemKey(item.id, item.size)
      const existingIndex = prev.findIndex(i => getItemKey(i.id, i.size) === key)
      
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

  const removeItem = useCallback((id: string, size?: PizzaSize) => {
    const key = getItemKey(id, size)
    setItems(prev => prev.filter(item => getItemKey(item.id, item.size) !== key))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number, size?: PizzaSize) => {
    const key = getItemKey(id, size)
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => getItemKey(item.id, item.size) !== key))
      return
    }
    setItems(prev => prev.map(item => 
      getItemKey(item.id, item.size) === key ? { ...item, quantity } : item
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
      addItem,
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
