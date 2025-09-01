import Cookies from 'js-cookie'

type SessionData = {
    accessToken: string
    refreshToken: string
}

const ACCESS_KEY = 'zyphera_access'
const REFRESH_KEY = 'zyphera_refresh'

/**
 * Установка сессии через cookie
 */
export const setSession = ({ accessToken, refreshToken }: SessionData) => {
    Cookies.set(ACCESS_KEY, accessToken, { expires: 0.0104, sameSite: 'Lax' })
    Cookies.set(REFRESH_KEY, refreshToken, { expires: 30, sameSite: 'Lax' })
}

/**
 * Получение сессии из cookie
 */
export const getSession = (): SessionData | null => {
    const accessToken = Cookies.get(ACCESS_KEY)
    const refreshToken = Cookies.get(REFRESH_KEY)
    if (accessToken && refreshToken) return { accessToken, refreshToken }
    return null
}

/**
 * Очистка сессии
 */
export const clearSession = () => {
    Cookies.remove(ACCESS_KEY)
    Cookies.remove(REFRESH_KEY)
}

/**
 * Проверка авторизации
 */
export const isLoggedIn = (): boolean => {
    const session = getSession()
    return !!session?.accessToken
}

/**
 * Проверка валидности accessToken
 */
export const isAccessTokenValid = (token?: string): boolean => {
    if (!token) return false
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const now = Math.floor(Date.now() / 1000)
        return payload.exp > now
    } catch {
        return false
    }
}

/**
 * Обновление accessToken через refreshToken
 */
export const refreshSession = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/session/refresh`, {
            method: 'POST',
            credentials: 'include', // cookies должны идти на сервер
        })
        if (!res.ok) throw new Error('Failed to refresh session')
        const data = await res.json()
        setSession({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        })
        return true
    } catch (err) {
        clearSession()
        return false
    }
}

/**
 * Получение валидного accessToken
 * Автоматически обновляет через refreshToken, если expired
 */
export const getValidAccessToken = async (): Promise<string | null> => {
    const session = getSession()
    if (!session) return null

    if (isAccessTokenValid(session.accessToken)) {
        return session.accessToken
    }

    const refreshed = await refreshSession()
    if (refreshed) {
        const newSession = getSession()
        return newSession?.accessToken || null
    }

    return null
}
