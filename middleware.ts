
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}

function isAccessValid(token: string | null | undefined, leewaySeconds = 60) {
    if (!token) return false
    try {
        const decoded = jwt.decode(token) as any | null
        if (!decoded || typeof decoded.exp !== 'number') return false
        const now = Math.floor(Date.now() / 1000)
        return decoded.exp - now > leewaySeconds
    } catch (e) {
        return false
    }
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone()
    const pathname = url.pathname

    const accessToken = req.cookies.get('zyphera_access')?.value ?? null
    const refreshToken = req.cookies.get('zyphera_refresh')?.value ?? null

    if (pathname.startsWith('/auth')) {
        if (accessToken && refreshToken) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    if (isAccessValid(accessToken)) {
        return NextResponse.next()
    }

    try {
        const origin = process.env.SERVER_URL ?? req.nextUrl.origin
        const apiUrl = `${origin}/api/v1/auth/session/refresh`

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Cookie: `zyphera_refresh=${refreshToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        if (!res.ok) {
            return NextResponse.redirect(new URL('/auth', req.url))
        }

        const data = await res.json()
        const newAccessToken = data.accessToken
        const newRefreshToken = data.newRefreshToken

        if (!newAccessToken || !newRefreshToken) {
            return NextResponse.redirect(new URL('/auth', req.url))
        }

        const response = NextResponse.next()

        const isProd =
            process.env.NODE_ENV === 'production' ||
            req.nextUrl.hostname.endsWith('vercel.app')

        const accessOpts: any = {
            httpOnly: true,
            path: '/',
            maxAge: 15 * 60,
            sameSite: 'lax',
            ...(isProd ? { secure: true } : {}),
        }

        const refreshOpts: any = {
            httpOnly: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
            sameSite: 'lax',
            ...(isProd ? { secure: true } : {}),
        }

        response.cookies.set({
            name: 'zyphera_access',
            value: newAccessToken,
            ...accessOpts,
        })

        response.cookies.set({
            name: 'zyphera_refresh',
            value: newRefreshToken,
            ...refreshOpts,
        })

        return response
    } catch (err) {
        console.error('Middleware refresh failed:', err)
        return NextResponse.redirect(new URL('/auth', req.url))
    }
}
