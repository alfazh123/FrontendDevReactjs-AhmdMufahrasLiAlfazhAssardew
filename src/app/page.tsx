'use client';

import { useEffect, useState } from "react";
import ListRestorant from "./components/listRestorant";
// import { getList } from "./api/dataSource";

export interface RestaurantProps {
  id: string;
  pictureId: string;
  city: string;
  description: string;
  name: string;
  rating: number;
}

export default function Home() {
  const [data, setData] = useState<RestaurantProps[]>()


  const fetchdata = async () => {
    const res = await fetch('https://restaurant-api.dicoding.dev/list')
    const json = await res.json()
    return json.restaurants;
  }

  useEffect(() => {
    fetchdata().then((data) => setData(data))
    console.log(data)
  }, [])

  console.log(data)

  return (
    <div>
      <ListRestorant data={data} />
    </div>
  );
}
