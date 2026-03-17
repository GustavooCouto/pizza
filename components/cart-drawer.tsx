'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, Pizza } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { DELIVERY_FEE } from '@/lib/menu-data'
import { CheckoutModal } from '@/components/checkout-modal'
import { useState } from 'react'
import { PizzaCartItem, DrinkCartItem } from '@/lib/types'

function isPizzaItem(item: PizzaCartItem | DrinkCartItem): item is PizzaCartItem {
  return item.type === 'pizza'
}

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  
  const subtotal = getTotal()
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md bg-background flex flex-col">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Seu Pedido
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Carrinho vazio</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione itens do cardapio para comecar
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-card p-3 rounded-xl border border-border"
                  >
                    {isPizzaItem(item) ? (
                      // Pizza item
                      <>
                        <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Pizza className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">
                            Pizza {item.sizeLabel}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.flavors.map(f => f.name).join(', ')}
                            {item.border && ` + ${item.border.name}`}
                          </p>
                          <span className="text-primary font-bold text-sm">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </>
                    ) : (
                      // Drink item
                      <>
                        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm truncate">
                            {item.name}
                          </h4>
                          <span className="text-primary font-bold text-sm">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-muted rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxa de entrega</span>
                    <span>R$ {DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearCart}
                  >
                    Limpar
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    Finalizar Pedido
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal 
        open={checkoutOpen} 
        onOpenChange={setCheckoutOpen}
        total={total}
      />
    </>
  )
}
