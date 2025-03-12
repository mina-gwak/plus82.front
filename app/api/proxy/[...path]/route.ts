import { NextRequest } from 'next/server'

async function handleRequest(
  request: NextRequest,
  paramsProp: Promise<{ path: string[] }>,
  method: string,
) {
  try {
    const params = await paramsProp
    const path = params.path.join('/')
    const contentType = request.headers.get('Content-Type') || ''
    const authorization = request.headers.get('authorization') || ''

    const body = method !== 'GET' ? await request.json() : undefined

    const options: RequestInit = {
      method,
      headers: {
        ...(authorization && {
          Authorization: authorization,
        }),
        'Content-Type': contentType,
      },
      ...(method !== 'GET' && {
        body: JSON.stringify(body),
      }),
    }

    const response = await fetch(`${process.env.API_URL}/${path}`, {
      ...options,
    })

    const data = await response.json()

    return Response.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error:', error)

    return Response.json(
      {
        message:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    )
  }
}

// HTTP 메서드별 핸들러
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, 'PUT')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, 'PATCH')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, 'DELETE')
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
