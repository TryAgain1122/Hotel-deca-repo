import LinkButton from '@/app/components/link-button'
import PageTitle from '@/app/components/page-title'
import HotelModel from '@/models/hotel-models'
import React from 'react'
import HotelTable from './_common/hotel-table'

const HotelsPage = async () => {
  const response = await HotelModel.find().sort({ created: -1 })
  const hotels = JSON.parse(JSON.stringify(response))
  return (
    <>
    <div className='flex justify-between items-center mt-5'>
      <PageTitle title='Hotels' />
      <LinkButton title='Add Hotel' path='/admin/hotels/add'/>
    </div>

    <HotelTable hotels={hotels}/>
    </>
  )
}

export default HotelsPage