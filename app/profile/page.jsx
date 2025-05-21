"use client";
import React, { useEffect, useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
    const [ user, setUser ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );
    const router = useRouter();

    useEffect( () => {
        // Check if we're on the client side
        if ( typeof window !== 'undefined' ) {
            const storedUser = localStorage.getItem( "user" );
            const user = storedUser ? JSON.parse( storedUser ) : null;
            if ( user ) {
                setUser( user );
            } else {
                router.push( "/" );
            }
            setIsLoading( false );
        }
    }, [ router ] );

    const handleLogout = () => {
        localStorage.removeItem( "token" );
        localStorage.removeItem( "user" );
        router.push( "/" );
    };

    // Show loading state
    if ( isLoading ) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show nothing if no user
    if ( !user ) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Profile Header */ }
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center">
                            <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm">
                                <FaUser size={ 60 } className="text-white" />
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-white">User Profile</h2>
                        </div>

                        {/* Profile Details */ }
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <FaUser className="text-blue-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium text-gray-900">{ user.name }</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <FaEnvelope className="text-green-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900">{ user.email }</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 ease-in-out"
                                onClick={ handleLogout }
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;