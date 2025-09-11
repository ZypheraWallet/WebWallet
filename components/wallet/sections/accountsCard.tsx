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
import CreateWalletOverlay from '../modals/newProducts';
import ForNewUser from '../modals/forNewUser';
import { Wallet, Wallet2 } from 'lucide-react';

import { useBalanceStore } from '@/store/wallet/balanceStore';
import { useWalletsStore } from '@/store/wallet/walletsStore';
import { useCreateWalletOverlayStore } from '@/store/modals/walletsModalStore';
import { useNewUserOverlayStore } from '@/store/modals/walletsModalStore';

const AccountsCard = () => {
    const { showBalance, currencySymbol } = useBalanceStore();
    const { wallets, fetchWallets, loading } = useWalletsStore();
    const { openOverlay: openCreateWalletOverlay } = useCreateWalletOverlayStore();
    const { openOverlay: openNewUserOverlay } = useNewUserOverlayStore();

    useEffect(() => {
        fetchWallets();
        if (wallets.length === 0) {
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

                            <div
                                key={wallet._id}
                                className="p-3 w-full h-20 bg-accent/50 rounded-xl flex justify-between items-center"
                            >
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-4xl p-3 bg-accent/80">
                                        <Wallet />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm truncate">
                                            {wallet.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{wallet.currency} кошелёк</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className={`${showBalance ? '' : 'blur-xs'} duration-500 text-sm`}>
                                        {parseFloat(wallet.convertedBalance.toFixed(2)).toLocaleString('de-DE')} {currencySymbol}
                                    </p>
                                    <p className={`${showBalance ? '' : 'blur-xs'} duration-500 text-sm text-muted-foreground`}>
                                        {wallet.balance} {wallet.currency}
                                    </p>
                                </div>
                            </div>
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