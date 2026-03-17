'use client'

import Image from 'next/image'
import { ArrowDown, Clock, MapPin, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      {/* Decorative wheat pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full" />
        <div className="absolute bottom-40 right-20 w-48 h-48 border border-secondary rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary/50 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Orgânica por essência, recheada por prazer
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Pizza Artesanal{' '}
              <span className="text-primary">com Ingredientes Frescos</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Tradição e sabor em cada fatia. Nossas pizzas são preparadas com ingredientes 
              selecionados e muito carinho, trazendo o verdadeiro sabor da pizza artesanal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
              >
                <a href="#cardapio">Ver Cardápio</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <a href="#sobre">Nossa História</a>
              </Button>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">18h às 23h</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Entrega em até 45min</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full" />
              
              {/* Logo display */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center p-8">
                <Image
                  src="/images/logo.png"
                  alt="Sapore Artesanal - Orgânica por essência, recheada por prazer"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-lg"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <span className="text-2xl font-bold text-primary">4.9</span>
                  <div className="text-yellow-600 text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-xs text-muted-foreground">+500 avaliações</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">+10.000</span>
                  <p className="text-xs text-muted-foreground">Pizzas entregues</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#cardapio" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
