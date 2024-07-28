import PageTitle from '@/app/components/page-title'
import HotelModel from '@/models/hotel-models'
import RoomModel from '@/models/room-models'
import React from 'react'
import RoomsForm from '../../_common/rooms-form'

const EditRoomPage = async({
  params, 
}: {
  params: {
    id: string
  }
}) => {
  const response = await RoomModel.findById(params.id);
  const room = JSON.parse(JSON.stringify(response))

  const hotelResponse = await HotelModel.find();
  const hotels = JSON.parse(JSON.stringify(hotelResponse))
  return (
    <div>
      <PageTitle title='Edit Room' />
      <RoomsForm initialData={room} type='edit' hotels={hotels} />
    </div>
  )
}

export default EditRoomPage