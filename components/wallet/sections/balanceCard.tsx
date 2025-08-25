'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Eye, EyeClosed } from 'lucide-react';

const BalanceCard = () => {
    const [balanceHidden, setHiddenBalance] = useState<boolean>(false);

    return (
        <Card className='w-full max-lg:bg-card/0 max-lg:border-0 max-lg:shadow-none'>
            <CardHeader className='max-lg:items-center flex justify-between w-full'>
                <CardTitle className='max-lg:hidden'>Баланс</CardTitle>
                <CardTitle className='max-lg:text-2xl font-mono lg:hidden'>Zyphera <span className='text-sm opacity-80'>Beta</span></CardTitle>
                <CardAction>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => { setHiddenBalance(!balanceHidden) }}
                    >
                        {
                            balanceHidden ?
                                <EyeClosed />
                                :
                                <Eye />
                        }
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className='w-full max-lg:mt-9'>
                <div className='lg:text-8xl text-5xl max-lg:text-center font-mono space-y-3'>
                    <p className='text-muted-foreground text-xs lg:hidden'>Доступный баланс</p>
                    {balanceHidden? "•••••" : <span>50.000,<span className='text-4xl lg:text-6xl'>09₽</span></span>}
                </div>
            </CardContent>
        </Card>
    );
};

export default BalanceCard;