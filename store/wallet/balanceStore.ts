
import { create } from 'zustand';

interface BalanceStore {
  balance: number;
  showBalance: boolean;

  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  toggleBalanceVisibility: () => void;
  setBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 53295.54,
  showBalance: true,

  deposit: (amount) => set((state) => ({ balance: state.balance + amount })),
  withdraw: (amount) =>
    set((state) => ({ balance: Math.max(0, state.balance - amount) })),
  toggleBalanceVisibility: () =>
    set((state) => ({ showBalance: !state.showBalance })),
  setBalance: (amount) => set({ balance: amount }),
}));
