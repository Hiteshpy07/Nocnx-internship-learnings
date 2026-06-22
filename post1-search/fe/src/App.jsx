import { useState,useRef } from 'react'
import axios from 'axios'
import img1 from '../../72910f6c6de9e630a7acd13c3cbea41c.jpg'
import img2 from '../../mqdefault.jpg'

function App() {
  const [req, setReq] = useState(0)
  const [normiesearch, setnormiesearch] = useState(false)
  const [debouncesearch, setdebouncesearch] = useState(false)
  const [normesearchcounter, setnormesearchcounter] = useState(0)
  const [debouncesearchcounter, setdebouncesearchcounter] = useState(0)

  const debounceTimer = useRef(null)


  const handlesearch = async (e) =>{
    const response=await axios.get(`http://localhost:3000/search?q=${e.target.value}`)

    console.log(response.data)
    setReq(prev=>prev+1)
    setnormiesearch(true)
    setnormesearchcounter(prev=>prev+1)
  }
  const handlesearchdebounce = async (x) =>{
  
    const value = x.target.value
    if (!value) return

    // a. Wipe out the previous timer if the user is still typing
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // b. Set up a brand new timer for 500ms
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/search?q=${x.target.value}`)
        console.log(response.data)
        
        // c. Only fires ONCE after the user stops typing for half a second
        setReq(prev => prev + 1)
        setdebouncesearch(true)
        setdebouncesearchcounter(prev => prev + 1)
      } catch (err) {
        console.error(err)
      }
    }, 500) // 500 milliseconds delay
  }

  return (
   <>
   <div className='text-2xl font-bold font-mono items-center flex justify-center mt-5'>let's SIMPLY search with me...</div>
   <div>
    <input type="text" placeholder='Search here...' className='border-2 border-gray-300 rounded-lg px-4 py-2 mt-5 w-[70%] flex ml-[15%] text-gray-700' 
    onChange={handlesearch} />
   </div>
   <span className='flex justify-center items-center text-xl font-mono mt-3'>Search requests: {normesearchcounter}</span>

<div className='flex'>
   {Array.from({ length: normesearchcounter }).map((_, index) => (
   <img src={img1} alt="Search Image" className={`m-5 h-[100px] w-[100px] ${normiesearch ? 'block' : 'hidden'}`} />
   ))
        }
        </div>
{/* this is a new thing i learned , hwo to render the in=mg tag as many times as the search request is made, just to show how many times the search request is made, and how it can be a problem if we dont use debounce in search functionality
https://gemini.google.com/app/b7ceda2ad661d94f?hl=en-IN */}


 <div className='text-2xl font-bold font-mono items-center flex justify-center mt-20'>let's search with me-DEBOUNCE EDITION</div>
   <div>
    <input type="text" placeholder='Search here...' className='border-2 border-gray-300 rounded-lg px-4 py-2 mt-5 w-[70%] flex ml-[15%] text-gray-700' 
    onChange={handlesearchdebounce} />
   </div>
   <span className='flex justify-center items-center text-xl font-mono mt-3'>Search requests: {debouncesearchcounter}</span>

<div className='flex'>
   {Array.from({ length: debouncesearchcounter }).map((_, index) => (
   <img src={img2} alt="Search Image" className={`m-5 h-[100px] w-[100px] ${debouncesearch ? 'block' : 'hidden'}`} />
   ))
        }
        </div>

   </>
  )
}

export default App
