
-- Make user_id nullable on orders and bookings
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing RLS policies on orders
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

-- Drop existing RLS policies on order_items
DROP POLICY IF EXISTS "Users can create their order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;

-- Drop existing RLS policies on bookings
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete their own bookings" ON public.bookings;

-- Allow anyone to insert orders (no auth required)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Allow anyone to view orders created in last 24 hours
CREATE POLICY "Anyone can view recent orders" ON public.orders FOR SELECT USING (created_at > now() - interval '24 hours');

-- Allow anyone to insert order items
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Allow anyone to view order items for recent orders
CREATE POLICY "Anyone can view recent order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.created_at > now() - interval '24 hours')
);

-- Allow anyone to insert bookings
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Allow anyone to view bookings created in last 24 hours
CREATE POLICY "Anyone can view recent bookings" ON public.bookings FOR SELECT USING (created_at > now() - interval '24 hours');
