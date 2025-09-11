import { create } from "zustand"

interface OverlayState {
    open: boolean
    openOverlay: () => void
    closeOverlay: () => void
}

interface NewUserOverlayState {
    open: boolean
    openOverlay: () => void
    closeOverlay: () => void
}

export const useNewUserOverlayStore = create<NewUserOverlayState>((set) => ({
    open: false,
    openOverlay: () => set({ open: true }),
    closeOverlay: () => set({ open: false }),
}))

export const useCreateWalletOverlayStore = create<OverlayState>((set) => ({
    open: false,
    openOverlay: () => set({ open: true }),
    closeOverlay: () => set({ open: false }),
}))