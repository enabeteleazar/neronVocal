import { NextResponse } from 'next/server'
import { runtimeConfig } from '@/lib/config'

export async function GET() {
  try {
    const headers: Record<string, string> = {}
    if (runtimeConfig.apiKey) headers['X-API-Key'] = runtimeConfig.apiKey
    const response = await fetch(`${runtimeConfig.coreUrl}/self-model/context`, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    const payload = await response.json()
    return NextResponse.json(payload.identity ?? {}, { status: response.status })
  } catch {
    return NextResponse.json({}, { status: 502 })
  }
}
