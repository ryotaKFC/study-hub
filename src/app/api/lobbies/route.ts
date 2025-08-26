import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const { name } = await req.json()

  const { data, error } = await supabaseServer
    .from('lobbies')
    .insert([{ name }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ lobby: data })
}
