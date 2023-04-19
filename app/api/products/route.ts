/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server'

const baseUrl = 'https://fakestoreapi.com/products'

export async function GET() {
  const data = await fetch(baseUrl).then((res) => res.json())

  return NextResponse.json(data)
}
