"use client"
import React, { useState, useEffect } from 'react'
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export const AuthForm = () => {
    const router = useRouter()
    const [ isLogin, setIsLogin ] = useState( false )
    const [ loading, setLoading ] = useState( false )
    const [ message, setMessage ] = useState( "" )
    const [ mounted, setMounted ] = useState( false )
    const [ formData, setFormData ] = useState( {
        name: "",
        email: "",
        password: ""
    } )

    useEffect( () => {
        setMounted( true )
        if ( localStorage.getItem( "token" ) ) {
            router.push( "/profile" );
        }
    }, [] )

    const handleChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } )
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );
        setMessage( "" );

        // http://localhost:3001
        const url = isLogin ? "/api/auth?login=true" : "/api/auth?signup=true"

        try {
            const response = await axios.post( url, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            } )
            // console.log( "response from backend", response )
            setMessage( response?.data?.message )

            if ( isLogin ) {
                localStorage.setItem( "token", response?.data?.user )
                localStorage.setItem( "user", JSON.stringify( response?.data?.user ) )
                router.push( "/profile" );
            } else {
                setIsLogin( true );

            }
        }
        catch ( error ) {
            setMessage( "Something went wrong" );
        } finally {
            setLoading( false );
        }

    }

    if ( !mounted ) {
        return null
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md p-6 w-[28rem] rounded-xl">
                <div className="text-center">
                    { isLogin ? (
                        <FaSignInAlt size={ 50 } className="text-blue-500 mb-3 mx-auto" />
                    ) : (
                        <FaUserPlus size={ 50 } className="text-green-500 mb-3 mx-auto" />
                    ) }
                    <h2 className="text-2xl font-bold">
                        { isLogin ? "Login" : "SignUp" }
                    </h2>
                </div>
                <hr className="my-4" />
                <form onSubmit={ handleSubmit }>
                    {/* user input */ }
                    { !isLogin && (
                        <div className="mb-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <span className="bg-gray-100 p-2 text-blue-500">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={ formData.name }
                                onChange={ handleChange }
                                className="w-full p-2 outline-none"
                                required
                            />
                        </div>
                    ) }

                    {/* email input */ }
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="bg-gray-100 p-2 text-green-500">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={ formData.email }
                            onChange={ handleChange }
                            className="w-full p-2 outline-none"
                            required
                        />
                    </div>

                    {/* password input */ }
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="bg-gray-100 p-2 text-red-500">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={ formData.password }
                            onChange={ handleChange }
                            className="w-full p-2 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={ twMerge( clsx(
                            "w-full py-2 rounded-md text-white font-semibold",
                            isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600",
                        ) ) }
                        disabled={ loading }

                    >
                        { loading ? <div className='loader'></div> : isLogin ? "Login" : "Signup" }
                    </button>
                </form>

                <p
                    className="text-center mt-4 text-blue-500 cursor-pointer"
                    onClick={ () => setIsLogin( !isLogin ) }
                >
                    { isLogin ? "Create an account" : "Already have an account? Login" }
                </p>

                { message && (
                    <p className="text-center text-red-500 mt-2">{ message }</p>
                ) }
            </div>
        </div>
    )
}
