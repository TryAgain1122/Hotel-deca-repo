'use client'

import React from 'react'
import Spinner from './components/Spinner'

const loading = () => {

  return <div className='w-full h-[100vh] flex items-center justify-center'>
    <Spinner />
  </div>
}

export default loading