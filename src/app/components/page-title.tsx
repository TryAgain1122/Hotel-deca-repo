import React from 'react'

interface PageTitleProps {
    title: string;
}
const PageTitle: React.FC<PageTitleProps> = ({title}) => {
  return (
    <div className='text-2xl font-bold uppercase'>
        {title}
    </div>
  )
}

export default PageTitle