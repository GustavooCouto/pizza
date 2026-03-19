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
  const { addDrink } = useCart()

  const handleAddToCart = () => {
    addDrink({
      id: drink.id,
      type: 'drink',
      name: drink.name,
      price: drink.price,
      image: drink.image,
    })
  }

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 touch-manipulation active:scale-[0.98]">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">{drink.name}</h4>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{drink.volume}</p>
        <span className="text-primary font-bold text-sm sm:text-base">
          R$ {drink.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <Button
        size="icon"
        onClick={handleAddToCart}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 touch-manipulation active:scale-95 transition-transform"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
