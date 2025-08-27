import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|auth).*)',
    ],
}

export async function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get('zyphera_refresh')?.value
    const accessToken = req.cookies.get('zyphera_access')?.value

    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    if (accessToken) {
        try {
            const decoded: any = jwt.decode(accessToken)
            const now = Math.floor(Date.now() / 1000)

            if (decoded?.exp && decoded.exp - now > 60) {
                return NextResponse.next()
            }
        } catch (err) {
            // Ignore error
        }
    }

    try {
        const apiUrl = 'https://api.zyphera.vercel.app/api/v1/auth/session/refresh'
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `zyphera_refresh=${refreshToken}`
            },
        })

        if (!res.ok) throw new Error('Failed to refresh token')

        const data = await res.json()
        const newAccessToken = data.accessToken
        const newRefreshToken = data.newRefreshToken

        const response = NextResponse.next()

        response.cookies.set({
            name: 'zyphera_access',
            value: newAccessToken,
            httpOnly: true,
            path: '/',
            maxAge: 15 * 60,
            sameSite: 'lax',
            domain: '.zyphera.vercel.app',
            secure: true,
        })

        response.cookies.set({
            name: 'zyphera_refresh',
            value: newRefreshToken,
            httpOnly: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
            sameSite: 'lax',
            domain: '.zyphera.vercel.app',
            secure: true,
        })

        return response
    } catch (error) {
        console.error('Token refresh failed:', error)
        return NextResponse.redirect(new URL('/auth', req.url))
    }
}
