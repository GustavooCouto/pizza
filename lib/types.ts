export type PizzaSize = 'broto' | 'media' | 'grande' | 'familia'

export interface PizzaSizeOption {
  size: PizzaSize
  label: string
  price: number
  serves: string
}

export interface Pizza {
  id: string
  name: string
  description: string
  image: string
  category: string
  isVegetarian?: boolean
  isSpicy?: boolean
  sizes: PizzaSizeOption[]
}

export interface Drink {
  id: string
  name: string
  description: string
  image: string
  price: number
  volume: string
  category: 'refrigerante' | 'suco' | 'cerveja' | 'agua'
}

export interface Extra {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: 'borda' | 'porcao'
}

export interface CartItem {
  id: string
  type: 'pizza' | 'drink' | 'extra'
  name: string
  size?: PizzaSize
  sizeLabel?: string
  price: number
  quantity: number
  image: string
}

export interface Customer {
  name: string
  phone: string
  address: string
  complement?: string
  paymentMethod: 'dinheiro' | 'cartao' | 'pix'
  change?: number
}

export interface Order {
  id: string
  customer: Customer
  items: CartItem[]
  total: number
  deliveryFee: number
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered'
  createdAt: Date
}
