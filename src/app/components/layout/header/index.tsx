"use client";

import { useState } from "react";
import Logo from "../logo";

const Header = () => {
    const handleDownloadPDF = () => {
        window.print();
    };
    return (
        <header className="navbar top-0 left-0 z-999 w-full absolute">
            <div className="container">
                <nav className="py-7">
                    <div className="flex items-center gap-4 sm:gap-8">
                        <div>
                            <Logo />
                        </div>
                        <h1>K</h1>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
