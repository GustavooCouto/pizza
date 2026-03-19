'use client'

import { useState } from 'react'
import { MessageCircle, CreditCard, Banknote, QrCode, Loader2, Truck, Store } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WHATSAPP_NUMBER, DELIVERY_FEE } from '@/lib/menu-data'
import { cn } from '@/lib/utils'
import { PizzaCartItem, DrinkCartItem } from '@/lib/types'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
}

type PaymentMethod = 'pix' | 'cartao' | 'dinheiro'
type DeliveryType = 'entrega' | 'retirada'

function isPizzaItem(item: PizzaCartItem | DrinkCartItem): item is PizzaCartItem {
  return item.type === 'pizza'
}

export function CheckoutModal({ open, onOpenChange, total: initialTotal }: CheckoutModalProps) {
  const { items, clearCart, setIsOpen, getTotal } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    complement: '',
    paymentMethod: 'pix' as PaymentMethod,
    deliveryType: 'entrega' as DeliveryType,
    change: '',
  })

  const subtotal = getTotal()
  const deliveryFee = formData.deliveryType === 'entrega' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const deliveryOptions = [
    { id: 'entrega', label: 'Entrega', icon: Truck },
    { id: 'retirada', label: 'Retirada', icon: Store },
  ] as const

  const paymentMethods = [
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'cartao', label: 'Cartao', icon: CreditCard },
    { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
  ] as const

  const formatWhatsAppMessage = () => {
    const itemsList = items
      .map((item) => {
        if (isPizzaItem(item)) {
          const flavors = item.flavors.map(f => f.name).join(', ')
          const border = item.border ? ` + ${item.border.name}` : ''
          return `- ${item.quantity}x Pizza ${item.sizeLabel} (${flavors})${border}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`
        } else {
          return `- ${item.quantity}x ${item.name}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`
        }
      })
      .join('\n')

    const paymentLabel = {
      pix: 'PIX',
      cartao: 'Cartao',
      dinheiro: `Dinheiro${formData.change ? ` (Troco para R$ ${formData.change})` : ''}`,
    }[formData.paymentMethod]

    const deliveryLabel = formData.deliveryType === 'entrega' ? 'Entrega' : 'Retirada no local'

    let message = `*NOVO PEDIDO - SAPORE ARTESANAL*

*Cliente:* ${formData.name}
*Telefone:* ${formData.phone}

*Tipo:* ${deliveryLabel}`

    if (formData.deliveryType === 'entrega') {
      message += `
*Endereco:* ${formData.address}
${formData.complement ? `*Complemento:* ${formData.complement}` : ''}`
    }

    message += `

*Itens do Pedido:*
${itemsList}
`

    if (formData.deliveryType === 'entrega') {
      message += `
*Taxa de Entrega:* R$ ${DELIVERY_FEE.toFixed(2).replace('.', ',')}`
    }

    message += `
*TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}

*Forma de Pagamento:* ${paymentLabel}`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const message = formatWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
    
    setTimeout(() => {
      clearCart()
      setIsOpen(false)
      onOpenChange(false)
      setIsLoading(false)
      setFormData({
        name: '',
        phone: '',
        address: '',
        complement: '',
        paymentMethod: 'pix',
        deliveryType: 'entrega',
        change: '',
      })
    }, 1000)
  }

  const isFormValid = formData.name && formData.phone && 
    (formData.deliveryType === 'retirada' || formData.address)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Finalizar Pedido</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de pedido *</Label>
            <div className="grid grid-cols-2 gap-2">
              {deliveryOptions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: id })}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                    formData.deliveryType === id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.deliveryType === 'entrega' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="address">Endereco de entrega *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, numero, bairro"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  placeholder="Apto, bloco, referencia"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Forma de pagamento *</Label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: id })}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                    formData.paymentMethod === id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.paymentMethod === 'dinheiro' && (
            <div className="space-y-2">
              <Label htmlFor="change">Troco para quanto?</Label>
              <Input
                id="change"
                value={formData.change}
                onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                placeholder="R$ 100,00"
              />
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {formData.deliveryType === 'entrega' && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Taxa de entrega</span>
                <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total a pagar:</span>
              <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4 mr-2" />
            )}
            Enviar Pedido via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
