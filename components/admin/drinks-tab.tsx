'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useAdmin } from '@/components/admin-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
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
import { Drink } from '@/lib/types'

const drinkCategories = [
  { value: 'refrigerante', label: 'Refrigerante' },
  { value: 'suco', label: 'Suco' },
  { value: 'cerveja', label: 'Cerveja' },
  { value: 'agua', label: 'Agua' },
]

export function DrinksTab() {
  const { drinks, addDrink, updateDrink, deleteDrink } = useAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '/images/drinks/placeholder.jpg',
    price: 0,
    volume: '',
    category: 'refrigerante' as Drink['category'],
  })

  const filteredDrinks = filterCategory === 'all'
    ? drinks
    : drinks.filter((d) => d.category === filterCategory)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '/images/drinks/placeholder.jpg',
      price: 0,
      volume: '',
      category: 'refrigerante',
    })
    setEditingDrink(null)
  }

  const openNewDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (drink: Drink) => {
    setEditingDrink(drink)
    setFormData({
      name: drink.name,
      description: drink.description,
      image: drink.image,
      price: drink.price,
      volume: drink.volume,
      category: drink.category,
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.volume || formData.price <= 0) return

    if (editingDrink) {
      updateDrink(editingDrink.id, formData)
    } else {
      const newDrink: Drink = {
        id: `drink-${Date.now()}`,
        ...formData,
      }
      addDrink(newDrink)
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteDrink(deleteId)
      setDeleteId(null)
    }
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
              {drinkCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            {filteredDrinks.length} bebida(s)
          </span>
        </div>
        <Button onClick={openNewDialog} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Bebida
        </Button>
      </div>

      {/* Drinks Grid */}
      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
          {filteredDrinks.map((drink) => (
            <Card key={drink.id} className="border-border overflow-hidden">
              <div className="relative h-28 bg-muted">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {drink.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {drinkCategories.find((c) => c.value === drink.category)?.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{drink.volume}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => openEditDialog(drink)}
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => setDeleteId(drink.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium text-primary mt-2">
                  R$ {drink.price.toFixed(2).replace('.', ',')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingDrink ? 'Editar Bebida' : 'Nova Bebida'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome da bebida"
              />
            </div>

            <div className="space-y-2">
              <Label>Descricao</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descricao da bebida"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v as Drink['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drinkCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Volume</Label>
                <Input
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  placeholder="350ml, 2L..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preco (R$)</Label>
              <Input
                type="number"
                step="0.10"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/drinks/nome-bebida.jpg"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              {editingDrink ? 'Salvar Alteracoes' : 'Adicionar Bebida'}
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
              Tem certeza que deseja excluir esta bebida? Esta acao nao pode ser desfeita.
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
