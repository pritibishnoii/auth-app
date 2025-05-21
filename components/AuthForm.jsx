"use client";
import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";


import { toast } from "react-toastify";

import axios from "axios";
import { useRouter } from "next/navigation";

const AuthForm = () => {
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


            // console.log( "data from backend = ", data );
            setMessage( data.message );
            toast.success( data.message )
            if ( isLogin ) {
                localStorage.setItem( "token", data.token );
                localStorage.setItem( "user", JSON.stringify( data.user ) );
                router.push( "/profile" );
            }
        } catch ( error ) {
            const errorMessage =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error( errorMessage );
            setMessage( "Something went wrong" );

        } finally {
            setLoading( false );
        }
    };

    return (
        <div>

            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-6 rounded-xl shadow-md" style={ { width: "28rem" } }>
                    <div className="text-center">
                        { isLogin ? (
                            <FaSignInAlt size={ 50 } className="text-blue-600 mb-3 mx-auto" />
                        ) : (
                            <FaUserPlus size={ 50 } className="text-green-600 mb-3 mx-auto" />
                        ) }
                        <h2 className="font-bold text-xl">{ isLogin ? "Login" : "SignUp" }</h2>
                    </div>
                    <hr className="my-4" />
                    <form onSubmit={ handleSubmit }>
                        {/* user input */ }
                        { !isLogin && (
                            <div className="mb-3 flex">
                                <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                                    <FaUser className="text-blue-600" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={ formData.name }
                                    onChange={ handleChange }
                                    className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        ) }

                        {/* email input */ }
                        <div className="mb-3 flex">
                            <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                                <FaEnvelope className="text-green-600" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={ formData.email }
                                onChange={ handleChange }
                                className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        {/* password input */ }
                        <div className="mb-3 flex">
                            <span className="bg-gray-100 p-2 rounded-l-md border border-r-0 border-gray-300">
                                <FaLock className="text-red-600" />
                            </span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={ formData.password }
                                onChange={ handleChange }
                                className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={ `w-full py-2 rounded-md text-white font-semibold ${ isLogin ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500" }` }
                            disabled={ loading }
                        >
                            { loading ? <div className="loader"></div> : isLogin ? "Login" : "Signup" }
                        </button>
                    </form>
                    <p
                        className="text-center mt-3 text-blue-600 cursor-pointer hover:text-blue-700"
                        onClick={ () => setIsLogin( !isLogin ) }
                    >
                        { isLogin ? "Create an account" : "Already have an account? Login" }
                    </p>
                    { message && <p className="text-red-600 text-center mt-2">{ message }</p> }
                </div>
            </div>
        </div>
    );
};

export default AuthForm;