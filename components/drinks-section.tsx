'use client'

import { drinks } from '@/lib/menu-data'
import { DrinkCard } from '@/components/drink-card'

export function DrinksSection() {
  const refrigerantes = drinks.filter(d => d.category === 'refrigerante')
  const sucos = drinks.filter(d => d.category === 'suco')
  const cervejas = drinks.filter(d => d.category === 'cerveja')
  const aguas = drinks.filter(d => d.category === 'agua')

  return (
    <section id="bebidas" className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wide">
          Bebidas
        </h2>

        {/* Drinks Grid - Single column on mobile, 2 columns on tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Refrigerantes */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Refrigerantes
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {refrigerantes.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Sucos */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Sucos
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {sucos.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Cervejas */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Cervejas
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {cervejas.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Águas */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Águas
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {aguas.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
