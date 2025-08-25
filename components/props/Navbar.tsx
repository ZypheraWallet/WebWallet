"use client";
import React from "react";
import { Button } from "../ui/button";
import { Home, Wallet, Store, Compass } from "lucide-react";

import Link from "next/link";

const Navbar = () => {
    return (
        <header className="fixed lg:top-0 -bottom-1 left-0 w-full h-16 lg:border-b max-lg:border-t bg-background/50 backdrop-blur-sm z-30">
            <nav className="mx-auto container flex items-center justify-between h-full max-lg:hidden">
                <div className="flex gap-1">
                    <p className="text-3xl font-mono">
                        Zyphera
                    </p>
                    <span className="text-sm opacity-80">Beta</span>
                </div>
                <div className="flex gap-3">
                    <Link href={'/'}>
                        <Button variant="ghost" size="lg">
                            <Home />
                            Главная
                        </Button>
                    </Link>
                    <Link href={'/payments'}>
                        <Button variant="ghost" size="lg">
                            <Wallet />
                            Платежи
                        </Button>
                    </Link>
                    <Link href={'/'}>
                        <Button variant="ghost" size="lg">
                            <Store />
                            Площадка
                        </Button>
                    </Link>
                    <Link href={'/'}>
                        <Button variant="ghost" size="lg">
                            <Compass />
                            Обзор
                        </Button>
                    </Link>
                </div>
            </nav>
            <nav className="px-3 flex items-center h-full justify-between lg:hidden">
                <Link href={'/'}>
                    <Button variant="ghost" className="flex-col text-[10px] gap-1">
                        <Home />
                        Главная
                    </Button>
                </Link>
                <Link href={'/payments'}>
                    <Button variant="ghost" className="flex-col text-[10px] gap-1">
                        <Wallet />
                        Платежи
                    </Button>
                </Link>
                <Link href={'/'}>
                    <Button variant="ghost" className="flex-col text-[10px] gap-1">
                        <Store />
                        Площадка
                    </Button>
                </Link>
                <Link href={'/'}>
                    <Button variant="ghost" className="flex-col text-[10px] gap-1">
                        <Compass />
                        Обзор
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
