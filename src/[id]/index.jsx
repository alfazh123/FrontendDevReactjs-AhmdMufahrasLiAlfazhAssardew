import { useParams } from "react-router-dom"

const DetailRestaurant = () => {
    const {id} = useParams()
    return (
        <div>
            Detail Restaurant {id}
        </div>
    )
}

export default DetailRestaurant