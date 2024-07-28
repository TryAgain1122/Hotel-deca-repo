import React from 'react'
import RoomModel from '@/models/room-models'
import PageTitle from '@/app/components/page-title'
import LinkButton from '@/app/components/link-button'
import RoomsTable from './_common/rooms-table'

const RoomsPage = async () => {
  const response = await RoomModel.find().populate("hotel").sort({ createdAt: -1 })
  const rooms = JSON.parse(JSON.stringify(response))
  return (
    <div>
      <div className='flex justify-between items-center mt-5'>
        <PageTitle title='Rooms'/>
        <LinkButton path='/admin/rooms/add' title='Add Room' />
      </div>
      <RoomsTable rooms={rooms}/>
    </div>
  )
}

export default RoomsPage