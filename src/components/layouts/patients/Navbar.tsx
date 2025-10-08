import AccountPatient from '@/components/dropdowns/AccountPatient';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                scrolled || location.pathname !== '/'
                    ? 'bg-white shadow-md'
                    : 'bg-white/35 backdrop-blur-md'
            }`}
        >
            <nav className="container mx-auto flex justify-between items-center p-4">
                <Link to="/">
                    <div className="flex flex-col items-center w-[100px] select-none">
                        <h1
                            className={`text-lg font-bold leading-tight text-center ${
                                scrolled || location.pathname !== '/'
                                    ? 'text-blue-600'
                                    : 'text-white'
                            }`}
                        >
                            MediClinic
                        </h1>
                        <p
                            className={`italic text-[12px] font-semibold text-center leading-tight ${
                                scrolled || location.pathname !== '/'
                                    ? 'text-gray-600'
                                    : 'text-gray-100'
                            }`}
                        >
                            Y tế thông minh
                        </p>
                    </div>
                </Link>

                <ul
                    className={`flex space-x-6 font-medium list-none transition-colors duration-500 ${
                        scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
                    }`}
                >
                    <li>
                        <Link
                            to="/services"
                            className={`hover:text-blue-600 transition-colors duration-300 ${
                                !scrolled && location.pathname === '/' ? 'hover:text-blue-100' : ''
                            }`}
                        >
                            Dịch vụ
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`hover:text-blue-600 transition-colors duration-300 ${
                                !scrolled && location.pathname === '/' ? 'hover:text-blue-100' : ''
                            }`}
                        >
                            Giới thiệu
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account"
                            className={`hover:text-blue-600 transition-colors duration-300 ${
                                !scrolled && location.pathname === '/' ? 'hover:text-blue-100' : ''
                            }`}
                        >
                            <AccountPatient />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
