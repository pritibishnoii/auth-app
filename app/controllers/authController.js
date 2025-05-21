import User from "../Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// User registration
export const register = async ( req ) => {
    try {
        const { name, email, password } = await req.json();

        if ( !name || !email || !password ) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne( { email } );
        if ( existingUser ) {
            return NextResponse.json(
                { message: "User already exists", success: false },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash( password, 10 );
        const user = await User.create( { name, email, password: hashedPassword } );

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: { id: user._id, name: user.name, email: user.email },
                success: true
            },
            { status: 201 }
        );

    } catch ( error ) {
        return NextResponse.json( { error, message: "Registration failed" } );
    }
};

// User login
export const login = async ( req ) => {
    try {
        const { email, password } = await req.json();

        if ( !email || !password ) {
            return NextResponse.json(
                { message: "Email and password are required", success: false },
                { status: 400 }
            );
        }

        const user = await User.findOne( { email } );
        if ( !user ) {
            return NextResponse.json(
                { message: "Invalid credentials", success: false },
                { status: 401 }
            );
        }

        const validPass = await bcrypt.compare( password, user.password );
        if ( !validPass ) {
            return NextResponse.json(
                { message: "Invalid credentials", success: false },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return NextResponse.json(
            {
                message: "Login successful",
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email }
            },
            { status: 200 }
        );

    } catch ( error ) {
        return NextResponse.json( { error, message: "Login failed" } );
    }
};