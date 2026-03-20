-- Inserir configurações da loja
INSERT INTO store_settings (whatsapp_number, delivery_fee, store_name, store_open)
VALUES ('5546911158681', 8.90, 'Sapore Artesanal', true)
ON CONFLICT DO NOTHING;

-- Inserir pizzas
INSERT INTO pizzas (name, description, image, category, is_vegetarian, price_mini, price_pequena, price_media, price_grande) VALUES
('Frango', 'Muçarela, molho de tomate, frango desfiado e orégano', '/images/pizzas/frango.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Calabresa', 'Muçarela, molho de tomate, calabresa fatiada e orégano', '/images/pizzas/calabresa.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Paulista', 'Muçarela, molho de tomate, milho, catupiry e orégano', '/images/pizzas/paulista.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Frango com Catupiry', 'Muçarela, molho de tomate, frango desfiado, catupiry e orégano', '/images/pizzas/frango-catupiry.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Muçarela', 'Muçarela, molho de tomate e orégano', '/images/pizzas/mucarela.jpg', 'tradicional', true, 32.00, 50.00, 60.00, 75.00),
('Portuguesa', 'Muçarela, presunto, ovo, cebola, ervilha e orégano', '/images/pizzas/portuguesa.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Quatro Queijos', 'Muçarela, provolone, parmesão, catupiry e orégano', '/images/pizzas/quatro-queijos.jpg', 'especial', true, 35.00, 55.00, 68.00, 85.00),
('Pepperoni', 'Muçarela, pepperoni e orégano', '/images/pizzas/pepperoni.jpg', 'especial', false, 35.00, 55.00, 68.00, 85.00),
('Margherita', 'Muçarela, tomate, manjericão e orégano', '/images/pizzas/margherita.jpg', 'tradicional', true, 32.00, 50.00, 60.00, 75.00),
('Bacon', 'Muçarela, bacon crocante e orégano', '/images/pizzas/bacon.jpg', 'tradicional', false, 32.00, 50.00, 60.00, 75.00),
('Chocolate', 'Chocolate ao leite e leite condensado', '/images/pizzas/chocolate.jpg', 'doce', true, 32.00, 50.00, 60.00, 75.00),
('Brigadeiro', 'Chocolate, granulado e leite condensado', '/images/pizzas/brigadeiro.jpg', 'doce', true, 32.00, 50.00, 60.00, 75.00)
ON CONFLICT DO NOTHING;

-- Inserir bebidas
INSERT INTO drinks (name, description, image, price, volume, category) VALUES
('Coca-Cola', 'Refrigerante Coca-Cola lata', '/images/drinks/coca-cola.jpg', 6.90, '350ml', 'refrigerante'),
('Coca-Cola 2L', 'Refrigerante Coca-Cola garrafa', '/images/drinks/coca-cola-2l.jpg', 14.90, '2L', 'refrigerante'),
('Guaraná Antarctica', 'Refrigerante Guaraná Antarctica lata', '/images/drinks/guarana.jpg', 6.90, '350ml', 'refrigerante'),
('Guaraná Antarctica 2L', 'Refrigerante Guaraná Antarctica garrafa', '/images/drinks/guarana-2l.jpg', 12.90, '2L', 'refrigerante'),
('Suco de Laranja', 'Suco natural de laranja', '/images/drinks/suco-laranja.jpg', 9.90, '500ml', 'suco'),
('Água Mineral', 'Água mineral sem gás', '/images/drinks/agua.jpg', 4.90, '500ml', 'agua')
ON CONFLICT DO NOTHING;
