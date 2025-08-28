import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}

function isTokenValid(accessToken?: string | null, leewaySeconds = 60) {
    if (!accessToken) return false
    try {
        const decoded: any = jwt.decode(accessToken)
        if (!decoded?.exp) return false
        const now = Math.floor(Date.now() / 1000)
        return decoded.exp - now > leewaySeconds
    } catch (e) {
        return false
    }
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone()
    const pathname = url.pathname

    const refreshToken = req.cookies.get('zyphera_refresh')?.value ?? null
    const accessToken = req.cookies.get('zyphera_access')?.value ?? null

    const isProd =
        req.nextUrl.hostname.endsWith('vercel.app') ||
        process.env.NODE_ENV === 'production'

    if (pathname.startsWith('/auth')) {
        if (isTokenValid(accessToken)) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }

    if (isTokenValid(accessToken)) {
        return NextResponse.next()
    }

    if (refreshToken) {
        try {

            const apiUrl = `${process.env.SERVER_URL}/api/v1/auth/session/refresh`

            console.log(apiUrl)

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `zyphera_refresh=${refreshToken}`,
                },
                cache: 'no-store',
            })

            if (!res.ok) throw new Error('Failed to refresh token')

            const data = await res.json()
            const newAccessToken = data.accessToken
            const newRefreshToken = data.newRefreshToken

            const response = NextResponse.next()

            const cookieOptions: any = {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 15 * 60,
            }

            response.cookies.set({
                name: 'zyphera_access',
                value: newAccessToken,
                ...cookieOptions,
            })

            const refreshCookieOptions: any = {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 30 * 24 * 60 * 60,
            }

            if (isProd) {
                refreshCookieOptions.secure = true
                refreshCookieOptions.domain = '.zyphera.vercel.app'
                response.cookies.set({
                    name: 'zyphera_access',
                    value: newAccessToken,
                    ...cookieOptions,
                    secure: true,
                    domain: '.zyphera.vercel.app',
                })
                response.cookies.set({
                    name: 'zyphera_refresh',
                    value: newRefreshToken,
                    ...refreshCookieOptions,
                })
            } else {
                response.cookies.set({
                    name: 'zyphera_refresh',
                    value: newRefreshToken,
                    ...refreshCookieOptions,
                })
            }

            return response
        } catch (err) {
            console.error('Token refresh failed in middleware:', err)
            return NextResponse.redirect(new URL('/auth', req.url))
        }
    }

    return NextResponse.redirect(new URL('/auth', req.url))
}
