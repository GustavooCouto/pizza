'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Drink } from '@/lib/types'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'

interface DrinkCardProps {
  drink: Drink
}

export function DrinkCard({ drink }: DrinkCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: drink.id,
      type: 'drink',
      name: drink.name,
      price: drink.price,
      image: drink.image,
    })
  }

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4 p-3">
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{drink.name}</h4>
        <p className="text-xs text-muted-foreground">{drink.volume}</p>
        <span className="text-primary font-bold">
          R$ {drink.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <Button
        size="icon"
        onClick={handleAddToCart}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex-shrink-0"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
