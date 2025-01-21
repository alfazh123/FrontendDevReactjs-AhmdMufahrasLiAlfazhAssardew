'use client'

import { use, useEffect, useState } from "react";
import { RestaurantProps } from "../page";
import Image from "next/image";
import { join } from "path";

interface RestaurantDetailProps {
    id: string;
    pictureId: string;
    city: string;
    address: string;
    description: string;
    name: string;
    rating: number;
    categories: { name: string }[];
    menus: { foods: { name: string }[], drinks: { name: string }[] };
    customerReviews: { name: string, review: string, date: string }[];
}

export default function DetailRestaurant({ params } : { params: Promise<{ id: string }> }) {

    const [data, setData] = useState<RestaurantDetailProps>()
    const [buttonActive, setButtonActive] = useState('')
    const param = use(params)

    const fetchdata = async () => {
        const res = await fetch(`https://restaurant-api.dicoding.dev/detail/${param.id}`)
        const json = await res.json()
        return json.restaurant;
    }

    const buttonItem = [
        {
            name: 'Foods',
            query: ''
        },
        {
            name: 'Drinks',
            query: 'drinks'
        }
    ]

    useEffect(() => {
        fetchdata().then((data) => setData(data))
    }, [])
    console.log("data",data)
    
    return (
        <div className="flex flex-col gap-12 mt-10 max-w-[1200px] justify-center mx-auto">
            <div className="p-4 rounded-lg h-fit">
                <div className="w-full h-96 relative">
                    <Image src={`https://restaurant-api.dicoding.dev/images/large/${data?.pictureId}`} alt={"restaurant"} width={800} height={200} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute bottom-4 left-4 text-white bg-slate-700 bg-opacity-75 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold">{data?.name}, {data?.rating} ⭐</h1>
                        <p>{data?.address}, {data?.city}</p>
                    </div>
                </div>
                {/* <p>{data?.description}</p> */}
            </div>

            <div className="p-4 max-w-[1000px] mx-auto">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div>
                        <h1 className="text-2xl font-bold">About {data?.name}</h1>
                        <p>{data?.description}</p>
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold">Categories restaurant</h1>
                        <div>
                            {data?.categories.map((cat, id) => cat.name).join(', ')}
                        </div>
                        <div className="mt-10">
                            <h1 className="text-xl font-bold">Menu</h1>
                            <div className="flex gap-4">
                                <button onClick={() => setButtonActive('')}>Foods</button>
                                <button onClick={() => setButtonActive('drinks')}>Drinks</button>
                            </div>
                            { buttonActive === '' && (
                                <div className="h-36 overflow-y-scroll">
                                    <h1>Foods</h1>
                                    <ul>
                                        {data?.menus.foods.map((food, id) => (
                                            <li key={id}>{food.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            { buttonActive === 'drinks' && (
                                <div className="h-36 overflow-y-scroll">
                                    <h1>Drinks</h1>
                                    {data?.menus.drinks.map((drink, id) => (
                                        <p key={id}>{drink.name}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h1 className="text-xl font-bold">Reviews</h1>
                    <ul className="flex gap-4 ">
                        {data?.customerReviews.map((review, id) => (
                            <li key={id} className="bg-slate-200 px-4 py-2 rounded-md flex">
                                <div className="w-3/4">
                                    <div className="flex gap-4 items-center">
                                        <h4 className="text-lg font-semibold">{review.name}</h4>
                                        <p className="text-xs">{review.date}</p>
                                    </div>
                                    <p>{data?.rating} ⭐</p>
                                    <p className="text-base">{review.review}</p>
                                </div>
                                <Image src={`https://restaurant-api.dicoding.dev/images/small/${data?.pictureId}`} alt="profile" width={100} height={100} className="rounded-md pl-2" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}