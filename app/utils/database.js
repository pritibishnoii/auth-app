import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;
const connectDB = async () => {

    try {
        await mongoose.connect( MONGODB_URI, {
            dbName: "NextJS_Auth_App"
        } );

        console.log( "Mongodb DATABASE CONNECTED SUCCESSFULLY ..💚💚💚💚" )
    } catch ( error ) {
        console.log( "database connection issue", error )
    }
}

export default connectDB;




