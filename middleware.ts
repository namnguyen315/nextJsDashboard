import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { useAppDispatch } from './lib/hook'
import { userLogin } from './lib/features/user/userSlice'
 
export function middleware(request: NextRequest) {

    const url = request.nextUrl.pathname
    const isLogin = request.cookies.get('token')?.value


    const checkRouterAuth = (url: string):boolean => {
        const routerAuth = ['/login', '/register','/verifyOTP',"/forgotPassword","/resetPassword"]
        return (routerAuth.some((route) => url.startsWith(route)))
    }

    if (isLogin) {
        if (checkRouterAuth(url)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }
    if (isLogin === undefined || isLogin === "") {   
        if (checkRouterAuth(url)) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL(url === "/dashboard" ? "/login" : `/login?url=${url}` , request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register','/verifyOTP',"/forgotPassword","/resetPassword" ],
}