import { connectMongoDB } from "@/app/config/db";
import BookingModel from "@/models/booking-model";
import { message } from "antd";



connectMongoDB();

export const CheckRoomAvailability = async ({
    roomId,
    reqCheckInDate,
    reqCheckOutDate
}: {
    roomId: string
    reqCheckInDate: string
    reqCheckOutDate: string
})  => {
    try { 
        const bookSlot = await BookingModel.findOne({
            room: roomId,
            bookingStatus: "Booked",
            $or: [
                {
                    checkInDate: {
                        $gte: reqCheckInDate,
                        $lte: reqCheckOutDate,
                    }
                },
                {
                    checkOutDate: {
                        $gte: reqCheckInDate,
                        $lte: reqCheckOutDate
                    }
                },
                {
                    $and: [
                        { checkInDate: { $lte: reqCheckInDate }},
                        { checkOutDate: { $gte: reqCheckOutDate }}
                    ]
                }
            ]
        })

        if (bookSlot) {
            return {
                success: false
            }
        }

        return {
            success: true
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}