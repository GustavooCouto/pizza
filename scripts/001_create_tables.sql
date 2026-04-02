-- Tabela de pizzas
CREATE TABLE IF NOT EXISTS pizzas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '/images/pizzas/placeholder.jpg',
  category TEXT NOT NULL DEFAULT 'tradicional',
  is_vegetarian BOOLEAN DEFAULT false,
  is_spicy BOOLEAN DEFAULT false,
  sizes JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de bebidas
CREATE TABLE IF NOT EXISTS drinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '/images/drinks/placeholder.jpg',
  price DECIMAL(10,2) NOT NULL,
  volume TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('refrigerante', 'suco', 'cerveja', 'agua')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_street TEXT,
  customer_number TEXT,
  customer_neighborhood TEXT,
  customer_complement TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('dinheiro', 'cartao', 'pix')),
  change_amount DECIMAL(10,2),
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('entrega', 'retirada')),
  items JSONB NOT NULL DEFAULT '[]',
  total DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivering', 'delivered')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indices para busca
CREATE INDEX IF NOT EXISTS idx_pizzas_category ON pizzas(category);
CREATE INDEX IF NOT EXISTS idx_drinks_category ON drinks(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_pizzas_updated_at ON pizzas;
CREATE TRIGGER update_pizzas_updated_at
  BEFORE UPDATE ON pizzas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_drinks_updated_at ON drinks;
CREATE TRIGGER update_drinks_updated_at
  BEFORE UPDATE ON drinks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Desabilitar RLS para permitir acesso público (pizzaria simples sem autenticação de usuários)
ALTER TABLE pizzas DISABLE ROW LEVEL SECURITY;
ALTER TABLE drinks DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
