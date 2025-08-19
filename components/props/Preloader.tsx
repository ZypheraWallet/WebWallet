"use client";
import React from "react";

const Preloader = () => {

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center duration-1000 bg-background`}>
            <p className="font-mono text-4xl">Zyphera Wallet</p>
        </div>
    );
};

export default Preloader;
