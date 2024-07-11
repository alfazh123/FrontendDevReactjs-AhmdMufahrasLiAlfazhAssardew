import { useState, useEffect } from 'react'
import {fetchData} from '../service/load.data'
import Navbar from './components/navbar'
import { useSelector } from 'react-redux'

import CardRestaurant from './components/CardRestaurant'

function App() {
  const [count, setCount] = useState(0)
  const [places, setPlaces] = useState([])
  const filter = useSelector((state) => state.filter.filter)

  useEffect(() => {
    fetchData((data) => {
      setPlaces(data)
      // console.log(data)
    })
    // console.log(places)
  }, [])

  let filteredPlaces = places.filter((place) => {
    let leng = place.price?.length
    return (
      (leng === (Number(filter.price)) || (place.price?.includes(filter.price))) &&
      (place.category?.includes(filter.categories)) &&
      (place.isOpen?.includes(filter.isOpen))
    )
  })


  return (
    <>
      <div className='flex flex-col mx-auto min-h-screen justify-center w-5/6 my-20'>
        <>
          <h1 className='text-3xl'>Restaurant</h1>
          <p>Fugiat ex dolor sunt consequat dolor cupidatat. Irure culpa elit ad Lorem Lorem eu anim dolor labore non dolor ullamco ex aute. Sit excepteur veniam aliquip sunt. Magna cillum occaecat officia occaecat nostrud nulla irure adipisicing. Dolor dolor officia excepteur consectetur qui consequat tempor.</p>
          <hr />
        </>

        <Navbar />

        <hr />

        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mx-auto mt-10'>
          {/* {places.map((place, id) => {
            const rating = place.ratingText ? place.ratingText.split(' ')[0] : 'No Rating';
            if (id > 8) return null
            return (
              <li key={id}>
                <CardRestaurant>
                  <CardRestaurant.Header image={place.image} alt={place.storeName} />
                  <div className='space-y-8 m-4'>
                    <CardRestaurant.Body
                      storeName={place.storeName}
                      rating={rating}
                      address={place.address}
                      price={place.price}
                      isOpen={place.isOpen}
                    />
                    <CardRestaurant.Footer placeId={place.placeId}/>
                  </div>
                </CardRestaurant>
              </li>
            )
          })} */}

          {filteredPlaces && filteredPlaces.map((place, id) => {
            const rating = place.ratingText ? place.ratingText.split(' ')[0] : 'No Rating';
            if (id > 8) return null
            return (
              <li key={id}>
                <CardRestaurant>
                  <CardRestaurant.Header image={place.image} alt={place.storeName} />
                  <div className='space-y-8 m-4'>
                    <CardRestaurant.Body
                      storeName={place.storeName}
                      rating={rating}
                      address={place.address}
                      price={place.price}
                      isOpen={place.isOpen}
                    />
                    <CardRestaurant.Footer placeId={place.placeId}/>
                  </div>
                </CardRestaurant>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
