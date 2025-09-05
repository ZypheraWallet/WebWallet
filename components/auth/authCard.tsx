import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

interface AuthCardProps {
    children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className='text-center'>
                <CardTitle className="text-xl">Вход в Zyphera</CardTitle>
                <CardDescription>
                    Добро пожаловать! Чтобы продолжить авторизируйтесь
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {children}
            </CardContent>
        </Card>
    );
};

export default AuthCard;