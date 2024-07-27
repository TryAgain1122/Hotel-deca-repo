import LinkButton from '@/app/components/link-button'
import PageTitle from '@/app/components/page-title'
import React from 'react'

const HotelsPage = () => {
  return (
    <div className='flex justify-between items-center mt-5'>
      <PageTitle title='Hotels' />
      <LinkButton title='Add Hotel' path='/admin/hotels/add'/>
    </div>
  )
}

export default HotelsPage