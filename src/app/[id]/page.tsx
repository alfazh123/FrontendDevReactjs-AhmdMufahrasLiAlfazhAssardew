'use client'

import { use, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Comment from "../components/detail/comment";
import Link from "next/link";

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

    const fetchdata = useCallback(async () => {
        const res = await fetch(`https://restaurant-api.dicoding.dev/detail/${param.id}`)
        const json = await res.json()
        return json.restaurant;
    }, [param.id])

    useEffect(() => {
        fetchdata().then((data) => setData(data))
    }, [fetchdata])
    console.log("data",data)
    
    return (
        <div className="flex flex-col gap-12 mt-10 max-w-[1200px] justify-center mx-auto">

            <div className="flex w-fit fixed top-10 bg-slate-200 bg-opacity-50 p-4 rounded-md z-10 backdrop-blur-md">
                <Link href="/" className="text-lg font-bold">
                    <p>Back</p>
                </Link>
            </div>

            <div className="p-4 rounded-lg h-fit mt-20">
                <div className="w-full h-96 relative">
                    <Image src={`https://restaurant-api.dicoding.dev/images/large/${data?.pictureId}`} alt={"restaurant"} width={800} height={200} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute bottom-4 left-4 text-white bg-slate-700 bg-opacity-75 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold">{data?.name}, {data?.rating} ⭐</h1>
                        <p>{data?.address}, {data?.city}</p>
                    </div>
                </div>
                {/* <p>{data?.description}</p> */}
            </div>

            <div className="p-4 max-w-[1000px] mx-auto mb-20">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div>
                        <h1 className="text-2xl font-bold">About {data?.name}</h1>
                        <p>{data?.description}</p>
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold">Categories restaurant</h1>
                        <div>
                            {data?.categories.map((cat) => cat.name).join(', ')}
                        </div>
                        <div className="mt-10">
                            <h1 className="text-xl font-bold">Menu</h1>
                            <div className="flex gap-4">
                                <button onClick={() => setButtonActive('')} className={`${buttonActive == '' ? 'bg-slate-200 rounded-md p-2' : 'p-2'} text-lg`}>Foods</button>
                                <button onClick={() => setButtonActive('drinks')} className={`${buttonActive == 'drinks' ? 'bg-slate-200 rounded-md p-2' : 'p-2'} text-lg`}>Drinks</button>
                            </div>
                            { buttonActive === '' && (
                                <div className="h-36 overflow-y-scroll">
                                    {data?.menus.foods.map((food, id) => (
                                        <p key={id} className="text-lg">{food.name}</p>
                                    ))}
                                </div>
                            )}
                            { buttonActive === 'drinks' && (
                                <div className="h-36 overflow-y-scroll">
                                    {data?.menus.drinks.map((drink, id) => (
                                        <p key={id} className="text-lg">{drink.name}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h1 className="text-xl font-bold">Reviews</h1>
                    <ul className="flex gap-4 overflow-x-scroll">
                        {data?.customerReviews.map((review, id) => (
                            <li key={id} className="bg-slate-200 px-4 py-2 rounded-md flex flex-col">
                                <Comment
                                    name={review.name}
                                    review={review.review}
                                    date={review.date}
                                    rating={data?.rating}
                                    pictureId={data?.pictureId}
                                    />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}