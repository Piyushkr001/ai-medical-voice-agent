import React from 'react'
import AppHeader from './_components/AppHeader';
import Footer from '@/app/_components/Footer';

function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader/>
      <div className='px-10 md:px-20 lg:px-40 py-10'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default DashBoardLayout