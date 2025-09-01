"use client"
import React from 'react';
import BalanceCard from '@/components/wallet/sections/balanceCard';
import FastAction from '@/components/wallet/sections/fastAction';
import AccountsCard from '@/components/wallet/sections/accountsCard';
import HistoryCard from '@/components/wallet/sections/historyCard';
import ProfileCard from '@/components/wallet/sections/profileCard';
import { useRedirectIfNotLoggedIn } from '@/utils/redirect/redirectIfNotLoggedIn';

const page = () => {
    useRedirectIfNotLoggedIn();
    return (
        <main className='mx-auto container min-h-screen max-lg:px-2 flex flex-col gap-6 lg:justify-center items-start'>
            <section className='w-full flex max-lg:flex-col gap-6'>
                <ProfileCard />
                <BalanceCard />
                <FastAction />
            </section>
            <section className='w-full flex max-lg:flex-col gap-6'>
                <AccountsCard />
                <HistoryCard />
            </section>
        </main>
    );
};

export default page;