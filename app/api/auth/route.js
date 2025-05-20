import { NextResponse } from "next/server";

import connectDB from "@/app/utils/database";
import { login, register } from "@/app/controllers/authController";



// http://localhost:3001/api/auth?signup=true
//register route
export async function POST ( req ) {
    await connectDB();
    try {
        const { searchParams } = new URL( req.url )
        // console.log( searchParams )
        // const id = searchParams.get( "signup" )
        if ( searchParams.get( "signup" ) ) {
            return register( req )
        }

        if ( searchParams.get( "login" ) ) {
            return login( req )
        }

        return NextResponse.json( {
            message: "conneted"
        } )

    } catch ( error ) {
        return NextResponse.json( {
            message: "register error",
            success: false,
            error: error
        } )
    }
}


