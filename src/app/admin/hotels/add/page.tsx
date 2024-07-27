import PageTitle from '@/app/components/page-title'
import React from 'react'
import HotelForm from '../_common/hotel-form'

const AddHotelPage = () => {
  return (
    <div>
        <PageTitle title='Add Hotel'/>
        <HotelForm type="add"/>
    </div>
  )
}

export default AddHotelPage