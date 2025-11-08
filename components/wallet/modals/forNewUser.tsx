import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import WalletCard from '../props/wallet';
import { useNewUserOverlayStore } from '@/store/modals/walletsModalStore';
import { useBalanceStore } from '@/store/wallet/balanceStore';
import { MoveLeft } from 'lucide-react';
import { z } from "zod"

const walletNameSchema = z.string()
    .min(3, "Минимум 3 символа")
    .max(16, "Максимум 16 символов")
    .regex(/^[a-zA-Z0-9_]+$/, "Только латиница, цифры и _")

const ForNewUser = () => {
    const { open, closeOverlay } = useNewUserOverlayStore();
    const { setCurrency } = useBalanceStore();

    const [transperent, setTransperent] = useState<boolean>(false);
    const [steps, setSteps] = useState<1 | 2 | 3>(1)

    const [walletName, setWalletName] = useState<string>('')
    const [error, setError] = useState<{ msg: string, visible: boolean }>({ msg: '', visible: false })

    if (!open) return null

    const handleNext = () => {
        if (steps === 3) {
            setTransperent(true)
            setTimeout(() => closeOverlay(), 500)
        }
        setSteps(prev => Math.min(prev + 1, 3) as 1 | 2 | 3)
    }

    const handlePrev = () => {
        setSteps(prev => Math.max(prev - 1, 1) as 1 | 2 | 3)
    }

    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
        console.log("Выбранная валюта:", value);
    };

    const handleChangeWalletName = (value: string) => {
        const result = walletNameSchema.safeParse(value)
        setWalletName(result.success || result.error.issues[0].code === "too_small" ? value : walletName)
        setError(
            result.success
                ? { msg: error.msg, visible: false }
                : { msg: result.error.issues[0].message, visible: true }
        )
    }

    return (
        <div className={`fixed inset-0 z-40 lg:flex duration-500 ${transperent ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className='h-screen w-3/4 bg-muted'></div>
            <div className='bg-background p-6 flex gap-6 flex-1 flex-col justify-between h-screen'>
                <div className='relative'>
                    <p className='font-mono text-sm text-center'>{steps} из 3</p>
                    <p className={`text-4xl font-bold mt-3 absolute duration-500 ${steps === 1 ? '' : 'lg:translate-x-full -translate-x-full opacity-0'}`}>Настройте свой кошелёк</p>
                    <p className={`text-4xl font-bold mt-3 absolute duration-500 ${steps === 2 ? '' : 'lg:translate-x-full -translate-x-full opacity-0'}`}>Выберите аватар и имя</p>
                    <p className={`text-4xl font-bold mt-3 absolute duration-500 ${steps === 3 ? '' : 'lg:translate-x-full -translate-x-full opacity-0'}`}>Выберите тег для переводов</p>
                </div>
                <div className='relative h-max'>
                    <div className={`absolute w-full -translate-y-6 duration-500 ${steps === 1 ? '' : 'lg:translate-x-full -translate-x-full opacity-0'}  `}>
                        <div className='space-y-3'>
                            <Input placeholder='Название кошелька' className='h-13' maxLength={16} value={walletName} onChange={(e) => handleChangeWalletName(e.target.value)}></Input>
                            <Select onValueChange={handleCurrencyChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Валюта кошелька" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD $</SelectItem>
                                    <SelectItem value="RUB">RUB ₽</SelectItem>
                                    <SelectItem value="KZT">KZT ₸</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <WalletCard walletCurrency='TON' walletName={walletName != '' ? walletName : 'User wallet'} />
                            </div>
                            <p className={`text-destructive duration-500 ${error.visible ? '' : 'opacity-0 -translate-x-[50%] pointer-events-none'}`}>{error.msg}</p>
                        </div>

                    </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <Button size={'xl'} onClick={() => handleNext()} className={`duration-500 ${steps === 1 && 'translate-y-full'}`}>{steps === 3 ? 'Завершить' : 'Продолжить'}</Button>
                    <Button variant={'link'} onClick={() => handlePrev()} className={`duration-500 ${steps === 1 && 'translate-y-[180%]'}`}><MoveLeft />Назад</Button>
                </div>
            </div>
        </div >
    );
};

export default ForNewUser;