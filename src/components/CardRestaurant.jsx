import { Link } from "react-router-dom";

const CardRestaurant = ({children}) => {
    return (
        <div className='w-full h-full rounded-md flex flex-col justify-center bg-gray-200'>
            {children}
        </div>
    )
}

const Header = ({image, alt}) => {
    return (
        <div className='w-full h-60 p-4'>
            <img src={image} alt={alt} className='w-full h-full object-cover' />
        </div>
    )
}

const Body = ({
    storeName,
    rating,
    address,
    price,
    isOpen
}) => {
    return (
        <div>
            <div className='rounded-md flex flex-col'>
                <h2 className='text-xl'>{storeName ? storeName.length > 30 ? storeName.substring(0,30) + "..." : storeName : null}</h2>
                <p>Rating: {rating}&#9733;</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex w-1/2'>
                    <p>{address ? address.length > 20 ?  address.substring(0,15) + "...": address : "Surabaya"}{" - "}{price ? price : '$$'}</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div className={`${isOpen === "Buka" ? 'bg-green-500' : 'bg-red-500'} w-2 h-2 rounded-full`}></div>
                    <p className='text-sm'>{isOpen}</p>
                </div>
            </div>
        </div>
    )
}

const Footer = ({placeId}) => {
    return (
        <div>
            <Link to={`/details/${placeId}`} className='flex justify-center bg-blue-800 text-white p-2 rounded-md'>Learn More</Link>
        </div>
    )
}

CardRestaurant.Header = Header;
CardRestaurant.Body = Body;
CardRestaurant.Footer = Footer;

export default CardRestaurant;