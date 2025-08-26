import { create } from 'zustand';

interface BalanceStore {
    balance: number;
    currency: string;
    currencySymbol: string;
    showBalance: boolean;

    deposit: (amount: number) => void;
    withdraw: (amount: number) => void;
    toggleBalanceVisibility: () => void;
    setBalance: (amount: number) => void;
    setCurrency: (currency: string) => void;
}

const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    TON: "Ⓣ",
    KZT: "₸",
};

export const useBalanceStore = create<BalanceStore>((set) => ({
    balance: 12345.6789,
    currency: "RUB",
    currencySymbol: "₽",
    showBalance: true,

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
}));
