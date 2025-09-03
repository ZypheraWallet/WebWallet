import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/apiClient';

import { useBalanceStore } from './balanceStore';

export interface Wallet {
    _id: string;
    userId: string;
    name: string;
    balance: number;
    convertedBalance: number;
    currency: string;
    tags: string[];
    isActive: boolean;
    nfts: string[];
}

interface WalletsState {
    wallets: Wallet[];
    loading: boolean;
    error: string | null;
    fetchWallets: () => Promise<void>;
}

export const useWalletsStore = create<WalletsState>()(
    persist(
        (set, get) => ({
            wallets: [],
            loading: false,
            error: null,

            fetchWallets: async () => {
                try {
                    if (get().wallets.length === 0) {
                        set({ loading: true, error: null });
                    }

                    const data = await apiClient.get<Wallet[]>(
                        '/api/v1/wallet/wallets?currency=' + useBalanceStore.getState().currency
                    );
                    set({ wallets: data, loading: false });
                } catch (err: any) {
                    set({ error: err.message, loading: false });
                }
            },
        }),
        {
            name: 'zyphera-wallets',
            partialize: (state) => ({ wallets: state.wallets }),
        }
    )
);
