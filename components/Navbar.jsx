import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem( "token" );
        localStorage.removeItem( "user" );
        router.push( "/" );
    };

    return (
        <div className="bg-blue-600 py-3 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="/" className="text-white font-bold text-lg flex items-center">
                    <MdSecurity size={ 28 } className="mr-2" />
                    NextAuth App
                </a>

                <div className="flex gap-3">
                    <a
                        href="/"
                        className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md flex items-center hover:bg-gray-100 transition"
                    >
                        <FaHome className="mr-2" />
                        Home
                    </a>

                    <button
                        onClick={ handleLogout }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center font-medium transition"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
