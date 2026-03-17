'use client'

import { useState } from 'react'
import { pizzas, categories } from '@/lib/menu-data'
import { PizzaCard } from '@/components/pizza-card'
import { cn } from '@/lib/utils'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPizzas = activeCategory === 'all' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === activeCategory)

  return (
    <section id="cardapio" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Nosso Cardápio
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            Pizzas Artesanais
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Orgânica por essência, recheada por prazer. Cada pizza é preparada com ingredientes 
            frescos e selecionados, trazendo o verdadeiro sabor da pizza artesanal.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === 'all'
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Pizza Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </div>
    </section>
  )
}
