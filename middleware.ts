import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const isProtectedRoute = req.nextUrl.pathname.startsWith('/admin/dashboard')
  const isValid = token && verifyToken(token)

  if (isProtectedRoute && !isValid) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'],
}
