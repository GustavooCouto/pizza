import { Pizza, Drink, Extra, BorderOption, PizzaSize } from './types'

// Configuração dos tamanhos de pizza
export const pizzaSizes: {
  size: PizzaSize
  label: string
  description: string
  price: number
  pedacos: number
  maxFlavors: number
  brinde?: string
}[] = [
  { 
    size: 'mini', 
    label: 'Pizza Mini', 
    description: '4 pedaços - 1 sabor - aproximadamente 20cm.',
    price: 32.00,
    pedacos: 4,
    maxFlavors: 1 
  },
  { 
    size: 'pequena', 
    label: 'Pizza Pequena', 
    description: '6 pedaços - 2 sabores - aproximadamente 25cm.',
    price: 50.00,
    pedacos: 6,
    maxFlavors: 2 
  },
  { 
    size: 'media', 
    label: 'Pizza Média', 
    description: '8 pedaços - 3 sabores - aproximadamente 35cm.',
    price: 60.00,
    pedacos: 8,
    maxFlavors: 3 
  },
  { 
    size: 'grande', 
    label: 'Pizza Grande', 
    description: '12 pedaços - 4 sabores - aproximadamente 40cm e refrigerante de brinde!',
    price: 75.00,
    pedacos: 12,
    maxFlavors: 4,
    brinde: 'refrigerante'
  },
]

// Sabores de pizzas organizados por categoria
export const pizzaFlavors = {
  salgadas: [
    { id: 'alema', name: 'Alemã', ingredients: 'mussarela, bacon, ovo, orégano.' },
    { id: 'alho', name: 'Alho', ingredients: 'mussarela, alho, parmesão, manjericão, orégano.' },
    { id: 'alho-oleo', name: 'Alho e óleo', ingredients: 'mussarela, alho, óleo, orégano.' },
    { id: 'americana', name: 'Americana', ingredients: 'mussarela, presunto, calabresa, creme de leite, orégano.' },
    { id: 'atum', name: 'Atum', ingredients: 'mussarela, atum, cebola, orégano.' },
    { id: 'atumpiry', name: 'Atumpiry', ingredients: 'mussarela, atum, cebola, orégano, catupiry.' },
    { id: 'bacon', name: 'Bacon', ingredients: 'mussarela, bacon, orégano.' },
    { id: 'bacon-supreme', name: 'Bacon supreme', ingredients: 'mussarela, bacon, champignon, catupiry, azeitona, orégano.' },
    { id: 'baiana', name: 'Baiana', ingredients: 'mussarela, calabresa, pimenta, cebola, orégano.' },
    { id: 'bolonhesa', name: 'Bolonhesa', ingredients: 'mussarela, carne moída, cebola, tomate, orégano.' },
    { id: 'calabresa', name: 'Calabresa', ingredients: 'mussarela, calabresa, cebola, orégano.' },
    { id: 'calabresa-catupiry', name: 'Calabresa catupiry', ingredients: 'mussarela, calabresa, catupiry, orégano.' },
    { id: 'camarao', name: 'Camarão', ingredients: 'mussarela, camarão, catupiry, orégano.' },
    { id: 'canadense', name: 'Canadense', ingredients: 'mussarela, lombo, champignon, catupiry, orégano.' },
    { id: 'carbonara', name: 'Carbonara', ingredients: 'mussarela, bacon, creme de leite, parmesão, orégano.' },
    { id: 'carne-seca', name: 'Carne seca', ingredients: 'mussarela, carne seca, catupiry, cebola, orégano.' },
    { id: 'catupiry', name: 'Catupiry', ingredients: 'mussarela, catupiry, orégano.' },
    { id: 'cinco-queijos', name: 'Cinco queijos', ingredients: 'mussarela, provolone, parmesão, gorgonzola, catupiry, orégano.' },
    { id: 'coracao', name: 'Coração', ingredients: 'mussarela, coração de frango, catupiry, orégano.' },
    { id: 'escarola', name: 'Escarola', ingredients: 'mussarela, escarola refogada, alho, orégano.' },
    { id: 'frango', name: 'Frango', ingredients: 'mussarela, frango desfiado, orégano.' },
    { id: 'frango-catupiry', name: 'Frango catupiry', ingredients: 'mussarela, frango desfiado, catupiry, orégano.' },
    { id: 'lombo', name: 'Lombo', ingredients: 'mussarela, lombo, cebola, orégano.' },
    { id: 'margherita', name: 'Margherita', ingredients: 'mussarela, tomate, manjericão, orégano.' },
    { id: 'milho', name: 'Milho', ingredients: 'mussarela, milho, orégano.' },
    { id: 'mussarela', name: 'Mussarela', ingredients: 'mussarela, orégano.' },
    { id: 'napolitana', name: 'Napolitana', ingredients: 'mussarela, tomate, parmesão, orégano.' },
    { id: 'palmito', name: 'Palmito', ingredients: 'mussarela, palmito, catupiry, orégano.' },
    { id: 'pepperoni', name: 'Pepperoni', ingredients: 'mussarela, pepperoni, orégano.' },
    { id: 'portuguesa', name: 'Portuguesa', ingredients: 'mussarela, presunto, ovo, cebola, ervilha, orégano.' },
    { id: 'presunto', name: 'Presunto', ingredients: 'mussarela, presunto, orégano.' },
    { id: 'quatro-queijos', name: 'Quatro queijos', ingredients: 'mussarela, provolone, parmesão, catupiry, orégano.' },
    { id: 'strogonoff', name: 'Strogonoff', ingredients: 'mussarela, strogonoff de frango, batata palha, orégano.' },
    { id: 'toscana', name: 'Toscana', ingredients: 'mussarela, calabresa, bacon, cebola, orégano.' },
    { id: 'vegetariana', name: 'Vegetariana', ingredients: 'mussarela, brócolis, milho, palmito, tomate, orégano.' },
  ],
  doces: [
    { id: 'banana-canela', name: 'Banana com canela', ingredients: 'banana, canela, leite condensado.' },
    { id: 'brigadeiro', name: 'Brigadeiro', ingredients: 'chocolate, granulado, leite condensado.' },
    { id: 'chocolate', name: 'Chocolate', ingredients: 'chocolate ao leite, leite condensado.' },
    { id: 'chocolate-branco', name: 'Chocolate branco', ingredients: 'chocolate branco, leite condensado.' },
    { id: 'chocolate-morango', name: 'Chocolate com morango', ingredients: 'chocolate, morango, leite condensado.' },
    { id: 'doce-leite', name: 'Doce de leite', ingredients: 'doce de leite, coco ralado.' },
    { id: 'prestigio', name: 'Prestígio', ingredients: 'chocolate, coco ralado, leite condensado.' },
    { id: 'romeu-julieta', name: 'Romeu e Julieta', ingredients: 'mussarela, goiabada, orégano.' },
  ],
}

