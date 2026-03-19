import { Pizza, Drink, Extra, BorderOption } from './types'

export const pizzas: Pizza[] = [
  // TRADICIONAIS
  {
    id: 'frango',
    name: 'Frango',
    description: 'Muçarela, molho de tomate, frango desfiado e orégano',
    image: '/images/pizzas/frango.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 25.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 39.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 54.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'calabresa',
    name: 'Calabresa',
    description: 'Muçarela, molho de tomate, calabresa fatiada e orégano',
    image: '/images/pizzas/calabresa.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 25.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 39.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 54.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'paulista',
    name: 'Paulista',
    description: 'Muçarela, molho de tomate, milho, catupiry e orégano',
    image: '/images/pizzas/paulista.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 27.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 42.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 57.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'frango-catupiry',
    name: 'Frango com Catupiry',
    description: 'Muçarela, molho de tomate, frango desfiado, catupiry e orégano',
    image: '/images/pizzas/frango-catupiry.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'caipira',
    name: 'Caipira',
    description: 'Muçarela, molho de tomate, frango, milho, cheddar e orégano',
    image: '/images/pizzas/caipira.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'napolitana',
    name: 'Napolitana',
    description: 'Muçarela, molho de tomate, azeitonas, cebola, alho e óleo, tomate e orégano',
    image: '/images/pizzas/napolitana.jpg',
    category: 'tradicional',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 27.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 42.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 57.90, serves: '3-4 pessoas', maxFlavors: 4 },
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
      { size: 'broto', label: 'Broto', price: 23.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 36.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 49.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'marguerita',
    name: 'Marguerita',
    description: 'Muçarela, molho de tomate, tomate, manjericão e orégano',
    image: '/images/pizzas/margherita.jpg',
    category: 'tradicional',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 27.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 42.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 57.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'crocante',
    name: 'Crocante',
    description: 'Muçarela, molho de tomate, bacon, milho, batata palha e orégano',
    image: '/images/pizzas/crocante.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'alho-oleo',
    name: 'Alho e Óleo',
    description: 'Muçarela, molho de tomate, alho e óleo e orégano',
    image: '/images/pizzas/alho-oleo.jpg',
    category: 'tradicional',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 25.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 39.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 54.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'bacon',
    name: 'Bacon',
    description: 'Muçarela, molho de tomate, bacon e orégano',
    image: '/images/pizzas/bacon.jpg',
    category: 'tradicional',
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },

  // NOBRES
  {
    id: 'havaiana',
    name: 'Havaiana',
    description: 'Muçarela, molho de tomate, lombo, abacaxi e orégano',
    image: '/images/pizzas/havaiana.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 32.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 49.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 64.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'lombo-especial',
    name: 'Lombo Especial',
    description: 'Muçarela, molho de tomate, lombo, amendoim, bacon, figo e orégano',
    image: '/images/pizzas/lombo-especial.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'frate-nobre',
    name: 'Fraté Nobre',
    description: 'Muçarela, molho de tomate, frango desfiado, bacon, pimentão, palmito, tomate, temperos especiais, catupiry e orégano',
    image: '/images/pizzas/frate-nobre.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 36.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 54.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 72.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'kruger',
    name: 'Kruger',
    description: 'Muçarela, molho de tomate, frango, calabresa, bacon, milho, ervilha e orégano',
    image: '/images/pizzas/kruger.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'canadense',
    name: 'Canadense',
    description: 'Muçarela, molho de tomate, lombo, champignon, catupiry e orégano',
    image: '/images/pizzas/canadense.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'pizzaiolo',
    name: 'Pizzaiolo',
    description: 'Muçarela, molho de tomate, calabresa, cebola, azeitonas e orégano',
    image: '/images/pizzas/pizzaiolo.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 32.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 49.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 64.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'primavera',
    name: 'Primavera',
    description: 'Muçarela, molho de tomate, presunto, milho, ervilha, cebola, bacon, maionese especial e orégano',
    image: '/images/pizzas/primavera.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'portuguesa',
    name: 'Portuguesa',
    description: 'Muçarela, molho de tomate, presunto, cebola, ovo, tomate e orégano',
    image: '/images/pizzas/portuguesa.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 32.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 49.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 64.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'brocolis',
    name: 'Brócolis',
    description: 'Muçarela, molho de tomate, brócolis refogado, alho e orégano',
    image: '/images/pizzas/brocolis.jpg',
    category: 'nobre',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 32.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 49.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 64.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'italiana',
    name: 'Italiana',
    description: 'Muçarela, molho de tomate, salame italiano',
    image: '/images/pizzas/italiana.jpg',
    category: 'nobre',
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'mexicana',
    name: 'Mexicana',
    description: 'Muçarela, molho de tomate, carne moída (levemente apimentada), doritos e orégano',
    image: '/images/pizzas/mexicana.jpg',
    category: 'nobre',
    isSpicy: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 34.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 52.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 69.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },

  // PREMIUM
  {
    id: 'strogonoff-gado',
    name: 'Strogonoff de Gado',
    description: 'Muçarela, molho de tomate, strogonoff de gado, champignon, batata palha e orégano',
    image: '/images/pizzas/strogonoff.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 39.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 59.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 79.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'file-mostarda',
    name: 'Filé na Mostarda',
    description: 'Muçarela, molho de tomate, filé picado, mostarda e orégano',
    image: '/images/pizzas/file-mostarda.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 42.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 64.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 84.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'barbecue-lendario',
    name: 'Barbecue Lendário',
    description: 'Muçarela, molho de tomate, filé, bacon, cebola, pimentão, cheddar, barbecue e orégano',
    image: '/images/pizzas/barbecue-lendario.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 44.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 67.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 89.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'barbecue-tradicional',
    name: 'Barbecue Tradicional',
    description: 'Muçarela, molho de tomate, filé, barbecue e orégano',
    image: '/images/pizzas/barbecue-tradicional.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 39.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 59.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 79.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'frade-premium',
    name: 'Frade Premium',
    description: 'Muçarela, molho de tomate, frango desfiado, palmito, bacon, pimentão, tempero especial, cream cheese, tomate, manjericão e orégano',
    image: '/images/pizzas/frade-premium.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 44.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 67.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 89.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'costela-desfiada',
    name: 'Costela Desfiada',
    description: 'Muçarela, molho de tomate, costela bovina desfiada, geleia de laranja (pimenta leve) e orégano',
    image: '/images/pizzas/costela-desfiada.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 46.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 69.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 94.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'coracao',
    name: 'Coração',
    description: 'Muçarela, molho de tomate, coração ao creme de alho e orégano',
    image: '/images/pizzas/coracao.jpg',
    category: 'premium',
    sizes: [
      { size: 'broto', label: 'Broto', price: 42.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 64.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 84.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },

  // DOCES
  {
    id: 'chocofesta',
    name: 'Chocofesta',
    description: 'Chocolate preto e confetes',
    image: '/images/pizzas/chocofesta.jpg',
    category: 'doce',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 27.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 42.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 57.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'chocoberry',
    name: 'Chocoberry',
    description: 'Chocolate preto e morangos frescos',
    image: '/images/pizzas/chocoberry.jpg',
    category: 'doce',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'pina-chocolate',
    name: 'Pina Chocolate',
    description: 'Chocolate preto e abacaxi em calda',
    image: '/images/pizzas/pina-chocolate.jpg',
    category: 'doce',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 27.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 42.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 57.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'casadinho',
    name: 'Casadinho',
    description: 'Chocolate preto e chocolate branco',
    image: '/images/pizzas/casadinho.jpg',
    category: 'doce',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
    ]
  },
  {
    id: 'banoffee',
    name: 'Banoffee',
    description: 'Banana, chocolate branco, doce de leite e canela',
    image: '/images/pizzas/banoffee.jpg',
    category: 'doce',
    isVegetarian: true,
    sizes: [
      { size: 'broto', label: 'Broto', price: 29.90, serves: '1 pessoa', maxFlavors: 1 },
      { size: 'media', label: 'Média', price: 44.90, serves: '2 pessoas', maxFlavors: 3 },
      { size: 'grande', label: 'Grande', price: 59.90, serves: '3-4 pessoas', maxFlavors: 4 },
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
    id: 'suco-uva',
    name: 'Suco de Uva Integral',
    description: 'Suco de uva integral',
    image: '/images/drinks/suco-uva.jpg',
    price: 12.90,
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
  {
    id: 'agua-com-gas',
    name: 'Água com Gás',
    description: 'Água mineral com gás',
    image: '/images/drinks/agua-gas.jpg',
    price: 5.90,
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
  {
    id: 'borda-chocolate',
    name: 'Borda de Chocolate',
    description: 'Borda recheada com chocolate ao leite',
    image: '/images/extras/borda-chocolate.jpg',
    price: 14.90,
    category: 'borda'
  },
]

export const borderOptions: BorderOption[] = [
  { id: 'sem-borda', name: 'Sem borda recheada', price: 0 },
  { id: 'borda-cheddar', name: 'Borda de Cheddar', price: 12.90 },
  { id: 'borda-catupiry', name: 'Borda de Catupiry', price: 12.90 },
  { id: 'borda-chocolate', name: 'Borda de Chocolate', price: 14.90 },
]

export const categories = [
  { id: 'tradicional', name: 'Tradicionais', description: 'Sabores clássicos que nunca saem de moda' },
  { id: 'nobre', name: 'Nobres', description: 'Combinações especiais e sofisticadas' },
  { id: 'premium', name: 'Premium', description: 'Ingredientes nobres e exclusivos' },
  { id: 'doce', name: 'Doces', description: 'Para adoçar seu momento' },
]

export const DELIVERY_FEE = 8.90
export const WHATSAPP_NUMBER = '5546911158681'
