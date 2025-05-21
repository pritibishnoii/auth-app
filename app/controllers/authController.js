import User from "../Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cors from "cors"


// user rgister 
export const register = async ( req ) => {
    const body = await req.json()
    const { name, email, password } = body
    // console.log( name, email, password )
    try {
        let user = await User.findOne( { email: email } )

        if ( user ) return NextResponse.json( {
            message: "user already exist... ",
            success: false
        } )
        const hashedPassword = await bcrypt.hash( password, 10 )
        user = await User.create( { name, email, password: hashedPassword } )

        return NextResponse.json( {
            message: "user register Successfully,",
            user,
            success: true,
        } )
    } catch ( error ) {
        return NextResponse.json( {
            message: "server error",
            error: error.message
        } )
    }

}



// user login 
export const login = async ( req ) => {
    const { email, password } = await req.json()
    try {
        let user = await User.findOne( { email } )
        if ( !user ) return NextResponse.json( {
            message: "user not exist",
            success: false,

        } )

        // if user finded 
        const validPass = await bcrypt.compare( password, user.password )
        if ( !validPass ) {
            return NextResponse.json( {
                message: "password is invalid ",
                success: false,

            } )
        }

        const token = jwt.sign( { id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        } )
        return NextResponse.json( {
            message: `${ user.name } logedin successfully  `,
            success: true,
            user,
            token

        } )


    } catch ( error ) {
        return NextResponse.json( {
            message: "login server  error",
            error: error.message
        } )
    }
}