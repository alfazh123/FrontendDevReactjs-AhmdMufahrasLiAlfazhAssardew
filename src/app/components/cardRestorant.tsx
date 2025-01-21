import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CardRestorantProps {
    restorantId: string;
    restorantName: string;
    restorantImageId: string;
    // restorantAddress: string;
    restorantRating: number;
    // restorantPriceRange: string;
    // kurang price range dan open/close
}

export default function CardRestorant({ restorantId, restorantImageId, restorantName, restorantRating }: CardRestorantProps) {

    const closeTime = Math.floor(restorantRating)+12
    const openTime = closeTime-10

    const [isClosed, setIsClosed] = useState(false)
    useEffect(() => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        console.log('hours', hours)
        console.log('minutes', minutes)

        if (hours < closeTime && hours > openTime) {
            setIsClosed(false)
            console.log(hours, closeTime, openTime)
        } else {
            setIsClosed(true)
        }
    }, [])

    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`https://restaurant-api.dicoding.dev/detail/${restorantId}`)
            .then(response => response.json())
            .then(data => {
                setCategories(data.restaurant.categories)
            })
    }, [])

    return (
        <div className="w-full">
            <Image src={`https://restaurant-api.dicoding.dev/images/medium/${restorantImageId}`} alt={restorantName} width={800} height={300} className="h-48 object-cover" />
            <div>
                <h1 className="text-lg font-semibold">{restorantName}</h1>
                <p className="text-sm">{restorantRating > 4 ? '$$$' : restorantRating < 3.8 ? '$' : '$$' }</p>
                <p>{restorantRating}</p>
                <div className="flex justify-between">
                    <p>{categories.map((cat: any) => cat.name).join(', ')}</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className={`w-2 h-2 ${isClosed ? 'bg-red-600' : 'bg-green-400'} rounded-full`}></span>
                        <p>{isClosed ? 'Closed' : 'Open'}</p>
                    </div>
                </div>

                <Link href={`/${restorantId}`} className="flex justify-center items-center w-full py-2 bg-blue-900 text-white font-semibold">
                    See Detail
                </Link>
            </div>
        </div>
    )   
}