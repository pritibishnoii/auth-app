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

    const router = useRouter();
    const [ formData, setFormData ] = useState( {
        name: "",
        email: "",
        password: "",
    } );

    const [ isLogin, setIsLogin ] = useState( true );
    const [ message, setMessage ] = useState( "" );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        if ( localStorage.getItem( "token" ) ) {
            router.push( "/profile" );
        }
    }, [] );

    const handleChange = ( e ) => {
        setFormData( { ...formData, [ e.target.name ]: e.target.value } );
        // console.log("getting input data ",formData)
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setMessage( "" );
        setLoading( true );

        //   http://localhost:3001/api/auth?login=true

        const url = isLogin ? "/api/auth?login=true" : "/api/auth?signup=true";

        try {
            const { data } = await axios.post( url, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            } );
            console.log( "data from backend = ", data );
            setMessage( data.message );

            if ( isLogin ) {
                localStorage.setItem( "token", data.token );
                localStorage.setItem( "user", JSON.stringify( data.user ) );
                router.push( "/profile" );

            }
        } catch ( error ) {
            setMessage( "Something went wrong" );
        } finally {
            setLoading( false );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
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
                                minLength={ 3 }
                            />
                        </div>
                    ) }

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
                            minLength={ 6 }
                        />
                    </div>

                    <button
                        type="submit"
                        className={ twMerge( clsx(
                            "w-full py-2 rounded-md text-white font-semibold flex justify-center",
                            isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600",
                            loading && "opacity-70 cursor-not-allowed"
                        ) ) }
                        disabled={ loading }
                    >
                        { loading ? (
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        ) : isLogin ? "Login" : "Signup" }
                    </button>
                </form>

                <p
                    className="text-center mt-4 text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
                    onClick={ () => {
                        setIsLogin( !isLogin )
                        setMessage( { text: "", type: "" } )
                    } }
                >
                    { isLogin ? "Create an account" : "Already have an account? Login" }
                </p>

                { message.text && (
                    <p className={ `text-center mt-2 ${ message.type === "error" ? "text-red-500" : "text-green-500"
                        }` }>
                        { message.text }
                    </p>
                ) }
            </div>
        </div>
    )
}