'use client'

import { useState } from 'react'
import { 
  MessageCircle, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Loader2, 
  Truck, 
  Store,
  User,
  Phone,
  ArrowLeft,
  ArrowRight,
  Check
} from 'lucide-react'
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
type Step = 'auth' | 'login' | 'register' | 'guest' | 'review' | 'address' | 'payment'

function isPizzaItem(item: PizzaCartItem | DrinkCartItem): item is PizzaCartItem {
  return item.type === 'pizza'
}

export function CheckoutModal({ open, onOpenChange, total: initialTotal }: CheckoutModalProps) {
  const { items, clearCart, setIsOpen, getTotal } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<Step>('auth')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    street: '',
    number: '',
    neighborhood: '',
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

  const resetForm = () => {
    setStep('auth')
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      paymentMethod: 'pix',
      deliveryType: 'entrega',
      change: '',
    })
  }

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
    const fullAddress = formData.deliveryType === 'entrega' 
      ? `${formData.street}, ${formData.number} - ${formData.neighborhood}${formData.complement ? ` (${formData.complement})` : ''}`
      : ''

    let message = `*NOVO PEDIDO - SAPORE ARTESANAL*

*Cliente:* ${formData.name || 'Nao informado'}
*Telefone:* ${formData.phone}

*Tipo:* ${deliveryLabel}`

    if (formData.deliveryType === 'entrega') {
      message += `
*Endereco:* ${fullAddress}`
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

  const handleSubmit = () => {
    setIsLoading(true)

    const message = formatWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
    
    setTimeout(() => {
      clearCart()
      setIsOpen(false)
      onOpenChange(false)
      setIsLoading(false)
      resetForm()
    }, 1000)
  }

  const canProceedFromAuth = step === 'auth'
  const canProceedFromGuest = formData.phone.length >= 10
  const canProceedFromLogin = formData.email && formData.password
  const canProceedFromRegister = formData.name && formData.phone && formData.email && formData.password
  const canProceedFromAddress = formData.deliveryType === 'retirada' || (formData.street && formData.number && formData.neighborhood)

  // Step: Auth Selection
  const renderAuthStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">Como deseja continuar?</h3>
        <p className="text-sm text-muted-foreground mt-1">Escolha uma opcao para finalizar seu pedido</p>
      </div>

      <button
        onClick={() => setStep('login')}
        className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">Fazer Login</h4>
          <p className="text-sm text-muted-foreground">Ja tenho cadastro</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      <button
        onClick={() => setStep('register')}
        className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
      >
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
          <User className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">Criar Conta</h4>
          <p className="text-sm text-muted-foreground">Quero me cadastrar</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ou</span>
        </div>
      </div>

      <button
        onClick={() => setStep('guest')}
        className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-muted-foreground/30 hover:bg-muted/30 transition-all text-left group"
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Phone className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">Continuar sem Cadastro</h4>
          <p className="text-sm text-muted-foreground">Apenas informe seu telefone</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  )

  // Step: Login
  const renderLoginStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('auth')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Entrar na sua conta</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="login-email">E-mail</Label>
          <Input
            id="login-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Senha</Label>
          <Input
            id="login-password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
          />
        </div>
      </div>

      <Button
        onClick={() => setStep('review')}
        disabled={!canProceedFromLogin}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Entrar
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  // Step: Register
  const renderRegisterStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('auth')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Criar sua conta</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="register-name">Nome completo *</Label>
          <Input
            id="register-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-phone">WhatsApp *</Label>
          <Input
            id="register-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">E-mail *</Label>
          <Input
            id="register-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Senha *</Label>
          <Input
            id="register-password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Crie uma senha"
          />
        </div>
      </div>

      <Button
        onClick={() => setStep('review')}
        disabled={!canProceedFromRegister}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Criar Conta
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  // Step: Guest (just phone)
  const renderGuestStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('auth')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Continuar sem Cadastro</h3>
        <p className="text-sm text-muted-foreground mt-1">Precisamos apenas do seu telefone</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="guest-phone">WhatsApp *</Label>
          <Input
            id="guest-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
          <p className="text-xs text-muted-foreground">Enviaremos atualizacoes do seu pedido por este numero</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guest-name">Nome (opcional)</Label>
          <Input
            id="guest-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Como podemos te chamar?"
          />
        </div>
      </div>

      <Button
        onClick={() => setStep('review')}
        disabled={!canProceedFromGuest}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Continuar
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  // Step: Review Order
  const renderReviewStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('auth')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Revisao do Pedido</h3>
      </div>

      {/* Items */}
      <div className="bg-muted/50 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-sm">
            <div className="flex-1">
              {isPizzaItem(item) ? (
                <>
                  <span className="font-medium">{item.quantity}x Pizza {item.sizeLabel}</span>
                  <p className="text-xs text-muted-foreground">{item.flavors.map(f => f.name).join(', ')}</p>
                </>
              ) : (
                <span className="font-medium">{item.quantity}x {item.name}</span>
              )}
            </div>
            <span className="text-muted-foreground">
              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery Type */}
      <div className="space-y-2">
        <Label>Tipo de pedido</Label>
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

      {/* Summary */}
      <div className="bg-muted/50 rounded-xl p-3 space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        {formData.deliveryType === 'entrega' && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Taxa de entrega</span>
            <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <Button
        onClick={() => setStep('address')}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {formData.deliveryType === 'entrega' ? 'Informar Endereco' : 'Escolher Pagamento'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  // Step: Address
  const renderAddressStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('review')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          {formData.deliveryType === 'entrega' ? 'Endereco de Entrega' : 'Forma de Pagamento'}
        </h3>
      </div>

      {formData.deliveryType === 'entrega' && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="street">Rua *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Nome da rua"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Numero *</Label>
            <Input
              id="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              placeholder="Numero"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro *</Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              placeholder="Bairro"
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
        </div>
      )}

      <Button
        onClick={() => setStep('payment')}
        disabled={formData.deliveryType === 'entrega' && !canProceedFromAddress}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Continuar
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  // Step: Payment
  const renderPaymentStep = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setStep('address')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="text-center mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Forma de Pagamento</h3>
      </div>

      <div className="space-y-2">
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

      {/* Final Summary */}
      <div className="bg-muted/50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cliente</span>
          <span>{formData.name || formData.phone}</span>
        </div>
        {formData.deliveryType === 'entrega' && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Endereco</span>
            <span className="text-right text-xs max-w-[60%]">
              {formData.street}, {formData.number} - {formData.neighborhood}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tipo</span>
          <span>{formData.deliveryType === 'entrega' ? 'Entrega' : 'Retirada'}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <MessageCircle className="w-4 h-4 mr-2" />
        )}
        Enviar Pedido via WhatsApp
      </Button>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 'auth':
        return renderAuthStep()
      case 'login':
        return renderLoginStep()
      case 'register':
        return renderRegisterStep()
      case 'guest':
        return renderGuestStep()
      case 'review':
        return renderReviewStep()
      case 'address':
        return renderAddressStep()
      case 'payment':
        return renderPaymentStep()
      default:
        return renderAuthStep()
    }
  }

  // Progress indicator
  const getStepNumber = () => {
    if (step === 'auth' || step === 'login' || step === 'register' || step === 'guest') return 1
    if (step === 'review') return 2
    if (step === 'address') return 3
    if (step === 'payment') return 4
    return 1
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm()
      onOpenChange(open)
    }}>
      <DialogContent className="sm:max-w-md bg-background max-h-[90vh] overflow-y-auto p-0">
        {/* Progress bar */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= getStepNumber() ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
