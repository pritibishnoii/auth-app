import mongoose from "mongoose";


const userSchema = new mongoose.Schema( {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, { timestamps: true } );



// ✅ Only create the model if it hasn't been compiled already
const User = mongoose.models.User || mongoose.model( "User", userSchema );

export default User;

// or
// export default mongoose.models.User || mongoose.model( "User", userSchema );