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
            const res = await fetch('https://main-server-gray.vercel.app/api/v1/auth/providers/google/getLink', {
                method: 'GET',
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to get Google login link')

            const data = await res.json()
            const { url } = data

            window.location.href = url
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
