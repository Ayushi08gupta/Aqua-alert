import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Allow access to auth pages and home page without authentication
  const publicPaths = ['/', '/auth/login', '/auth/signup', '/auth/verify-email']
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
