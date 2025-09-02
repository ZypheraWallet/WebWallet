import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isAccessTokenValid } from '@/utils/session'

type Props = { children: React.ReactNode }

export async function ProtectedServerComponent({ children }: Props) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('zyphera_access')?.value
    const refreshToken = cookieStore.get('zyphera_refresh')?.value

    const valid = isAccessTokenValid(refreshToken)

    if (!accessToken || !refreshToken || !valid) {
        redirect('/auth')
    }

    return <>{children}</>
}