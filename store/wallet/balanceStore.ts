import { create } from 'zustand';
import { apiClient } from '@/lib/apiClient'; // Предполагается, что apiClient экспортируется отсюда

interface BalanceStore {
    balance: number;
    currency: string;
    currencySymbol: string;
    showBalance: boolean;
    isLoading: boolean;
    error: string | null;

    deposit: (amount: number) => void;
    withdraw: (amount: number) => void;
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
    toggleBalanceVisibility: () =>
        set((state) => ({ showBalance: !state.showBalance })),
    setBalance: (amount) => set({ balance: amount }),
    setCurrency: (currency) =>
        set({
            currency,
            currencySymbol: currencySymbols[currency] || currency,
        }),

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
        } catch (err) {
            set({
                error: (err as Error).message,
                isLoading: false
            });
            console.error('Failed to fetch balance', err);
        }
    },
}));

if (typeof window !== 'undefined') {
    useBalanceStore.getState().fetchBalance();
}