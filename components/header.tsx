'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, Phone } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  const { getItemCount, setIsOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = getItemCount()

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#cardapio', label: 'Cardápio' },
    { href: '#bebidas', label: 'Bebidas' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Sapore Artesanal"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-bold text-foreground">Sapore Artesanal</span>
              <span className="text-[10px] md:text-xs text-muted-foreground -mt-0.5">Orgânica por essência, recheada por prazer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+5546911158681"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">(46) 9115-8681</span>
            </a>

            <Button
              variant="outline"
              size="icon"
              className="relative border-primary/30 hover:border-primary hover:bg-primary/10"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/images/logo.png"
                      alt="Sapore Artesanal"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-foreground">Sapore Artesanal</span>
                      <span className="text-[10px] text-muted-foreground">Orgânica por essência</span>
                    </div>
                  </div>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="tel:+5546911158681"
                    className="flex items-center gap-2 text-primary"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(46) 9115-8681</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
