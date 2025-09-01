'use client'
import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const AuthCard = () => {

    const handleGoogleLogin = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}` + '/api/v1/auth/providers/google/getLink', {
                method: 'GET',
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to get Google login link')

            const data = await res.json()
            const { url } = data

            const popup = window.open(
                url,
                "googleLogin",
                "width=500,height=600"
            )

            const listener = (event: MessageEvent) => {
                if (event.origin !== process.env.NEXT_PUBLIC_FRONTEND_URL) return
                if (event.data.type === "google-auth-success") {
                    console.log("Tokens:", event.data)

                    localStorage.setItem("zyphera_access", event.data.accessToken)
                    localStorage.setItem("zyphera_refresh", event.data.refreshToken)

                    window.removeEventListener("message", listener)
                    popup?.close()
                }
            }

            window.addEventListener("message", listener)

        } catch (err) {
            console.error(err)
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
                >
                    Войти через Google <FcGoogle />
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
