// "use client";
// import Navbar from '@/components/Navbar'

// import React, { useEffect, useState } from "react";
// import {
//     FaUser,
//     FaEnvelope,
//     FaSignOutAlt,
// } from "react-icons/fa";
// import { useRouter } from "next/navigation";


// const profilePage = () => {
//     const [ user, setUser ] = useState( null )
//     const router = useRouter();



//     useEffect( () => {

//         const storedUser = localStorage.getItem( "user" )
//         // console.log( "storedUser", storedUser )
//         if ( !storedUser ) {
//             router.push( "/" )
//         }

//         setUser( JSON.parse( storedUser ) )


//     }, [ router ] )



//     const handleLogout = () => {
//         localStorage.removeItem( "user" )
//         localStorage.removeItem( "token" )
//         router.push( "/" )
//     }
//     if ( !user ) return null;


//     return (
//         <div>
//             <Navbar />
//             <div className="flex justify-center mt-12">
//                 <div className="bg-white shadow-md p-6 w-[28rem] rounded-xl">
//                     <div className="text-center">
//                         <FaUser size={ 60 } className="text-blue-500 mb-3 mx-auto" />
//                         <h2 className="text-2xl font-semibold">User Profile</h2>
//                     </div>
//                     <hr className="my-4" />
//                     <div className="px-2 space-y-3">
//                         <p className="flex items-center text-gray-700">
//                             <FaUser className="text-blue-500 mr-2" />
//                             <strong className="mr-1">Name:</strong> { user.name }
//                         </p>
//                         <p className="flex items-center text-gray-700">
//                             <FaEnvelope className="text-green-500 mr-2" />
//                             <strong className="mr-1">Email:</strong> { user.email }
//                         </p>
//                     </div>
//                     <button
//                         className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center font-semibold"
//                         onClick={ handleLogout }
//                     >
//                         <FaSignOutAlt className="mr-2" /> Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };




// export default profilePage



"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const [ user, setUser ] = useState( null );
    const router = useRouter();

    useEffect( () => {
        // Ensure it's only run in the browser
        if ( typeof window !== "undefined" ) {
            try {
                const storedUser = localStorage.getItem( "user" );

                if ( !storedUser ) {
                    router.push( "/" );
                } else {
                    const parsedUser = JSON.parse( storedUser );
                    setUser( parsedUser );
                }
            } catch ( err ) {
                console.error( "Error parsing stored user:", err );
                localStorage.removeItem( "user" );
                localStorage.removeItem( "token" );
                router.push( "/" );
            }
        }
    }, [ router ] );

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
                            <strong className="mr-1">Name:</strong> { user?.name }
                        </p>
                        <p className="flex items-center text-gray-700">
                            <FaEnvelope className="text-green-500 mr-2" />
                            <strong className="mr-1">Email:</strong> { user?.email }
                        </p>
                    </div>
                    <button
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center font-semibold"
                        onClick={ () => {
                            localStorage.removeItem( "user" );
                            localStorage.removeItem( "token" );
                            router.push( "/" );
                        } }
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
