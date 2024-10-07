import React from 'react'
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen z-[200] bg-white justify-center items-center flex flex-col gap-4'>
        <div>
            <h1 className='text-4xl font-bold text-center'>404</h1>
            <p className='text-center'>Page not found</p>
        </div>
        <Button href={'/'}>Go Home</Button>
    </div>
  )
}