export const pizzas: Pizza[] = [
  // TRADICIONAIS
  {
    id: 'frango',
    name: 'Frango',
    description: 'Muçarela, molho de tomate, frango desfiado e orégano',
    image: '/images/pizzas/frango.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
      { size: 'media', label: 'Média', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
      
    ]
  },
  {
    id: 'calabresa',
    name: 'Calabresa',
    description: 'Muçarela, molho de tomate, calabresa fatiada e orégano',
    image: '/images/pizzas/calabresa.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
      { size: 'media', label: 'Média', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
      
    ]
  },
  {
    id: 'paulista',
    name: 'Paulista',
    description: 'Muçarela, molho de tomate, milho, catupiry e orégano',
    image: '/images/pizzas/paulista.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
      { size: 'media', label: 'Média', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
      
    ]
  },
  {
    id: 'frango-catupiry',
    name: 'Frango com Catupiry',
    description: 'Muçarela, molho de tomate, frango desfiado, catupiry e orégano',
    image: '/images/pizzas/frango-catupiry.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
      { size: 'media', label: 'Média', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
      
    ]
  },
  {
    id: 'mucarela',
    name: 'Muçarela',
    description: 'Muçarela, molho de tomate e orégano',
    image: '/images/pizzas/mucarela.jpg',
    category: 'tradicional',
    isVegetarian: true,
    sizes: [
      { size: 'mini', label: 'Mini', price: 32.00, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'pequena', label: 'Pequena', price: 50.00, serves: '2 pessoas', maxFlavors: 2 },
      { size: 'media', label: 'Média', price: 60.00, serves: '3 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 75.00, serves: '4 pessoas', maxFlavors: 4 },
      
    ]
  },
]

export const drinks: Drink[] = [
  {
    id: 'coca-cola-lata',
    name: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola lata',
    image: '/images/drinks/coca-cola.jpg',
    price: 6.90,
    volume: '350ml',
    category: 'refrigerante'
  },
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante Coca-Cola garrafa',
    image: '/images/drinks/coca-cola-2l.jpg',
    price: 14.90,
    volume: '2L',
    category: 'refrigerante'
  },
  {
    id: 'guarana-lata',
    name: 'Guaraná Antarctica',
    description: 'Refrigerante Guaraná Antarctica lata',
    image: '/images/drinks/guarana.jpg',
    price: 6.90,
    volume: '350ml',
    category: 'refrigerante'
  },
  {
    id: 'guarana-2l',
    name: 'Guaraná Antarctica 2L',
    description: 'Refrigerante Guaraná Antarctica garrafa',
    image: '/images/drinks/guarana-2l.jpg',
    price: 12.90,
    volume: '2L',
    category: 'refrigerante'
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    description: 'Suco natural de laranja',
    image: '/images/drinks/suco-laranja.jpg',
    price: 9.90,
    volume: '500ml',
    category: 'suco'
  },
  {
    id: 'agua-sem-gas',
    name: 'Água Mineral',
    description: 'Água mineral sem gás',
    image: '/images/drinks/agua.jpg',
    price: 4.90,
    volume: '500ml',
    category: 'agua'
  },
]

export const extras: Extra[] = [
  {
    id: 'borda-cheddar',
    name: 'Borda de Cheddar',
    description: 'Borda recheada com cheddar cremoso',
    image: '/images/extras/borda-cheddar.jpg',
    price: 12.90,
    category: 'borda'
  },
  {
    id: 'borda-catupiry',
    name: 'Borda de Catupiry',
    description: 'Borda recheada com catupiry original',
    image: '/images/extras/borda-catupiry.jpg',
    price: 12.90,
    category: 'borda'
  },
]

export const borderOptions: BorderOption[] = [
  { id: 'sem-borda', name: 'Sem borda recheada', price: 0 },
  { id: 'borda-cheddar', name: 'Borda de Cheddar', price: 12.90 },
  { id: 'borda-catupiry', name: 'Borda de Catupiry', price: 12.90 },
]

export const categories = [
  { id: 'tradicional', name: 'Tradicionais', description: 'Sabores clássicos que nunca saem de moda' },
  { id: 'nobre', name: 'Nobres', description: 'Combinações especiais e sofisticadas' },
  { id: 'premium', name: 'Premium', description: 'Ingredientes nobres e exclusivos' },
  { id: 'doce', name: 'Doces', description: 'Para adoçar seu momento' },
]

export const DELIVERY_FEE = 8.90
export const WHATSAPP_NUMBER = '5546911158681'
