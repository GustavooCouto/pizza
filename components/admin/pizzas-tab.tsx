'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Leaf, Flame, X } from 'lucide-react'
import { useAdmin } from '@/components/admin-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pizza, PizzaSizeOption } from '@/lib/types'

const defaultSizes: PizzaSizeOption[] = [
  { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
  { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
  { size: 'media', label: 'Media', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
  { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
]

const categories = [
  { value: 'tradicional', label: 'Tradicional' },
  { value: 'nobre', label: 'Nobre' },
  { value: 'premium', label: 'Premium' },
  { value: 'doce', label: 'Doce' },
]

export function PizzasTab() {
  const { pizzas, addPizza, updatePizza, deletePizza } = useAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '/images/pizzas/placeholder.jpg',
    category: 'tradicional',
    isVegetarian: false,
    isSpicy: false,
    sizes: [...defaultSizes],
  })

  const filteredPizzas = filterCategory === 'all'
    ? pizzas
    : pizzas.filter((p) => p.category === filterCategory)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '/images/pizzas/placeholder.jpg',
      category: 'tradicional',
      isVegetarian: false,
      isSpicy: false,
      sizes: [...defaultSizes],
    })
    setEditingPizza(null)
  }

  const openNewDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (pizza: Pizza) => {
    setEditingPizza(pizza)
    setFormData({
      name: pizza.name,
      description: pizza.description,
      image: pizza.image,
      category: pizza.category,
      isVegetarian: pizza.isVegetarian || false,
      isSpicy: pizza.isSpicy || false,
      sizes: [...pizza.sizes],
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name || !formData.description) return

    if (editingPizza) {
      await updatePizza(editingPizza.id, formData)
    } else {
      await addPizza(formData)
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = async () => {
    if (deleteId) {
      await deletePizza(deleteId)
      setDeleteId(null)
    }
  }

  const updateSizePrice = (sizeIndex: number, price: number) => {
    const newSizes = [...formData.sizes]
    newSizes[sizeIndex].price = price
    setFormData({ ...formData, sizes: newSizes })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            {filteredPizzas.length} pizza(s)
          </span>
        </div>
        <Button onClick={openNewDialog} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Pizza
        </Button>
      </div>

      {/* Pizzas Grid */}
      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
          {filteredPizzas.map((pizza) => (
            <Card key={pizza.id} className="border-border overflow-hidden">
              <div className="relative h-32 bg-muted">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {pizza.isVegetarian && (
                    <Badge className="bg-green-600 text-white">
                      <Leaf className="w-3 h-3" />
                    </Badge>
                  )}
                  {pizza.isSpicy && (
                    <Badge className="bg-red-600 text-white">
                      <Flame className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{pizza.name}</h3>
                    <Badge variant="outline" className="text-xs mt-1">
                      {categories.find((c) => c.value === pizza.category)?.label}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(pizza)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setDeleteId(pizza.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {pizza.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  A partir de R$ {pizza.sizes[0].price.toFixed(2).replace('.', ',')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingPizza ? 'Editar Pizza' : 'Nova Pizza'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome da pizza"
              />
            </div>

            <div className="space-y-2">
              <Label>Descricao</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ingredientes e descricao"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/pizzas/nome-pizza.jpg"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isVegetarian}
                  onCheckedChange={(v) => setFormData({ ...formData, isVegetarian: v })}
                />
                <Label className="flex items-center gap-1">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Vegetariana
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isSpicy}
                  onCheckedChange={(v) => setFormData({ ...formData, isSpicy: v })}
                />
                <Label className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-red-600" />
                  Picante
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Precos por Tamanho</Label>
              <div className="grid grid-cols-2 gap-3">
                {formData.sizes.map((size, index) => (
                  <div key={size.size} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-16">{size.label}</span>
                    <Input
                      type="number"
                      step="0.10"
                      value={size.price}
                      onChange={(e) => updateSizePrice(index, parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              {editingPizza ? 'Salvar Alteracoes' : 'Adicionar Pizza'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusao</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta pizza? Esta acao nao pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
