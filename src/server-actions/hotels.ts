"use server"

import { connectMongoDB } from "@/app/config/db";
import HotelModel from "@/models/hotel-models"


connectMongoDB()

export const AddHotel = async (payload: any) => {
    try {
        const newHotel = new HotelModel(payload);
        await newHotel.save();
        return {
            success: true, 
            message: "Hotel added successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        }
    }
}