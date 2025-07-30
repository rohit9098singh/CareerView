import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/forgot-password'
    
    // Get token and role from cookies
    const token = request.cookies.get('token')?.value
    const role = request.cookies.get('role')?.value

    // Redirect to login if accessing protected route without token
    if (!isPublicPath && !token) {    
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to appropriate home page if accessing auth pages with valid token
    if (isPublicPath && token) {
        const redirectPath = role === 'admin' ? '/admin/Home' : '/student/Home'
        return NextResponse.redirect(new URL(redirectPath, request.url))
    }

    // Allow the request to continue
    return NextResponse.next()
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