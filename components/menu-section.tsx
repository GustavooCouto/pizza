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
  }

  return (
    <section id="cardapio" className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground uppercase tracking-wide">
            Pizzas
          </h2>
          <div className="w-16 h-1 bg-primary mt-2 rounded-full" />
        </div>

        {/* Pizza Sizes Grid - responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pizzaSizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              onClick={() => handleSelectSize(sizeOption.size)}
              className="border border-border rounded-lg p-3 sm:p-4 flex items-start gap-3 hover:border-primary/50 hover:shadow-md transition-all bg-card text-left group active:scale-[0.98]"
            >
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-semibold text-primary text-sm sm:text-base mb-1 group-hover:text-primary/80">
                  {sizeOption.label}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                  {sizeOption.description}
                </p>
                <p className="text-secondary font-bold text-sm sm:text-base">
                  R$ {sizeOption.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={sizeImages[sizeOption.size]}
                  alt={sizeOption.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 64px, 80px"
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
