import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
const ProfileCard = () => {
    return (
        <Card className='lg::w-1/2 max-lg:hidden'>
            <CardContent className='w-full h-full flex flex-col justify-center gap-6'>
                <div className='flex max-xl:flex-col items-center justify-start gap-6'>
                    <Avatar className='w-20 h-20'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className=''>
                        <p className='text-xl'>Kollusion</p>
                        <p className='text-sm font-mono text-muted-foreground'>@kollusion.dark</p>
                    </div>
                </div>
                <Button variant={'outline'} className='w-full max-xl:hidden'>Профиль</Button>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;