import { useState } from 'react'
import NetflixMinimal from './netflixminimal'
import Netflixloadbulk from './netflixload-bulk'
import Navbar from './navbar'
import Netflixloadretro from './netflixload-retro'
function App() {
  const [count, setCount] = useState(0)

  return (

  <div className=" bg-gray-400">

    <div className='flex gap-2'>
    <div className='w-[33%]'>
      <Netflixloadbulk />
    </div>
    <div className='w-[33%]'>
      <Netflixloadretro/>
    </div>
    <div className='w-[33%]'>
      <NetflixMinimal />
    </div>
  </div>
  </div>
   
  )
}

export default App
