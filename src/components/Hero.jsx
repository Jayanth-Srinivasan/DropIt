import React from 'react';
import HeroLogo from '../assets/HeroLogo.png';

function Hero({user,setUser,signIn}) {
  return (
    <section className='h-screen w-screen flex justify-center items-center '>
        <div className='md:h-5/6 md:w-5/6 h-5/6 w-full flex md:flex-row flex-col bg-slate-200/80 rounded-xl shadow-md'>
            <div className='md:w-1/2 w-full h-full flex justify-start items-center'>
                <div className='p-5 w-full'>
                <h1 className='text-4xl font-semibold'>Share Your <span className='text-[#007FFF]'>Files</span> in a Minute to Anyone!</h1>
                <p className='text-xl'>This is my first application using React Library</p>
                <button 
                onClick={signIn}
                className='py-2 px-4 mt-5 bg-[#0067CF] rounded-md shadow-sm w-fit hover:bg-green-500'>Share Now</button>
                </div>
            </div>
            <div className=' hidden w-1/2 h-full md:flex justify-center items-center '>
                <img src={HeroLogo} alt='' />
            </div>
        </div>
    </section>
  )
}

export default Hero