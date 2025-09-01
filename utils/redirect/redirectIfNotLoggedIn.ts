'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '../session'

export const useRedirectIfNotLoggedIn = () => {
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/auth')
        }
    }, [router])
}
