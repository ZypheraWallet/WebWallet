import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { AppWindow, LoaderCircle } from 'lucide-react';

interface GoogleLoginButtonProps {
    state: 'loading' | 'expectation' | null;
    onClick: () => void;
}

export const GoogleLoginButton = ({ state, onClick }: GoogleLoginButtonProps) => {
    return (
        <>
            <Button
                variant="outline"
                size={'lg'}
                onClick={onClick}
                disabled={state === 'loading' || state === 'expectation'}
            >
                {state === 'loading' && (
                    <>
                        Загрузка <LoaderCircle className='animate-spin' />
                    </>
                )}
                {state === 'expectation' && (
                    <>
                        Авторизируйтесь в окне <AppWindow />
                    </>
                )}
                {state == null && (
                    <>
                        Войти через Google <FcGoogle />
                    </>
                )}
            </Button>
            <p className='text-center text-muted-foreground text-sm'>или</p>
        </>
    );
};

export default GoogleLoginButton;