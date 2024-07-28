'use client'

import { RoomType } from '@/interfaces'
import { CheckRoomAvailability } from '@/server-actions/bookings'
import { Button, Form, Input, message } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'


const Checkout = ({ room }: { room: RoomType}) => {
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [isAvailable, setIsAvailable] = useState(false);
    const [totalDays, setTotalDays] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [clientSecret, setClientSecret] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkAvailability = async () => {
        try {
            const response = await CheckRoomAvailability({
                roomId: room._id,
                reqCheckInDate: checkIn,
                reqCheckOutDate: checkOut
            });

            if (response.success) {
                setIsAvailable(true);
                message.success("Room is available");

                const totalDaysTemp = dayjs(checkOut).diff(dayjs(checkIn), "day");
                setTotalDays(totalDaysTemp)
                setTotalAmount(totalDaysTemp * room.rentPerDay)
            } else {
                setIsAvailable(false)
                message.error("Room is not available")
            }
        } catch(error: any) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        setIsAvailable(false)
    }, [checkIn, checkOut])
  return (
    <div className='flex flex-col gap-5 p-5 border border-gray-300 broder-solid rounded-lg'>
        <Form layout='vertical' className='flex flex-col gap-5 text-gray-500'>
            <Form.Item label='check In'>
                <Input 
                    type='date'
                    onChange={(e) => setCheckIn(e.target.value)}
                    value={checkIn}
                    min={dayjs().format("YYYY-MM-DD")}
                 />
            </Form.Item>
            <Form.Item label='check Out'>
                <Input 
                    type='date'
                    onChange={(e) => setCheckOut(e.target.value)}
                    value={checkOut}
                    min={dayjs(checkIn).add(1, "day").format("YYYY-MM-DD")}
                    disabled={!checkIn}
                 />
            </Form.Item>
            <Button 
                type='primary'
                className='w-full p-5 rounded-lg'
                disabled={!checkIn || !checkOut || isAvailable}
                onClick={checkAvailability}
            >
                Check Availability
            </Button>

            {isAvailable && (
                <>
                    <div className='flex justify-between'>
                        <span>Total Days</span>
                        <span>{totalDays}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Total Amount</span>
                        <span>${totalAmount}</span>
                    </div>
                    <Button 
                        type='primary'
                        className='w-full'
                        loading={loading}
                        // onClick={}
                    >
                        Book Your Room 
                    </Button>
                </>
            )}
        </Form>
    </div>
  )
}

export default Checkout