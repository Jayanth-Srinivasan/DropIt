import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();

  return (
    <section className='h-screen w-screen  bg-slate-300/80'>
      <div className='h-full w-3/4 mx-auto flex flex-col justify-center items-center '>
        <h1 className='mb-10 text-3xl font-semibold '>Share or Receive the Files</h1>
        <div className='flex flex-row justify-evenly items-stretch gap-6'>
          <div onClick={() => navigate('/send')}  className='px-4 py-6 rounded-lg w-52 bg-emerald-400 transform transition-all duration-300 hover:scale-110 hover:bg-emerald-500/60'>
            <div className='max-w-sm p-6 rounded-lg'>
              <h1 className='text-2xl font-semibold text-center tracking-wider'>Send</h1>
            </div>
          </div>
          <div onClick={() => navigate('/receive')} className='px-4 py-6 rounded-lg w-52 bg-emerald-400 transform transition-all duration-300 hover:scale-110 hover:bg-emerald-500/60'>
            <div className='max-w-sm p-6 rounded-lg'>
              <h1 className='text-2xl font-semibold text-center tracking-wider'>Receive</h1>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  )


}


export default Home