import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://242210011:ishruti@cluster0.ahhs7.mongodb.net/food-del').then(()=>console.log("DB connected"))
}