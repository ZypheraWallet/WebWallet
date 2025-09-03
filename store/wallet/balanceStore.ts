'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/apiClient';

import { useWalletsStore } from './walletsStore';

interface BalanceStore {
    balance: number;
    currency: string;
    currencySymbol: string;
    showBalance: boolean;
    isLoading: boolean;
    error: string | null;

    deposit: (amount: number) => void;
    withdraw: (amount: number) => void;
    setBalanceVisibility: (visible: boolean) => void;
    toggleBalanceVisibility: () => void;
    setBalance: (amount: number) => void;
    setCurrency: (currency: string) => void;
    fetchBalance: () => Promise<void>;
}

const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    TON: "Ⓣ",
    KZT: "₸",
};

export const useBalanceStore = create<BalanceStore>()(
    persist(
        (set, get) => ({
            balance: 0,
            currency: "USD",
            currencySymbol: "$",
            showBalance: true,
            isLoading: true,
            error: null,

            deposit: (amount) => set((state) => ({ balance: state.balance + amount })),
            withdraw: (amount) =>
                set((state) => ({ balance: Math.max(0, state.balance - amount) })),
            setBalanceVisibility: (visible) => set({ showBalance: visible }),
            toggleBalanceVisibility: () =>
                set((state) => ({ showBalance: !state.showBalance })),

            setBalance: (amount) => set({ balance: amount }),
            setCurrency: (currency) => {
                set({
                    currency,
                    currencySymbol: currencySymbols[currency] || currency,
                })
                get().fetchBalance();
                useWalletsStore.getState().fetchWallets()
            },
            fetchBalance: async () => {
                if (get().balance === 0) {
                    set({ isLoading: true, error: null });
                }

                try {
                    const data = await apiClient.get<{ balance: number; currency: string }>(
                        '/api/v1/wallet/balance?currency=' + get().currency
                    );

                    set({
                        balance: data.balance,
                        currency: data.currency,
                        currencySymbol: currencySymbols[data.currency] || data.currency,
                        isLoading: false,
                    });
                } catch (err) {
                    set({ error: (err as Error).message, isLoading: false });
                    console.error('Failed to fetch balance', err);
                }
            },
        }),
        {
            name: 'zyphera-balance',
            partialize: (state) => ({
                balance: state.balance,
                currency: state.currency,
                currencySymbol: state.currencySymbol,
                showBalance: state.showBalance,
            }),
        }
    )
);