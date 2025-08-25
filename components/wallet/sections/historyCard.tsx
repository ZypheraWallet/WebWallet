import React from 'react';
import {
    Card,
    CardContent,
    CardAction,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { History } from "lucide-react";


const HistoryCard = () => {
    return (
        <Card className="lg:w-1/3 rounded-2xl max-lg:bg-card/50 shadow-sm border border-border backdrop-blur">
            <CardHeader>
                <CardTitle>Операции</CardTitle>
                {/* <CardAction>
                    <Button variant={'link'} size={'sm'}><History />Все операции</Button>
                </CardAction> */}
            </CardHeader>
            <CardContent className='grid grid-cols-2 lg:grid-cols-3 gap-3 justify-between'>
                <div className='w-full max-lg:col-span-2 bg-accent rounded-xl p-3 space-y-2'>
                    <p className='text-lg font-medium'>Все операции</p>
                    <p className='font-mono text-xs'>132.000,00₽</p>
                </div>
                <div className='w-full bg-accent rounded-xl p-3 space-y-2'>
                    <p className='text-lg font-medium'>Траты</p>
                    <p className='font-mono text-xs'>32.000,00₽</p>
                </div>
                <div className='w-full bg-accent rounded-xl p-3 space-y-2'>
                    <p className='text-lg font-medium'>Доходы</p>
                    <p className='font-mono text-xs'>50.000,00₽</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;
