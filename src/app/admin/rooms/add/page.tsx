import PageTitle from '@/app/components/page-title'
import React from 'react'
import RoomsForm from '../_common/rooms-form'
import HotelModel from '@/models/hotel-models'

const AddRoomPage = async () => {
  const response = await HotelModel.find()
  const hotels = JSON.parse(JSON.stringify(response))
  return (
    <div>
      <PageTitle title='Add Room'/>
      <RoomsForm hotels={hotels}/>
    </div>
  )
}

export default AddRoomPage