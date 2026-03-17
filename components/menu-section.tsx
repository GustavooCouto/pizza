'use client'

import { useState, useRef, useEffect } from 'react'
import { pizzas, categories } from '@/lib/menu-data'
import { PizzaCard } from '@/components/pizza-card'
import { cn } from '@/lib/utils'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredPizzas = activeCategory === 'all' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === activeCategory)

  // Auto-scroll category into view on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const activeButton = scrollRef.current.querySelector('[data-active="true"]')
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [activeCategory])

  return (
    <section id="cardapio" className="py-12 sm:py-16 md:py-20 bg-card">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            Nosso Cardápio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            Pizzas Artesanais
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Orgânica por essência, recheada por prazer. Cada pizza é preparada com ingredientes 
            frescos e selecionados.
          </p>
        </div>

        {/* Category Filter - Horizontal scroll on mobile */}
        <div 
          ref={scrollRef}
          className="flex gap-2 mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
        >
          <button
            onClick={() => setActiveCategory('all')}
            data-active={activeCategory === 'all'}
            className={cn(
              "px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95",
              activeCategory === 'all'
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              data-active={activeCategory === category.id}
              className={cn(
                "px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Pizza Grid - Optimized for mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>

        {/* Category count indicator */}
        <p className="text-center text-muted-foreground text-sm mt-6 sm:mt-8">
          {filteredPizzas.length} {filteredPizzas.length === 1 ? 'pizza encontrada' : 'pizzas encontradas'}
        </p>
      </div>
    </section>
  )
}
