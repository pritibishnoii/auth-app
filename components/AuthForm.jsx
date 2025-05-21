"use client";
import React, { useState, useEffect } from 'react';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthForm = () => {
    const router = useRouter();
    const [ formData, setFormData ] = useState( {
        name: "",
        email: "",
        password: "",
    } );
    const [ isLogin, setIsLogin ] = useState( true );
    const [ loading, setLoading ] = useState( false );
    const [ mounted, setMounted ] = useState( false );

    useEffect( () => {
        setMounted( true ); // Component is now mounted client-side
        if ( typeof window !== "undefined" && localStorage.getItem( "token" ) ) {
            router.push( "/profile" );
        }
    }, [] );

    const handleChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );

        const url = isLogin ? "/api/auth?login=true" : "/api/auth?signup=true";

        try {
            const { data } = await axios.post( url, formData, {
                headers: { "Content-Type": "application/json" },
            } );

            if ( !data.success ) {
                throw new Error( data.message || "Authentication failed" );
            }

            if ( isLogin ) {
                localStorage.setItem( "token", data.token );
                localStorage.setItem( "user", JSON.stringify( data.user ) );
                router.push( "/profile" );
            } else {
                toast.success( "Registration successful! Please login" );
                setIsLogin( true );
                setFormData( { name: "", email: "", password: "" } );
            }

        } catch ( error ) {
            toast.error( error.response?.data?.message || error.message || "Something went wrong" );
        } finally {
            setLoading( false );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md p-6 w-full max-w-md rounded-xl">
                <div className="text-center">
                    { isLogin ? (
                        <FaSignInAlt size={ 50 } className="text-blue-500 mb-3 mx-auto" />
                    ) : (
                        <FaUserPlus size={ 50 } className="text-green-500 mb-3 mx-auto" />
                    ) }
                    <h2 className="text-2xl font-bold">
                        { isLogin ? "Login" : "Sign Up" }
                    </h2>
                </div>

                <form onSubmit={ handleSubmit } className="mt-6 space-y-4">
                    { !isLogin && (
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <span className="bg-gray-100 p-3 text-blue-500">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={ formData.name }
                                    onChange={ handleChange }
                                    className="w-full p-2 outline-none"
                                    required
                                    minLength={ 3 }
                                />
                            </div>
                        </div>
                    ) }

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <span className="bg-gray-100 p-3 text-green-500">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={ formData.email }
                                onChange={ handleChange }
                                className="w-full p-2 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <span className="bg-gray-100 p-3 text-red-500">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={ formData.password }
                                onChange={ handleChange }
                                className="w-full p-2 outline-none"
                                required
                                minLength={ 6 }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={ loading }
                        className={ `w-full py-2 px-4 rounded-md text-white font-semibold ${ isLogin
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                            } ${ loading ? "opacity-70 cursor-not-allowed" : ""
                            } transition-colors` }
                    >
                        { loading ? (
                            <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        ) : isLogin ? (
                            "Login"
                        ) : (
                            "Sign Up"
                        ) }
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                    { isLogin ? "Don't have an account? " : "Already have an account? " }
                    <button
                        onClick={ () => setIsLogin( !isLogin ) }
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        { isLogin ? "Sign up" : "Login" }
                    </button>
                </p>
            </div>
        </div>
    );
};