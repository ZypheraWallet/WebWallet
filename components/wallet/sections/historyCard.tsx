'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useBalanceStore } from '@/store/wallet/balanceStore';


const HistoryCard = () => {
    const { showBalance, currencySymbol } = useBalanceStore();
    return (
        <Card className="lg:w-1/3 rounded-2xl max-lg:bg-card/50 shadow-sm border border-border backdrop-blur">
            <CardHeader>
                <CardTitle>Операции</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 2xl:grid-cols-3 gap-3 justify-between'>
                <div className='w-full max-lg:col-span-2 bg-accent rounded-xl p-3 space-y-2 max-lg:block max-2xl:hidden'>
                    <p className='text-lg font-medium'>Все операции</p>
                    <p className={`${showBalance ? '' : 'blur-xs'} duration-500 font-mono text-xs`}>
                        132.000,00{currencySymbol}
                    </p>
                </div>
                <div className='w-full bg-accent rounded-xl p-3 space-y-2'>
                    <p className='text-lg font-medium'>Траты</p>
                    <p className={`${showBalance ? '' : 'blur-xs'} duration-500 font-mono text-xs`}>
                        32.000,00{currencySymbol}
                    </p>
                </div>
                <div className='w-full bg-accent rounded-xl p-3 space-y-2'>
                    <p className='text-lg font-medium'>Доходы</p>
                    <p className={`${showBalance ? '' : 'blur-xs'} duration-500 font-mono text-xs`}>
                        50.000,00₽
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;
