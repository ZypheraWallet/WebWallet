import React from "react"
import { useCreateWalletOverlayStore } from "@/store/modals/walletsModalStore"


interface CreateWalletOverlayProps {
    onCreate?: () => void
}


const CreateWalletOverlay = ({ onCreate }: CreateWalletOverlayProps) => {
    const { open, closeOverlay } = useCreateWalletOverlayStore()


    if (!open) return null


    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background">

        </div>
    )
}


export default CreateWalletOverlay
