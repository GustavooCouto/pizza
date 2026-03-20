export type PizzaSize = 'mini' | 'pequena' | 'media' | 'grande'

export interface PizzaSizeOption {
  size: PizzaSize
  label: string
  price: number
  serves: string
  maxFlavors: number
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

export interface BorderOption {
  id: string
  name: string
  price: number
}

export interface Extra {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: 'borda' | 'porcao'
}

export interface PizzaCartItem {
  id: string
  type: 'pizza'
  size: PizzaSize
  sizeLabel: string
  flavors: { id: string; name: string }[]
  border?: { id: string; name: string; price: number }
  price: number
  quantity: number
}

export interface DrinkCartItem {
  id: string
  type: 'drink'
  name: string
  price: number
  quantity: number
  image: string
}

export type CartItem = PizzaCartItem | DrinkCartItem

export interface Customer {
  name?: string
  phone: string
  email?: string
  password?: string
  street?: string
  number?: string
  neighborhood?: string
  complement?: string
  address?: string
  paymentMethod: 'dinheiro' | 'cartao' | 'pix'
  change?: number
  deliveryType: 'entrega' | 'retirada'
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
