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

    // получение куки (NextRequest.cookies API)
    const refreshToken = req.cookies.get('zyphera_refresh')?.value ?? null
    const accessToken = req.cookies.get('zyphera_access')?.value ?? null

    const isProd =
        req.nextUrl.hostname.endsWith('vercel.app') ||
        process.env.NODE_ENV === 'production'

    // Если пользователь пытается открыть /auth и у него валидный accessToken — отправляем на главную
    if (pathname.startsWith('/auth')) {
        if (isTokenValid(accessToken)) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        // иначе — позволяем открыть страницу /auth (без попыток рефреша), чтобы избежать лишних вызовов
        return NextResponse.next()
    }

    // Для всех остальных страниц:
    // 1) если есть валидный accessToken — идём дальше
    if (isTokenValid(accessToken)) {
        return NextResponse.next()
    }

    // 2) если accessToken не валидный/отсутствует, но есть refreshToken — пробуем один запрос к refresh endpoint
    if (refreshToken) {
        try {
            // Отправляем один POST запрос в ваш API. Не используем относительный путь чтобы избежать проблем в edge.
            // В проде должен быть абсолютный адрес (в переменных окружения можно положить ROOT_URL).
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
