import { NextResponse } from 'next/server';

export async function middleware(request: any) {
  const path = request.nextUrl?.pathname || '/';
  const token = request.cookies.get('sb-access-token')?.value;

  const publicPaths = ['/', '/login', '/signup', '/username', '/api'];
  const isPublicPath = publicPaths.some(p => p === path || path.startsWith(p + '/'));

  if (!isPublicPath && !token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  if (path.startsWith('/(auth)/') && token) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.svg$).*)',
  ],
};
