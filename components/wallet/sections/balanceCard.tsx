'use client';

import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

import { Eye, EyeClosed } from 'lucide-react';

import { useBalanceStore } from '@/store/wallet/balanceStore';
import { formatBalanceParts } from '@/utils/formatBalance';
import { usePathname } from 'next/navigation';

const BalanceCard = () => {
    const pathname = usePathname();

    const { balance, currencySymbol, showBalance, isLoading, toggleBalanceVisibility, fetchBalance } = useBalanceStore();
    const { intPart, fracPart } = formatBalanceParts(balance);

    useEffect(() => {

        if (pathname !== '/auth') {
            fetchBalance();

            const interval = setInterval(() => {
                fetchBalance();
            }, 20_000);

            return () => clearInterval(interval);
        }
    }, [pathname, fetchBalance]);

    return (
        <Card className='w-full max-lg:bg-card/0 max-lg:border-0 max-lg:shadow-none overflow-hidden'>
            <CardHeader className='max-lg:items-center flex justify-between w-full'>
                <CardTitle className='max-lg:hidden'>Баланс</CardTitle>
                <CardTitle className='max-lg:text-2xl font-mono lg:hidden'>Zyphera <span className='text-sm opacity-80'>Beta</span></CardTitle>
                <CardAction>
                    <Button
                        variant={'outline'}
                        size={'icon'}
                        onClick={toggleBalanceVisibility}
                    >
                        {
                            showBalance ?
                                <Eye />
                                :
                                <EyeClosed />
                        }
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className='w-full max-lg:mt-9 h-full lg:flex items-center'>
                <div className='max-lg:text-center font-mono space-y-3'>
                    <p className='text-muted-foreground text-xs lg:hidden'>Доступный баланс</p>
                    <span className={`duration-500 ${isLoading ? 'animate-pulse' : ''} ${balance >= 1000000 ? 'text-4xl 2xl:text-7xl xl:text-6xl lg:text-5xl' : 'text-5xl lg:text-6xl 2xl:text-8xl xl:text-7xl'} ${showBalance ? '' : 'blur-md lg:blur-xl'}`}>{intPart},<span className='text-4xl xl:text-6xl'>{fracPart}{currencySymbol}</span></span>
                </div>
            </CardContent>
        </Card>
    );
};

export default BalanceCard;