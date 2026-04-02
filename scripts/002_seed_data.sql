-- Inserir pizzas iniciais
INSERT INTO pizzas (id, name, description, image, category, is_vegetarian, is_spicy, sizes) VALUES
(gen_random_uuid(), 'Frango', 'Muçarela, molho de tomate, frango desfiado e orégano', '/images/pizzas/frango.jpg', 'tradicional', false, false, 
  '[{"size": "mini", "label": "Mini", "price": 32.00, "serves": "1 pessoa", "maxFlavors": 1}, {"size": "pequena", "label": "Pequena", "price": 50.00, "serves": "2 pessoas", "maxFlavors": 2}, {"size": "media", "label": "Média", "price": 60.00, "serves": "3 pessoas", "maxFlavors": 3}, {"size": "grande", "label": "Grande", "price": 75.00, "serves": "4 pessoas", "maxFlavors": 4}]'::jsonb),
  
(gen_random_uuid(), 'Calabresa', 'Muçarela, molho de tomate, calabresa fatiada e orégano', '/images/pizzas/calabresa.jpg', 'tradicional', false, false,
  '[{"size": "mini", "label": "Mini", "price": 32.00, "serves": "1 pessoa", "maxFlavors": 1}, {"size": "pequena", "label": "Pequena", "price": 50.00, "serves": "2 pessoas", "maxFlavors": 2}, {"size": "media", "label": "Média", "price": 60.00, "serves": "3 pessoas", "maxFlavors": 3}, {"size": "grande", "label": "Grande", "price": 75.00, "serves": "4 pessoas", "maxFlavors": 4}]'::jsonb),

(gen_random_uuid(), 'Paulista', 'Muçarela, molho de tomate, milho, catupiry e orégano', '/images/pizzas/paulista.jpg', 'tradicional', false, false,
  '[{"size": "mini", "label": "Mini", "price": 32.00, "serves": "1 pessoa", "maxFlavors": 1}, {"size": "pequena", "label": "Pequena", "price": 50.00, "serves": "2 pessoas", "maxFlavors": 2}, {"size": "media", "label": "Média", "price": 60.00, "serves": "3 pessoas", "maxFlavors": 3}, {"size": "grande", "label": "Grande", "price": 75.00, "serves": "4 pessoas", "maxFlavors": 4}]'::jsonb),

(gen_random_uuid(), 'Frango com Catupiry', 'Muçarela, molho de tomate, frango desfiado, catupiry e orégano', '/images/pizzas/frango-catupiry.jpg', 'tradicional', false, false,
  '[{"size": "mini", "label": "Mini", "price": 32.00, "serves": "1 pessoa", "maxFlavors": 1}, {"size": "pequena", "label": "Pequena", "price": 50.00, "serves": "2 pessoas", "maxFlavors": 2}, {"size": "media", "label": "Média", "price": 60.00, "serves": "3 pessoas", "maxFlavors": 3}, {"size": "grande", "label": "Grande", "price": 75.00, "serves": "4 pessoas", "maxFlavors": 4}]'::jsonb),

(gen_random_uuid(), 'Muçarela', 'Muçarela, molho de tomate e orégano', '/images/pizzas/mucarela.jpg', 'tradicional', true, false,
  '[{"size": "mini", "label": "Mini", "price": 32.00, "serves": "1 pessoa", "maxFlavors": 1}, {"size": "pequena", "label": "Pequena", "price": 50.00, "serves": "2 pessoas", "maxFlavors": 2}, {"size": "media", "label": "Média", "price": 60.00, "serves": "3 pessoas", "maxFlavors": 3}, {"size": "grande", "label": "Grande", "price": 75.00, "serves": "4 pessoas", "maxFlavors": 4}]'::jsonb)

ON CONFLICT DO NOTHING;

-- Inserir bebidas iniciais
INSERT INTO drinks (id, name, description, image, price, volume, category) VALUES
(gen_random_uuid(), 'Coca-Cola', 'Refrigerante Coca-Cola lata', '/images/drinks/coca-cola.jpg', 6.90, '350ml', 'refrigerante'),
(gen_random_uuid(), 'Coca-Cola 2L', 'Refrigerante Coca-Cola garrafa', '/images/drinks/coca-cola-2l.jpg', 14.90, '2L', 'refrigerante'),
(gen_random_uuid(), 'Guaraná Antarctica', 'Refrigerante Guaraná Antarctica lata', '/images/drinks/guarana.jpg', 6.90, '350ml', 'refrigerante'),
(gen_random_uuid(), 'Guaraná Antarctica 2L', 'Refrigerante Guaraná Antarctica garrafa', '/images/drinks/guarana-2l.jpg', 12.90, '2L', 'refrigerante'),
(gen_random_uuid(), 'Suco de Laranja', 'Suco natural de laranja', '/images/drinks/suco-laranja.jpg', 9.90, '500ml', 'suco'),
(gen_random_uuid(), 'Água Mineral', 'Água mineral sem gás', '/images/drinks/agua.jpg', 4.90, '500ml', 'agua')
ON CONFLICT DO NOTHING;
