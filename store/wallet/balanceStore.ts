import { create } from 'zustand';
import { apiClient } from '@/lib/apiClient';

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
    loadFromStorage: () => void;
}

const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    TON: "Ⓣ",
    KZT: "₸",
};


export const useBalanceStore = create<BalanceStore>((set, get) => ({
    balance: 0,
    currency: "RUB",
    currencySymbol: "₽",
    showBalance: true,
    isLoading: true,
    error: null,

    deposit: (amount) => set((state) => ({ balance: state.balance + amount })),
    withdraw: (amount) =>
        set((state) => ({ balance: Math.max(0, state.balance - amount) })),
    setBalanceVisibility: (visible) =>
        set({
            showBalance: visible
        }),
    toggleBalanceVisibility: () => {
        const newShowBalance = !get().showBalance;
        set({ showBalance: newShowBalance });
        saveToLocalStorage(get().balance, newShowBalance, get().currency);
    },
    setBalance: (amount) => {
        set({ balance: amount });
        saveToLocalStorage(amount, get().showBalance, get().currency);
    },
    setCurrency: (currency) => {
        set({
            currency,
            currencySymbol: currencySymbols[currency] || currency,
        });
        saveToLocalStorage(get().balance, get().showBalance, currency);
    },

    fetchBalance: async () => {
        set({ isLoading: true, error: null });

        try {
            const data = await apiClient.get<{
                balance: number;
                currency: string;
            }>('/api/v1/wallet/balance');

            set({
                balance: data.balance,
                currency: data.currency,
                currencySymbol: currencySymbols[data.currency] || data.currency,
                isLoading: false,
            });

            saveToLocalStorage(data.balance, get().showBalance, data.currency);
        } catch (err) {
            set({
                error: (err as Error).message,
                isLoading: false
            });
            console.error('Failed to fetch balance', err);
        }
    },
    loadFromStorage: () => {
        try {
            const saved = localStorage.getItem('zyphera_wallet');
            if (saved) {
                const parsed = JSON.parse(saved);
                set({
                    balance: parsed.balance ?? 0,
                    showBalance: parsed.showBalance ?? true,
                    currency: parsed.currency ?? "RUB",
                    currencySymbol:
                        currencySymbols[parsed.currency] || parsed.currency,
                });
            }
        } catch (e) {
            console.error('Failed to parse localStorage', e);
        }
    },
}));

function saveToLocalStorage(balance: number, showBalance: boolean, currency: string) {
    try {
        localStorage.setItem(
            'zyphera_wallet',
            JSON.stringify({ balance, showBalance, currency })
        );
    } catch (e) {
        console.error('Failed to save localStorage', e);
    }
}