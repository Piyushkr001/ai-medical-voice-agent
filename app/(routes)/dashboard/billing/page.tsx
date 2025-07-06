import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function billing() {
  return (
    <div className='px-10 md:px-24 lg:px-48'>
        <h2 className='text-3xl text-center font-bold mb-10'>Subscribe Now</h2>
        <PricingTable/>
    </div>
  )
}

export default billing