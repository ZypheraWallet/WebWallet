'use client'
import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import WalletCard from '../props/wallet';
import CreateWalletOverlay from '../modals/newProducts';
import ForNewUser from '../modals/forNewUser';
import { Wallet2 } from 'lucide-react';

import { useWalletsStore } from '@/store/wallet/walletsStore';
import { useCreateWalletOverlayStore } from '@/store/modals/walletsModalStore';
import { useNewUserOverlayStore } from '@/store/modals/walletsModalStore';

const AccountsCard = () => {
    const { wallets, fetchWallets, loading } = useWalletsStore();
    const { openOverlay: openCreateWalletOverlay } = useCreateWalletOverlayStore();
    const { openOverlay: openNewUserOverlay } = useNewUserOverlayStore();

    useEffect(() => {
        fetchWallets();
        if (true) {
            openNewUserOverlay()
        }
    }, [fetchWallets]);

    const handleNewProduct = () => {
        openCreateWalletOverlay()
    }

    return (
        <>
            <ForNewUser />
            <CreateWalletOverlay />
            <Card className="lg:w-2/3 h-max max-lg:bg-card/20 max-lg:border-0 max-lg:shadow-none max-lg:py-0">
                <CardHeader className="max-lg:hidden">
                    <CardTitle>Счета</CardTitle>
                    <CardAction>
                        <Button
                            variant={'link'} size={'sm'}
                            onClick={() => { handleNewProduct() }}
                        >
                            <Wallet2 />
                            Новый продукт
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent className="w-full max-lg:flex lg:grid lg:grid-cols-2 xl:grid-cols-3 max-lg:flex-col justify-center gap-3 lg:justify-between max-lg:px-0">
                    {loading ? (
                        <>
                            <div className="w-full h-20 bg-accent/50 rounded-xl animate-pulse"></div>
                            <div className="w-full h-20 bg-accent/50 rounded-xl animate-pulse"></div>
                        </>
                    ) : (
                        wallets.map((wallet) => (
                            <WalletCard key={wallet._id} wallet={wallet} />
                        ))
                    )}

                    <Button
                        size={'xl'} variant={'secondary'} className="lg:hidden"
                        onClick={() => { handleNewProduct() }}
                    >
                        <Wallet2 />
                        Новый продукт
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default AccountsCard;