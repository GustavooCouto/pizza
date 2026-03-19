'use client'

import Image from 'next/image'
import { Flame, Leaf } from 'lucide-react'
import { Pizza } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface PizzaCardProps {
  pizza: Pizza
  onOrder: () => void
}

export function PizzaCard({ pizza, onOrder }: PizzaCardProps) {
  const lowestPrice = Math.min(...pizza.sizes.map(s => s.price))

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-muted">
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1.5 sm:gap-2">
          {pizza.isVegetarian && (
            <span className="flex items-center gap-1 bg-green-600/90 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Vegetariana</span>
            </span>
          )}
          {pizza.isSpicy && (
            <span className="flex items-center gap-1 bg-red-600/90 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Picante</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg text-foreground mb-0.5 sm:mb-1">{pizza.name}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 min-h-[2.5rem] sm:min-h-[2.75rem]">
          {pizza.description}
        </p>

        {/* Price & Order Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs text-muted-foreground">A partir de</span>
            <p className="text-lg sm:text-xl font-bold text-primary">
              R$ {lowestPrice.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <Button
            onClick={onOrder}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-xs sm:text-sm px-4 sm:px-6 h-9 sm:h-10 touch-manipulation active:scale-95 transition-transform"
          >
            Pedir
          </Button>
        </div>
      </div>
    </div>
  )
}
