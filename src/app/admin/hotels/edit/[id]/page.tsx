import PageTitle from '@/app/components/page-title'
import HotelModel from '@/models/hotel-models'
import React from 'react'
import HotelForm from '../../_common/hotel-form'

interface EditHotelPageProps {
  params: { id : string }
}
const EditHotelPage: React.FC<EditHotelPageProps> = async ({params}) => {
  const hotelId = params.id
  const response = await HotelModel.findById(hotelId)
  const hotel = JSON.parse(JSON.stringify(response))
  return (
    <div>
        <PageTitle title='Edit Hotel Room'/>
        <HotelForm type='edit' initialData={hotel} />
    </div>
  )
}

export default EditHotelPage