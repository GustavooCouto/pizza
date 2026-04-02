import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Transform the body to match database schema
    const orderData = {
      customer_name: body.customerInfo?.name,
      customer_phone: body.customerInfo?.phone,
      customer_email: body.customerInfo?.email,
      customer_street: body.customerInfo?.address?.street,
      customer_number: body.customerInfo?.address?.number,
      customer_neighborhood: body.customerInfo?.address?.neighborhood,
      customer_complement: body.customerInfo?.address?.complement,
      payment_method: body.paymentMethod,
      change_amount: body.changeAmount,
      delivery_type: body.deliveryType,
      items: body.items,
      total: body.total,
      delivery_fee: body.deliveryFee || 0,
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
