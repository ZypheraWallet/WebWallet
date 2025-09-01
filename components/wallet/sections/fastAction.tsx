import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { HandHelping, Plus, QrCode, Send } from 'lucide-react';

const FastAction = () => {
    return (
        <Card className='lg:w-1/3 max-lg:bg-card/0 max-lg:border-0 max-lg:shadow-none'>
            <CardHeader className='max-lg:hidden'>
                <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className='w-full flex justify-center gap-6 lg:justify-between lg:py-5'>
                <Button size={'iconxl'} variant={'ghost'} className='flex-col gap-1.5 text-[9px] font-medium '>
                    <Send className='size-6' />
                    Отправить
                </Button>
                <Button size={'iconxl'} variant={'ghost'} className='flex-col gap-1.5 text-[9px] font-medium'>
                    <Plus className='size-6' />
                    Пополнить
                </Button>
                <Button size={'iconxl'} variant={'ghost'} className='flex-col gap-1.5 text-[9px] font-medium max-xl:hidden'>
                    <HandHelping className='size-6' />
                    Запросить
                </Button>
                <Button size={'iconxl'} variant={'ghost'} className='flex-col gap-1.5 text-[9px] font-medium'>
                    <QrCode className='size-6' />
                    Сканировать
                </Button>
            </CardContent>
        </Card>
    );
};

export default FastAction;