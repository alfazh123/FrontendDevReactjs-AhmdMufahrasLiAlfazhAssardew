import { useParams } from "react-router-dom"
import { getRestaurantbyId } from "../../service/load.data"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import generateData from "../../service/generate"
import { da } from "@faker-js/faker"

const DetailRestaurant = () => {
    const [restaurant, setRestaurant] = useState({})
    // const [review, setReview] = useState([])
    const {id} = useParams()
    const review = generateData()

    useEffect(() => {
        getRestaurantbyId(id).then((data) => {
            setRestaurant(data)
        })


    }, [])

    console.log(restaurant)
    console.log(review)

    return (
        <div className="flex flex-col m-auto">
            <div className="w-5/6 h-full flex flex-col m-auto mt-20 shadow-2xl p-4 rounded-md gap-4">

                <Link to='/' className="hoverbg-slate-200 w-20 h-10 justify-center items-center flex rounded-md">
                    <div className="border-2 border-l-slate-950 border-b-slate-950 border-r-slate-50 border-t-slate-50 w-4 h-4 rotate-45 "></div> Back
                </Link>
                <content className="flex flex-wrap gap-4">
                    <figure className="lg:w-96 w-full rounded-md">
                        <img src={restaurant.image} alt={restaurant.storeName} className='w-full h-full object-cover rounded-md' />
                    </figure>

                    <article className="w-full">
                        <h1 className="text-xl font-semibold">{restaurant.storeName}</h1>
                        <a href={restaurant.googleUrl} className="text-sm hover:underline" target="blank">
                            {restaurant.address}
                        </a>
                        <span className="flex justify-between">
                            <span className="flex gap-4">
                                <p>{restaurant.category}</p>
                                <span>.</span>
                                <p>{restaurant.price ? restaurant.price : '$$'}</p>
                            </span>

                            <span className="flex items-center gap-2">
                                <span className={`${restaurant.isOpen === "Buka" ? 'bg-green-500' : 'bg-red-500'} w-2 h-2 rounded-full`}></span>
                                <p>{restaurant.isOpen}</p>
                            </span>
                        </span>
                        <p>{restaurant.ratingText}</p>
                        <p>{restaurant.description}</p>
                    </article>
                </content>
                {review.map((data, id) => {
                    return (
                        <div key={id} className="flex flex-col py-4 border border-slate-700 rounded-md p-4">
                            <span className="space-y-2">
                                <h2 className="font-semibold text-lg">{data.reviewerName}</h2>
                                <p>{data.rating}</p>
                                <p>{data.address}</p>
                            </span>
                            
                            <p>Duis aute anim ut irure reprehenderit magna magna proident nisi. Culpa deserunt qui sint enim quis sit excepteur non veniam consequat adipisicing duis laboris aliquip. Do ipsum qui minim veniam ad velit occaecat sunt proident Lorem id et sint duis.</p>
                            <img src={data.image} alt={data.reviewerName + restaurant.storeName} className='w-40 h-full' />
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default DetailRestaurant