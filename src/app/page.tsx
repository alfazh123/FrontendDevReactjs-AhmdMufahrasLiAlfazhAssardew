'use client';

import { useEffect, useState } from "react";
import ListRestorant from "./components/listRestorant";
// import Dropdown from "./components/filter/dropDown";
// import CardRestorant from "./components/cardRestorant";

export interface RestaurantProps {
  id: string;
  pictureId: string;
  city: string;
  description: string;
  name: string;
  rating: number;
}

export interface RestaurantFinalProps {
  id: string;
  pictureId: string;
  city: string;
  description: string;
  name: string;
  rating: number;
  isOpen: boolean;
  categories: { name: string }[];
  price: string;
}

export default function Home() {
  // const [data, setData] = useState<RestaurantProps[]>()
  const [filter, setFilter] = useState({
    price: '',
    categories: '',
    openNow: false
  })

  const fetchdata = async () => {
    const res = await fetch('https://restaurant-api.dicoding.dev/list')
    const json = await res.json()
    return json.restaurants;
  }

  const detailResto = async (id: string) => {
    const res = await fetch(`https://restaurant-api.dicoding.dev/detail/${id}`)
    const json = await res.json()
    return json.restaurant.categories;
  }

  const [finalDataResto, setFinalData] = useState<RestaurantFinalProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [categorie, setCategories] = useState<string[]>([])

  useEffect(() => {
    // fetchdata().then((data) => setData(data))
    // console.log(data)
    fetchdata().then((data) => {
      const finalData: RestaurantFinalProps[] = []
      data.map((restaurant: RestaurantProps) => {
        detailResto(restaurant.id).then((categories) => {
          categories.map((cat: {name: string}) => {
            console.log(cat.name)
            setCategories((prev) => {
              if (!prev.includes(cat.name)) {
                return [...prev, cat.name];
              }
              return prev;
            });
          })
          const closeTime = Math.floor(restaurant.rating) + 12
          const openTime = closeTime - 10
          
          const date = new Date()
          const hours = date.getHours()

          if (hours < closeTime && hours > openTime) {
            setIsOpen(true)
          } else {
            setIsOpen(false)
          }

          const newData = {
            id: restaurant.id,
            pictureId: restaurant.pictureId,
            city: restaurant.city,
            description: restaurant.description,
            name: restaurant.name,
            rating: restaurant.rating,
            isOpen: isOpen,
            categories: categories,
            price: restaurant.rating > 4 ? '$$$' : restaurant.rating < 3.8 ? '$' : '$$'
          }
          console.log(newData.isOpen)
          finalData.push(newData)
        })
      })
      setFinalData(finalData)
    })
  }, [isOpen])

  const [filteredResto, setFilteredResto] = useState<RestaurantFinalProps[]>([]);

  useEffect(() => {
    const newFilteredResto = finalDataResto.filter((resto) => {
      return (
        (filter.price === '' || resto.price === filter.price) &&
        (filter.categories === '' || resto.categories.find((cat) => cat.name === filter.categories)) &&
        (filter.openNow ? resto.isOpen : true)
      );
    });
    console.log(filter);
    setFilteredResto(newFilteredResto);
  }, [filter, finalDataResto]);

  return (
    <div className="lg:mx-auto justify-center items-center lg:w-2/3 mx-4 mt-10">
      <div className="flex flex-wrap gap-2 underline">
        <span className="flex justify-center items-center gap-2">
          <input type="checkbox" name="categories" id="all" value={filter.openNow? 'open' : 'closed'} placeholder="Open Now" onChange={() => setFilter((prev) => ({...prev, openNow: !prev.openNow}))} />
          <p>Open Now</p>
        </span>
        <select className="w-1/4 p-2 rounded-lg bg-gray-100" name="categories" id="categories" onChange={(e) => setFilter((prev) => ({...prev, categories: e.target.value}))}>
          <option value="">All</option>
          {categorie.map((category, id) => (
            <option key={id} value={category}>{category}</option>
          ))}
        </select>
        <select className="w-1/4 p-2 rounded-lg bg-gray-100" name="price" id="price" onChange={(e) => setFilter((prev) => ({...prev, price: e.target.value}))}>
          <option value="">All</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </div>
      {/* { filteredResto.map} */}
      {
        filter.openNow || filter.categories || filter.price ? (
          <ListRestorant data={filteredResto} />
        ) : (
          <ListRestorant data={finalDataResto} />
        )
      }
    </div>
  );
}