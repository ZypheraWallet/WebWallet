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
                    onClick={() => window.location.href = "/api/auth/signin/google"}
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