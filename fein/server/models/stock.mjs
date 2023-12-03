import mongoose from "mongoose";

const stocksSchema = new mongoose.Schema({
    currency: String,
    description: String,
    displaySymbol: String,
    figi: String,
    isin: String,
    mic: String,
    shareClassFIGI: String,
    symbol: String,
    symbol2: String,
    type: String
})
const Stock = mongoose.model('Stock', stocksSchema);
export default Stock;