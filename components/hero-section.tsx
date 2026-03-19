'use client'

import Image from 'next/image'
import { ArrowDown, Clock, MapPin, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full" />
        <div className="absolute bottom-40 right-20 w-48 h-48 border border-secondary rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary/50 rounded-full" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Orgânica por essência, recheada por prazer</span>
              <span className="xs:hidden">Orgânica por essência</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Pizza Artesanal{' '}
              <span className="text-primary">com Ingredientes Frescos</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Tradição e sabor em cada fatia. Nossas pizzas são preparadas com ingredientes 
              selecionados e muito carinho.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base touch-manipulation active:scale-95 transition-transform"
              >
                <a href="#cardapio">Ver Cardápio</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base border-primary/30 hover:border-primary hover:bg-primary/5 touch-manipulation active:scale-95 transition-transform"
              >
                <a href="#sobre">Nossa História</a>
              </Button>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start pt-2 sm:pt-4">
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm">18h às 23h</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm">Entrega em até 45min</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-sm lg:max-w-lg mx-auto">
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full" />
              
              {/* Logo display */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <Image
                  src="/images/logo.png"
                  alt="Sapore Artesanal - Orgânica por essência, recheada por prazer"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-lg"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 512px"
                />
              </div>

              {/* Floating badges - smaller on mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-card border border-border rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-lg">
                <div className="text-center">
                  <span className="text-lg sm:text-2xl font-bold text-primary">4.9</span>
                  <div className="text-yellow-600 text-[10px] sm:text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">+500 avaliações</p>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-card border border-border rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-lg">
                <div className="text-center">
                  <span className="text-base sm:text-xl font-bold text-foreground">+10.000</span>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Pizzas entregues</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on very small screens */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#cardapio" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
