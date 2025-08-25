'use client'
import React from 'react';
import { useBalanceStore } from '@/store/wallet/balanceStore';
import { Button } from '@/components/ui/button';
const Page = () => {
    const { balance, deposit } = useBalanceStore();

    return (
        <div className='h-screen flex flex-col gap-3 items-center justify-center'>
            {balance}
            <div className='flex gap-3'>
                <Button onClick={()=> {deposit(10000)}}>+10000$</Button>
            </div>
        </div>
    );
};

export default Page;