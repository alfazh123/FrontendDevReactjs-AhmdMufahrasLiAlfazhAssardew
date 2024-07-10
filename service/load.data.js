import { data } from "autoprefixer"

const fetchData = (callback) => {
    try {
        fetch("https://api-one-pied.vercel.app/api/v1/restaurants")
            .then((response) => response.json())
            .then((data) => {
                callback(data.places)
            
            })
    } catch (error) {
        console.log(error)
    }
}

const getRestaurantbyId = async (id) => {
    const data = await fetch("https://api-one-pied.vercel.app/api/v1/restaurants")
    const result = await data.json()
    const restaurant = result.places.filter((place) => place.placeId === id)
    return restaurant[0]
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

const getCategories = async () => {
    const data = await fetch("https://api-one-pied.vercel.app/api/v1/restaurants")
    const result = await data.json()
    const categories = result.places.map((place, id) => id<=8 && place.category)
    return removeDuplicates(categories)


}

export { fetchData, getRestaurantbyId, getCategories }
