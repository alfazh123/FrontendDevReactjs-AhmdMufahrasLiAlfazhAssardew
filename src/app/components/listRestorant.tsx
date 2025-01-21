import { RestaurantFinalProps } from '@/app/page';
import CardRestorant from './cardRestorant';

export default function ListRestorant( { data }: { data?: RestaurantFinalProps[] } ) {
    return (
        <div className='sm:grid md:grid-cols-2 xl:grid-cols-3 gap-8 flex flex-col mt-10'>
            {data?.map((restaurant, id) => (
                <div key={id}>
                    <CardRestorant
                        restorantId={restaurant.id}
                        restorantImageId={restaurant.pictureId}
                        restorantName={restaurant.name}
                        restorantRating={restaurant.rating}
                        restorantPriceRange={restaurant.price}
                        isClosed={restaurant.isOpen}
                    />
                </div>
            ))}
        </div>
    )
}