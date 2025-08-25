"use client";
import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [done, setDone] = useState<boolean>(false);
  const [bgHiden, setBgHiden] = useState<boolean>(false);

  useEffect(() => {

    const timer = setTimeout(() => setDone(true), 1000);
    const bgTimer = setTimeout(() => setBgHiden(true), 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(bgTimer);
    }

  }, []);

  return (
    <>

        {!done && (
          <div
            className={`fixed inset-0 z-50 flex items-center duration-500 justify-center bg-background ${bgHiden? "opacity-0" : ""}`}
          >
            <p
              className="font-mono text-4xl"
            >
              Zyphera Wallet
            </p>
          </div>
        )}
    </>
  );
};

export default Preloader;
