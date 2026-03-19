'use client'

import { useState, useEffect } from 'react'
import { X, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { pizzaSizes, pizzaFlavors, borderOptions } from '@/lib/menu-data'
import { PizzaSize } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PizzaOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialSize?: PizzaSize | null
}

type FlavorCategory = 'salgadas' | 'doces'

export function PizzaOrderModal({ open, onOpenChange, initialSize }: PizzaOrderModalProps) {
  const { addPizza } = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null)
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>({})
  const [selectedBorder, setSelectedBorder] = useState(borderOptions[0])
  const [quantity, setQuantity] = useState(1)
  const [expandedCategory, setExpandedCategory] = useState<FlavorCategory>('salgadas')

  // Set initial size when modal opens
  useEffect(() => {
    if (open && initialSize) {
      setSelectedSize(initialSize)
    }
  }, [open, initialSize])

  const sizeConfig = selectedSize ? pizzaSizes.find(s => s.size === selectedSize) : null
  const maxFlavors = sizeConfig?.maxFlavors || 0
  
  // Calculate total selected flavors
  const totalSelectedFlavors = Object.values(flavorCounts).reduce((sum, count) => sum + count, 0)

  const handleFlavorIncrement = (flavorId: string) => {
    if (totalSelectedFlavors >= maxFlavors) return
    setFlavorCounts(prev => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1
    }))
  }

  const handleFlavorDecrement = (flavorId: string) => {
    setFlavorCounts(prev => {
      const newCount = (prev[flavorId] || 0) - 1
      if (newCount <= 0) {
        const { [flavorId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [flavorId]: newCount }
    })
  }

  const calculatePrice = () => {
    if (!sizeConfig || totalSelectedFlavors === 0) return 0
    const basePrice = sizeConfig.price
    const borderPrice = selectedBorder.price
    return (basePrice + borderPrice) * quantity
  }

  const getSelectedFlavorsForCart = () => {
    const flavors: { id: string; name: string }[] = []
    const allFlavors = [...pizzaFlavors.salgadas, ...pizzaFlavors.doces]
    
    Object.entries(flavorCounts).forEach(([id, count]) => {
      const flavor = allFlavors.find(f => f.id === id)
      if (flavor) {
        for (let i = 0; i < count; i++) {
          flavors.push({ id: flavor.id, name: flavor.name })
        }
      }
    })
    return flavors
  }

  const handleAddToCart = () => {
    if (!selectedSize || totalSelectedFlavors === 0) return
    
    for (let i = 0; i < quantity; i++) {
      addPizza({
        type: 'pizza',
        size: selectedSize,
        sizeLabel: sizeConfig?.label || '',
        flavors: getSelectedFlavorsForCart(),
        border: selectedBorder.price > 0 ? selectedBorder : undefined,
        price: calculatePrice() / quantity,
      })
    }
    
    resetAndClose()
  }

  const resetAndClose = () => {
    setSelectedSize(null)
    setFlavorCounts({})
    setSelectedBorder(borderOptions[0])
    setQuantity(1)
    setExpandedCategory('salgadas')
    onOpenChange(false)
  }

  const renderFlavorList = (category: FlavorCategory) => {
    const flavors = pizzaFlavors[category]
    const isExpanded = expandedCategory === category

    return (
      <div className="border-b border-border">
        {/* Category Header */}
        <button
          onClick={() => setExpandedCategory(isExpanded ? (category === 'salgadas' ? 'doces' : 'salgadas') : category)}
          className="w-full flex items-center justify-between p-4 bg-muted/30"
        >
          <span className="font-semibold text-foreground">
            {category === 'salgadas' ? 'Salgadas' : 'Doces'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">sabores</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Flavor Items */}
        {isExpanded && (
          <div className="divide-y divide-border">
            {flavors.map((flavor) => {
              const count = flavorCounts[flavor.id] || 0
              const canAdd = totalSelectedFlavors < maxFlavors

              return (
                <div
                  key={flavor.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-medium text-foreground">{flavor.name}</p>
                    <p className="text-sm text-muted-foreground">{flavor.ingredients}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleFlavorDecrement(flavor.id)}
                      disabled={count === 0}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                        count > 0
                          ? "text-muted-foreground hover:bg-muted"
                          : "text-muted-foreground/30 cursor-not-allowed"
                      )}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-medium text-foreground">
                      {count}
                    </span>
                    <button
                      onClick={() => handleFlavorIncrement(flavor.id)}
                      disabled={!canAdd}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                        canAdd
                          ? "text-muted-foreground hover:bg-muted"
                          : "text-muted-foreground/30 cursor-not-allowed"
                      )}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" hideCloseButton className="h-[90vh] sm:h-[85vh] p-0 rounded-t-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-lg font-bold text-foreground">
                  Sabores
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Clique em um grupo para visualizar os sabores.
                </p>
              </div>
              <button onClick={resetAndClose} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>

          {/* Size Info */}
          {sizeConfig && (
            <div className="px-4 py-3 bg-muted/30 border-b border-border flex-shrink-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{sizeConfig.label}</span>
                {' - '}
                Escolha até {maxFlavors} sabor{maxFlavors > 1 ? 'es' : ''}
                {' '}
                <span className="text-primary font-medium">
                  ({totalSelectedFlavors}/{maxFlavors})
                </span>
              </p>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {renderFlavorList('salgadas')}
            {renderFlavorList('doces')}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border flex-shrink-0 bg-background">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <Button
                onClick={handleAddToCart}
                disabled={totalSelectedFlavors === 0}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
              >
                Adicionar (R$ {calculatePrice().toFixed(2).replace('.', ',')})
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
