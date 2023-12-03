import mongoose from "mongoose";

const positionsSchema = new mongoose.Schema({
    username: String,
    symbol: String,
    numShares: Number,
    totalSpent: Number
})
const Position = mongoose.model('Position', positionsSchema);
export default Position;