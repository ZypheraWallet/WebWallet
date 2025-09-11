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

const ForNewUser = () => {
    const { open, closeOverlay } = useNewUserOverlayStore();
    const { setCurrency } = useBalanceStore();

    const [transperent, setTransperent] = useState<boolean>(false);
    const [steps, setSteps] = useState<1 | 2 | 3>(1)

    const [walletName, setWalletName] = useState<string>('Wallet #1')

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

    return (
        <div className={`fixed inset-0 z-40 bg-background p-6 flex gap-6 max-lg:flex-col justify-between duration-500 ${transperent ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className='relative'>
                <p className='font-mono text-sm text-center'>{steps} из 3</p>
                <p className={`text-3xl font-bold mt-3 absolute duration-500 ${steps === 1 ? '' : '-translate-x-full opacity-0'}`}>Выберите название вашему кошельку и валюту</p>
                <p className={`text-4xl font-bold mt-3 absolute duration-500 ${steps === 2 ? '' : '-translate-x-full opacity-0'}`}>Выберите аватар и имя</p>
                <p className={`text-4xl font-bold mt-3 absolute duration-500 ${steps === 3 ? '' : '-translate-x-full opacity-0'}`}>Выберите тег для переводов</p>
            </div>
            <div className='relative h-max'>
                <div className={`absolute w-full -translate-y-6 duration-500 ${steps === 1 ? '' : '-translate-x-full opacity-0'}  `}>
                    <Select onValueChange={handleCurrencyChange}>
                        <SelectTrigger className="w-full mb-6">
                            <SelectValue placeholder="Валюта кошелька" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD $</SelectItem>
                            <SelectItem value="RUB">RUB ₽</SelectItem>
                            <SelectItem value="KZT">KZT ₸</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='space-y-3'>
                        <Input placeholder='Название кошелька' className='h-13' value={walletName} onChange={(e) => setWalletName(e.target.value)}></Input>
                        <div>
                            <WalletCard walletCurrency='TON' walletName={walletName} />
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Button size={'xl'} onClick={() => handleNext()} className={`duration-500 ${steps === 1 && 'translate-y-full'}`}>{steps === 3 ? 'Завершить' : 'Продолжить'}</Button>
                <Button variant={'link'} onClick={() => handlePrev()} className={`duration-500 ${steps === 1 && 'translate-y-[150%]'}`}><MoveLeft />Назад</Button>
            </div>

        </div >
    );
};

export default ForNewUser;