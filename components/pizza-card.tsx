'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Flame, Leaf } from 'lucide-react'
import { Pizza, PizzaSize } from '@/lib/types'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PizzaCardProps {
  pizza: Pizza
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('media')
  const { addItem } = useCart()

  const selectedSizeOption = pizza.sizes.find(s => s.size === selectedSize)!

  const handleAddToCart = () => {
    addItem({
      id: pizza.id,
      type: 'pizza',
      name: pizza.name,
      size: selectedSize,
      sizeLabel: selectedSizeOption.label,
      price: selectedSizeOption.price,
      image: pizza.image,
    })
  }

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {pizza.isVegetarian && (
            <span className="flex items-center gap-1 bg-green-600/90 text-white text-xs px-2 py-1 rounded-full">
              <Leaf className="w-3 h-3" />
              Vegetariana
            </span>
          )}
          {pizza.isSpicy && (
            <span className="flex items-center gap-1 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full">
              <Flame className="w-3 h-3" />
              Picante
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{pizza.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {pizza.description}
        </p>

        {/* Size Selection */}
        <div className="grid grid-cols-4 gap-1 mb-4">
          {pizza.sizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              onClick={() => setSelectedSize(sizeOption.size)}
              className={cn(
                "py-2 px-1 rounded-lg text-xs font-medium transition-all",
                selectedSize === sizeOption.size
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {sizeOption.label}
            </button>
          ))}
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {selectedSizeOption.price.toFixed(2).replace('.', ',')}
            </span>
            <p className="text-xs text-muted-foreground">
              Serve {selectedSizeOption.serves}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}
