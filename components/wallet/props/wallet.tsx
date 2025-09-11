import React from 'react';
import { WalletIcon } from 'lucide-react';
import { useBalanceStore } from '@/store/wallet/balanceStore';
import { type Wallet } from '@/store/wallet/walletsStore';

interface WalletProps {
    wallet?: Wallet
    walletName?: string
    walletCurrency?: string
}

const WalletCard = ({ wallet, walletName, walletCurrency }: WalletProps) => {

    const { showBalance, currencySymbol } = useBalanceStore();

    return (
        <div
            className="p-3 w-full h-20 bg-accent/50 rounded-xl flex justify-between items-center"
        >
            <div className="flex gap-3 items-center">
                <div className="rounded-4xl p-3 bg-accent/80">
                    <WalletIcon />
                </div>
                <div>
                    <p className="font-medium text-sm truncate">
                        {wallet?.name ?? walletName}
                    </p>
                    <p className="text-xs text-muted-foreground">{wallet?.currency ?? walletCurrency} кошелёк</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className={`${showBalance ? '' : 'blur-xs'} duration-500 text-sm`}>
                    {wallet ? parseFloat(wallet.convertedBalance.toFixed(2)).toLocaleString('de-DE') : 0.00} {currencySymbol}
                </p>
                <p className={`${showBalance ? '' : 'blur-xs'} duration-500 text-sm text-muted-foreground`}>
                    {wallet?.balance != null ? wallet.balance : 0} {wallet?.currency ?? walletCurrency}
                </p>
            </div>
        </div>
    );
};

export default WalletCard;