'use client'

import { useState, useMemo } from 'react'
import { X, Check, ChevronRight, Pizza, CircleDot } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { pizzas, borderOptions, categories } from '@/lib/menu-data'
import { PizzaSize } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PizzaOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sizeConfig = {
  broto: { label: 'Broto', maxFlavors: 1, serves: '1 pessoa' },
  media: { label: 'Média', maxFlavors: 3, serves: '2 pessoas' },
  grande: { label: 'Grande', maxFlavors: 4, serves: '3-4 pessoas' },
}

type Step = 'size' | 'flavors' | 'border' | 'review'

export function PizzaOrderModal({ open, onOpenChange }: PizzaOrderModalProps) {
  const { addPizza } = useCart()
  const [step, setStep] = useState<Step>('size')
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null)
  const [selectedFlavors, setSelectedFlavors] = useState<{ id: string; name: string }[]>([])
  const [selectedBorder, setSelectedBorder] = useState(borderOptions[0])
  const [activeCategory, setActiveCategory] = useState('tradicional')

  const maxFlavors = selectedSize ? sizeConfig[selectedSize].maxFlavors : 0

  const filteredPizzas = useMemo(() => {
    return pizzas.filter(pizza => pizza.category === activeCategory)
  }, [activeCategory])

  const calculatePrice = () => {
    if (!selectedSize || selectedFlavors.length === 0) return 0
    
    // Get the highest price among selected flavors
    const flavorPrices = selectedFlavors.map(flavor => {
      const pizza = pizzas.find(p => p.id === flavor.id)
      const sizeOption = pizza?.sizes.find(s => s.size === selectedSize)
      return sizeOption?.price || 0
    })
    
    const basePrice = Math.max(...flavorPrices)
    const borderPrice = selectedBorder.price
    
    return basePrice + borderPrice
  }

  const handleSelectSize = (size: PizzaSize) => {
    setSelectedSize(size)
    setSelectedFlavors([])
    setStep('flavors')
  }

  const handleToggleFlavor = (pizza: { id: string; name: string }) => {
    setSelectedFlavors(prev => {
      const exists = prev.find(f => f.id === pizza.id)
      if (exists) {
        return prev.filter(f => f.id !== pizza.id)
      }
      if (prev.length >= maxFlavors) {
        return prev
      }
      return [...prev, pizza]
    })
  }

  const handleAddToCart = () => {
    if (!selectedSize || selectedFlavors.length === 0) return
    
    addPizza({
      type: 'pizza',
      size: selectedSize,
      sizeLabel: sizeConfig[selectedSize].label,
      flavors: selectedFlavors,
      border: selectedBorder.price > 0 ? selectedBorder : undefined,
      price: calculatePrice(),
    })
    
    resetAndClose()
  }

  const resetAndClose = () => {
    setStep('size')
    setSelectedSize(null)
    setSelectedFlavors([])
    setSelectedBorder(borderOptions[0])
    setActiveCategory('tradicional')
    onOpenChange(false)
  }

  const goBack = () => {
    switch (step) {
      case 'flavors':
        setStep('size')
        setSelectedFlavors([])
        break
      case 'border':
        setStep('flavors')
        break
      case 'review':
        setStep('border')
        break
    }
  }

  const goNext = () => {
    switch (step) {
      case 'flavors':
        if (selectedFlavors.length > 0) setStep('border')
        break
      case 'border':
        setStep('review')
        break
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" hideCloseButton className="h-[90vh] sm:h-[85vh] p-0 rounded-t-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step !== 'size' && (
                  <button onClick={goBack} className="p-1 -ml-1 text-muted-foreground hover:text-foreground">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                )}
                <SheetTitle className="text-lg font-bold text-foreground">
                  {step === 'size' && 'Escolha o tamanho'}
                  {step === 'flavors' && `Escolha ${maxFlavors === 1 ? 'o sabor' : `até ${maxFlavors} sabores`}`}
                  {step === 'border' && 'Escolha a borda'}
                  {step === 'review' && 'Revise seu pedido'}
                </SheetTitle>
              </div>
              <button onClick={resetAndClose} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress indicator */}
            <div className="flex gap-1.5 mt-3">
              {['size', 'flavors', 'border', 'review'].map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    ['size', 'flavors', 'border', 'review'].indexOf(step) >= i
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Step: Size */}
            {step === 'size' && (
              <div className="p-4 space-y-3">
                {(['broto', 'media', 'grande'] as PizzaSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSelectSize(size)}
                    className="w-full p-4 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "rounded-full bg-primary/10 flex items-center justify-center",
                        size === 'broto' && "w-10 h-10",
                        size === 'media' && "w-12 h-12",
                        size === 'grande' && "w-14 h-14"
                      )}>
                        <Pizza className={cn(
                          "text-primary",
                          size === 'broto' && "w-5 h-5",
                          size === 'media' && "w-6 h-6",
                          size === 'grande' && "w-7 h-7"
                        )} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{sizeConfig[size].label}</p>
                        <p className="text-sm text-muted-foreground">
                          {sizeConfig[size].maxFlavors === 1 
                            ? '1 sabor' 
                            : `Até ${sizeConfig[size].maxFlavors} sabores`
                          } - {sizeConfig[size].serves}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}

            {/* Step: Flavors */}
            {step === 'flavors' && (
              <div className="flex flex-col h-full">
                {/* Category tabs */}
                <div className="flex gap-2 p-4 pb-2 overflow-x-auto scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Selected flavors indicator */}
                {selectedFlavors.length > 0 && (
                  <div className="px-4 py-2 bg-primary/10 border-y border-primary/20">
                    <p className="text-sm text-primary font-medium">
                      Selecionados: {selectedFlavors.map(f => f.name).join(', ')} ({selectedFlavors.length}/{maxFlavors})
                    </p>
                  </div>
                )}

                {/* Flavor list */}
                <div className="flex-1 p-4 pt-2 space-y-2">
                  {filteredPizzas.map((pizza) => {
                    const isSelected = selectedFlavors.some(f => f.id === pizza.id)
                    const isDisabled = !isSelected && selectedFlavors.length >= maxFlavors
                    const price = pizza.sizes.find(s => s.size === selectedSize)?.price || 0
                    
                    return (
                      <button
                        key={pizza.id}
                        onClick={() => handleToggleFlavor({ id: pizza.id, name: pizza.name })}
                        disabled={isDisabled}
                        className={cn(
                          "w-full p-3 rounded-xl border flex items-start gap-3 text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : isDisabled
                            ? "border-border bg-muted/50 opacity-50"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                        )}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-foreground">{pizza.name}</p>
                            <span className="text-sm font-medium text-primary whitespace-nowrap">
                              R$ {price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                            {pizza.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step: Border */}
            {step === 'border' && (
              <div className="p-4 space-y-2">
                {borderOptions.map((border) => {
                  const isSelected = selectedBorder.id === border.id
                  return (
                    <button
                      key={border.id}
                      onClick={() => setSelectedBorder(border)}
                      className={cn(
                        "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <CircleDot className={cn(
                          "w-5 h-5",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className="font-medium text-foreground">{border.name}</span>
                      </div>
                      {border.price > 0 && (
                        <span className="text-sm font-medium text-primary">
                          + R$ {border.price.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Step: Review */}
            {step === 'review' && (
              <div className="p-4 space-y-4">
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Pizza className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        Pizza {selectedSize && sizeConfig[selectedSize].label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedSize && sizeConfig[selectedSize].serves}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sabores:</p>
                      <ul className="mt-1 space-y-1">
                        {selectedFlavors.map((flavor) => (
                          <li key={flavor.id} className="text-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {flavor.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedBorder.price > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Borda:</p>
                        <p className="text-foreground">{selectedBorder.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      R$ {calculatePrice().toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== 'size' && (
            <div className="p-4 border-t border-border flex-shrink-0 bg-background">
              {step === 'flavors' && (
                <Button
                  onClick={goNext}
                  disabled={selectedFlavors.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continuar com {selectedFlavors.length} sabor{selectedFlavors.length !== 1 ? 'es' : ''}
                </Button>
              )}
              {step === 'border' && (
                <Button
                  onClick={goNext}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continuar
                </Button>
              )}
              {step === 'review' && (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Adicionar ao carrinho - R$ {calculatePrice().toFixed(2).replace('.', ',')}
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
