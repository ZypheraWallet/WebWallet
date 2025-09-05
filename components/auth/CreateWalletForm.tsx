import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Sparkles } from 'lucide-react';

interface CreateWalletFormProps {
    onSubmit: (walletName: string) => void;
    onAutoCreate: () => void;
    isLoading: boolean;
}

const CreateWalletForm = ({ onSubmit, onAutoCreate, isLoading }: CreateWalletFormProps) => {
    const [walletName, setWalletName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (walletName.trim()) {
            onSubmit(walletName.trim());
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Название кошелька"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    disabled={isLoading}
                    className="text-center"
                />
                <Button
                    type="submit"
                    disabled={!walletName.trim() || isLoading}
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            Создание <LoaderCircle className="animate-spin ml-2" />
                        </>
                    ) : (
                        "Создать кошелёк"
                    )}
                </Button>
            </form>

            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        или
                    </span>
                </div>
            </div>

            <Button
                variant="outline"
                onClick={onAutoCreate}
                disabled={isLoading}
                size="lg"
            >
                Сделайте это за меня <Sparkles className="ml-2" />
            </Button>
        </div>
    );
};

export default CreateWalletForm;