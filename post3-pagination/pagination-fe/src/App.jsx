import { useState } from 'react'
import NetflixMinimal from './netflixminimal'
import Netflixloadbulk from './netflixload-bulk'
function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="flex gap-2 bg-gray-400">
    <div className='w-[33%]'>
      <Netflixloadbulk />
    </div>
    <div className='w-[33%]'>
      <NetflixMinimal />
    </div>
    <div className='w-[33%]'>
      <NetflixMinimal />
    </div>
  
  </div>
   
  )
}

export default App
