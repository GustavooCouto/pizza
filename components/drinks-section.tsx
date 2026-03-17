'use client'

import { drinks } from '@/lib/menu-data'
import { DrinkCard } from '@/components/drink-card'

export function DrinksSection() {
  const refrigerantes = drinks.filter(d => d.category === 'refrigerante')
  const sucos = drinks.filter(d => d.category === 'suco')
  const cervejas = drinks.filter(d => d.category === 'cerveja')
  const aguas = drinks.filter(d => d.category === 'agua')

  return (
    <section id="bebidas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Para Acompanhar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Bebidas
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Complete seu pedido com nossas bebidas geladas e refrescantes.
          </p>
        </div>

        {/* Drinks Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Refrigerantes */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Refrigerantes
            </h3>
            <div className="space-y-3">
              {refrigerantes.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Sucos */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Sucos
            </h3>
            <div className="space-y-3">
              {sucos.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Cervejas */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Cervejas
            </h3>
            <div className="space-y-3">
              {cervejas.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </div>

          {/* Águas */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Águas
            </h3>
            <div className="space-y-3">
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
