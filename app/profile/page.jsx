"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const router = useRouter();

    useEffect( () => {
        // Only run on client side

        const storedUser = localStorage.getItem( "user" );
        const token = localStorage.getItem( "token" );

        if ( !storedUser || !token ) {
            router.push( "/" );
            return;
        }

        const parsedUser = JSON.parse( String( storedUser ) );
        console.log( parsedUser )
        if ( parsedUser ) {
            setUser( parsedUser );
            setLoading( false )
        }


    }, [ router ] );

    const handleLogout = () => {

        localStorage.removeItem( "user" );
        localStorage.removeItem( "token" );

        router.push( "/" );

    };

    if ( loading ) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center mt-12">
                    <div className="bg-white shadow-md p-6 w-[28rem] rounded-xl text-center">
                        Loading profile...
                    </div>
                </div>
            </div>
        );
    }

    if ( !user ) return null;

    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-12">
                <div className="bg-white shadow-md p-6 w-[28rem] rounded-xl">
                    <div className="text-center">
                        <FaUser size={ 60 } className="text-blue-500 mb-3 mx-auto" />
                        <h2 className="text-2xl font-semibold">User Profile</h2>
                    </div>
                    <hr className="my-4" />
                    <div className="px-2 space-y-3">
                        <p className="flex items-center text-gray-700">
                            <FaUser className="text-blue-500 mr-2" />
                            <strong className="mr-1">Name:</strong> { user.name }
                        </p>
                        <p className="flex items-center text-gray-700">
                            <FaEnvelope className="text-green-500 mr-2" />
                            <strong className="mr-1">Email:</strong> { user.email }
                        </p>
                    </div>
                    <button
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center font-semibold"
                        onClick={ handleLogout }
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;