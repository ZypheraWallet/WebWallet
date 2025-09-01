'use client'
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { AppWindow, LoaderCircle } from 'lucide-react';

import { useRouter } from 'next/navigation'
import { isLoggedIn, setSession, getSession, isAccessTokenValid } from '@/utils/session';

type LoginButton = {
    state: 'loading' | 'expectation' | null
}

const AuthCard = () => {
    const router = useRouter()

    const [googleButton, EditGoogleButton] = useState<LoginButton>({ state: null })

    useEffect(() => {
        if (isLoggedIn() && isAccessTokenValid(getSession()?.accessToken)) {
            router.replace('/')
        }
    }, [router])

    const handleGoogleLogin = async () => {
        try {
            EditGoogleButton({ state: 'loading' })

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/providers/google/getLink`, {
                method: 'GET',
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to get Google login link')

            const data = await res.json()
            const { url } = data

            EditGoogleButton({ state: 'expectation' })

            const popup = window.open(
                url,
                "googleLogin",
                "width=500,height=600"
            )

            if (!popup) {
                EditGoogleButton({ state: null })
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

                    EditGoogleButton({ state: null })

                    router.replace('/')
                }
            }

            window.addEventListener("message", listener)

        } catch (err) {
            console.error(err)
            EditGoogleButton({ state: null })
            alert('Ошибка при авторизации через Google')
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className='text-center'>
                <CardTitle className="text-xl">Вход в Zyphera</CardTitle>
                <CardDescription>Добро пожаловать! Чтобы продолжить авторизируйтесь</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
                <Button
                    variant="outline"
                    size={'lg'}
                    onClick={handleGoogleLogin}
                    disabled={googleButton.state === 'loading' || googleButton.state === 'expectation'}
                >
                    {
                        googleButton.state === 'loading' &&
                        <>
                            Загрузка <LoaderCircle className='animate-spin' />
                        </>
                    }
                    {
                        googleButton.state === 'expectation' &&
                        <>
                            Авторизируйтесь в окне <AppWindow />
                        </>
                    }
                    {
                        googleButton.state == null &&
                        <>
                            Войти через Google <FcGoogle />
                        </>
                    }
                </Button>
                <p className='text-center text-muted-foreground text-sm'>или</p>
                <div>
                    <div className='w-40 h-40 bg-muted mx-auto rounded-xl animate-pulse'></div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AuthCard;
