-- Adicionar coluna sizes como JSONB na tabela pizzas
ALTER TABLE pizzas ADD COLUMN IF NOT EXISTS sizes JSONB;

-- Atualizar a coluna sizes com os dados dos preços existentes
UPDATE pizzas SET sizes = jsonb_build_array(
  jsonb_build_object('size', 'mini', 'label', 'Mini', 'price', price_mini, 'serves', '1 pessoa', 'maxFlavors', 1),
  jsonb_build_object('size', 'pequena', 'label', 'Pequena', 'price', price_pequena, 'serves', '2 pessoas', 'maxFlavors', 2),
  jsonb_build_object('size', 'media', 'label', 'Media', 'price', price_media, 'serves', '3 pessoas', 'maxFlavors', 3),
  jsonb_build_object('size', 'grande', 'label', 'Grande', 'price', price_grande, 'serves', '4 pessoas', 'maxFlavors', 4)
) WHERE sizes IS NULL;

-- Renomear active para available
ALTER TABLE pizzas RENAME COLUMN active TO available;
ALTER TABLE drinks RENAME COLUMN active TO available;

-- Adicionar colunas que faltam na tabela orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_complement TEXT;

-- Migrar dados de street, number, neighborhood para delivery_address
UPDATE orders SET delivery_address = CONCAT(street, ', ', number, ' - ', neighborhood) 
WHERE delivery_address IS NULL AND street IS NOT NULL;

UPDATE orders SET delivery_complement = complement 
WHERE delivery_complement IS NULL AND complement IS NOT NULL;

-- Adicionar colunas que faltam na tabela order_items
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS item_details JSONB;

-- Migrar dados de price para unit_price
UPDATE order_items SET unit_price = price WHERE unit_price IS NULL;
UPDATE order_items SET total_price = price * quantity WHERE total_price IS NULL;

-- Migrar item_details
UPDATE order_items SET item_details = jsonb_build_object(
  'size', size,
  'flavors', flavors,
  'border', border
) WHERE item_details IS NULL AND item_type = 'pizza';

-- Adicionar colunas de estatísticas na tabela customers
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_orders INTEGER DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS total_spent DECIMAL(10,2) DEFAULT 0;
