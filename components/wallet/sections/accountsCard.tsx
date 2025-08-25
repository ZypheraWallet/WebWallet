'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

import { Users, Wallet, Wallet2 } from 'lucide-react';

import { useBalanceStore } from '@/store/wallet/balanceStore';

const AccountsCard = () => {
    const { showBalance } = useBalanceStore();

    return (
        <Card className='lg:w-2/3 h-max max-lg:bg-card/20 max-lg:border-0 max-lg:shadow-none max-lg:py-0'>
            <CardHeader className='max-lg:hidden'>
                <CardTitle>Счета</CardTitle>
                <CardAction>
                    <Button variant={'link'} size={'sm'}><Wallet2/>Новый продукт</Button>
                </CardAction>
            </CardHeader>
            <CardContent className='w-full max-lg:flex lg:grid lg:grid-cols-2 xl:grid-cols-3 max-lg:flex-col justify-center gap-3 lg:justify-between max-lg:px-0'>
                <div className='p-3 w-full h-20 bg-accent/50 rounded-xl flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className='rounded-4xl p-3 bg-accent/80'>
                            <Wallet />
                        </div>
                        <div>
                            <p className='font-medium text-sm truncate'>Main Wallet</p>
                            <p className='text-xs text-muted-foreground'>TON кошелёк</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <p className={`${showBalance? '' : 'blur-xs'} duration-500 text-sm`}>
                            400.000,00₽
                        </p>
                        <p className={`${showBalance? '' : 'blur-xs'} duration-500 text-sm text-muted-foreground`}>
                            50 TON
                        </p>
                    </div>

                </div>
                <div className='p-3 w-full h-20 bg-accent/50 rounded-xl flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className='rounded-4xl p-3 bg-accent/80'>
                            <Users />
                        </div>
                        <div>
                            <p className='font-medium text-sm'>Second Wallet</p>
                            <p className='text-xs text-muted-foreground'>Общий кошелёк</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <p className={`${showBalance? '' : 'blur-xs'} duration-500 text-sm`}>
                            10.000,00₽
                        </p>
                        <p className={`${showBalance? '' : 'blur-xs'} duration-500 text-sm text-muted-foreground`}>
                            10 TON
                        </p>
                    </div>
                    
                </div>
                <Button size={'xl'} variant={'secondary'} className='lg:hidden'><Wallet2/>Новый продукт</Button>
            </CardContent>
        </Card>
    );
};

export default AccountsCard;