import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {fetchData} from '../service/load.data'
import {Link} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetchData((data) => {
      setPlaces(data)
      console.log(data)
    })
    console.log(places)
  }, [])

  places.filter((p, id)=> {

  })

  return (
    <>
      <div className='flex flex-col mx-auto min-h-screen justify-center w-5/6 my-20'>
        <h1 className='text-3xl'>Restaurant List</h1>
        <ul className='flex flex-wrap gap-8'>
        {places.map((place, id) => {
          const rating = place.ratingText ? place.ratingText.split(' ')[0] : 'No Rating';

          return (
            <li key={id} className='w-96 h-full rounded-md flex flex-col justify-center bg-gray-200'>
              <div className='w-full h-60 p-4'>
                <img src={place.image} alt={place.storeName} className='w-full h-full object-cover' />
              </div>
              <div className='p-4 space-y-10'>
                <div>
                  <div className='rounded-md flex flex-col'>
                    <h2 className='text-xl'>{place.storeName}</h2>
                    <p>Rating: {rating}&#9733;</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex w-1/2'>
                      <p>{place.address ? place.address : "Surabaya"}{" - "}{place.price ? place.price : '$$'}</p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <div className={`${place.isOpen === "Buka" ? 'bg-green-500' : 'bg-red-500'} w-2 h-2 rounded-full`}></div>
                      <p className='text-sm'>{place.isOpen}</p>
                    </div>
                  </div>
                </div>

              </div>
                <div>
                  {/* <Link to="/path">Learn More</Link> */}
                </div>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  )
}

export default App
