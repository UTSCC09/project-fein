import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: String,
    hash: String,
    fein_bucks: Number
})
const User = mongoose.model('User', usersSchema);
export default User;