import { RestaurantProps } from '@/app/page';
import CardRestorant from './cardRestorant';

export default function ListRestorant( { data }: { data?: RestaurantProps[] } ) {
    return (
        <div className='sm:grid md:grid-cols-2 xl:grid-cols-3 gap-8 flex flex-col lg:mx-auto justify-center items-center lg:w-2/3 mx-4 mt-10'>
            {data?.map((restaurant, id) => (
                <div key={id}>
                    <CardRestorant
                        restorantId={restaurant.id}
                        restorantImageId={restaurant.pictureId}
                        restorantName={restaurant.name}
                        restorantRating={restaurant.rating}
                    />
                </div>
            ))}
        </div>
    )
}