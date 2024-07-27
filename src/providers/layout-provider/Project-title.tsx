import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProjectTitle = () => {
  return (
    <div className='p-5'>
        <Link href={'/'}>
        <Image
            src={'/Images/logo.png'}
            alt=''
            width={50}
            height={50}
            className='rounded-full'
        />
        </Link>
    </div>
  )
}

export default ProjectTitle