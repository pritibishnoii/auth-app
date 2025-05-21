import { useRouter } from 'next/navigation'
import React from 'react'
import {
    FaSignOutAlt, FaHome
} from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const Navbar = () => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem( "token" );
        localStorage.removeItem( "user" );
        router.push( "/" );
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */ }
                    <a
                        className="text-white font-bold flex items-center space-x-2 hover:text-blue-100 transition-all duration-300 ease-in-out"
                        href="/"
                    >
                        <MdSecurity size={ 28 } className="text-blue-200" />
                        <span className="text-lg">NextAuth App</span>
                    </a>

                    {/* Navigation Links */ }
                    <div className="flex items-center space-x-4">
                        <a
                            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-white/20 transition-all duration-300 ease-in-out border border-white/20"
                            href="/"
                        >
                            <FaHome className="text-blue-200" />
                            <span>Home</span>
                        </a>

                        <button
                            className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-600 transition-all duration-300 ease-in-out border border-red-400/20"
                            onClick={ handleLogout }
                        >
                            <FaSignOutAlt className="text-red-200" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar