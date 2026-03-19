'use client'

import { useState } from 'react'
import Image from 'next/image'
import { pizzaSizes } from '@/lib/menu-data'
import { PizzaOrderModal } from '@/components/pizza-order-modal'
import { PizzaSize } from '@/lib/types'

export function MenuSection() {
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null)

  const handleSelectSize = (size: PizzaSize) => {
    setSelectedSize(size)
    setOrderModalOpen(true)
  }

  // Imagens para cada tamanho
  const sizeImages: Record<PizzaSize, string> = {
    mini: '/images/pizzas/pizza-mini.jpg',
    pequena: '/images/pizzas/pizza-pequena.jpg',
    media: '/images/pizzas/pizza-media.jpg',
    grande: '/images/pizzas/pizza-grande.jpg',
    gigante: '/images/pizzas/pizza-gigante.jpg',
  }

  return (
    <section id="cardapio" className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wide">
          PIZZAS
        </h2>

        {/* Pizza Sizes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pizzaSizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              onClick={() => handleSelectSize(sizeOption.size)}
              className="border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary/50 transition-colors bg-card text-left"
            >
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-orange-500 text-base mb-1">
                  {sizeOption.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {sizeOption.description}
                </p>
                <p className="text-orange-600 font-bold text-base">
                  R$ {sizeOption.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={sizeImages[sizeOption.size]}
                  alt={sizeOption.label}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pizza Order Modal */}
      <PizzaOrderModal 
        open={orderModalOpen} 
        onOpenChange={setOrderModalOpen}
        initialSize={selectedSize}
      />
    </section>
  )
}
