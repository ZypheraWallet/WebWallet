'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import AuthCard from '@/components/auth/Card';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import QrCodePlaceholder from '@/components/auth/QrCodePlaceholder';
import { isLoggedIn, setSession, getSession, isAccessTokenValid } from '@/utils/session';
import { toast } from "sonner"
import { openPopupCentered } from '@/utils/window';

const AuthPage = () => {
    const router = useRouter()
    const [googleButtonState, setGoogleButtonState] = useState<'loading' | 'expectation' | null>(null)

    useEffect(() => {
        if (isLoggedIn() && isAccessTokenValid(getSession()?.accessToken)) {
            router.replace('/')
        }
    }, [router])

    const handleGoogleLogin = async () => {
        try {
            setGoogleButtonState('loading')

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/providers/google/getLink`, {
                method: 'GET',
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to get Google login link')

            const data = await res.json()
            const { url } = data

            setGoogleButtonState('expectation')

            const popup = openPopupCentered(url, "googleLogin", 500, 600);

            if (!popup) {
                setGoogleButtonState(null)
                return
            }

            const listener = (event: MessageEvent) => {
                if (event.origin !== process.env.NEXT_PUBLIC_SERVER_URL) return
                if (event.data.type === "google-auth-success") {

                    setSession({
                        accessToken: event.data.accessToken,
                        refreshToken: event.data.refreshToken
                    })

                    window.removeEventListener("message", listener)
                    popup?.close()
                    setGoogleButtonState(null)

                    router.replace('/')
                }
            }

            window.addEventListener("message", listener)

        } catch (err) {
            console.error(err)
            setGoogleButtonState(null)
            toast.error('Ошибка при авторизации через Google')
        }
    }

    return (
        <>
            <section className='w-full min-h-screen flex justify-center items-center'>
                <AuthCard>
                    <GoogleLoginButton
                        state={googleButtonState}
                        onClick={handleGoogleLogin}
                    />
                    <QrCodePlaceholder />
                </AuthCard>
            </section>
        </>
    );
};

export default AuthPage;