import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path=== 'forgot-password'
    const token = request.cookies.get('access_token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/admin/Home', request.url))
    }

    if (!isPublicPath && !token) {    
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/forget-password',
        '/user',
        '/admin',
        '/admin/:path*',
        '/user/:path*',
    ]
}