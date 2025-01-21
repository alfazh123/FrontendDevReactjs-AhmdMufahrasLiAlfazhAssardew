import Image from "next/image";
import Link from "next/link";

interface CardRestorantProps {
    restorantId: string;
    restorantName: string;
    restorantImageId: string;
    restorantRating: number;
    restorantPriceRange: string;
    categories: { name: string }[];
    isOpen: boolean;
}


export default function CardRestorant({ restorantId, restorantImageId, restorantName, restorantRating, restorantPriceRange, isOpen, categories }: CardRestorantProps) {


    const stars = []
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(restorantRating)) {
            stars.push(<span key={i} className="text-blue-950 text-xl">★</span>)
        } else if (i < restorantRating) {
            stars.push(<span key={i} className="text-blue-950 text-xl">☆</span>)
        } else {
            stars.push(<span key={i} className="text-blue-200 text-xl">★</span>)
        }
    }

    return (
        <div className="w-full">
            <Image src={`https://restaurant-api.dicoding.dev/images/medium/${restorantImageId}`} alt={restorantName} width={800} height={300} className="h-48 object-cover" />
            <div>
                <h1 className="text-lg font-semibold">{restorantName}</h1>
                {/* <p>{restorantRating}</p> */}
                <div>{stars.map((star) => star)}</div>
                <p>{restorantPriceRange}</p>
                <div className="flex justify-between">
                    <p>{categories.map((cat : { name: string}) => cat.name).join(', ')}</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className={`w-2 h-2 ${isOpen ? 'bg-green-400' : 'bg-red-600'} rounded-full`}></span>
                        <p>{isOpen ? 'Open' : 'Closed'}</p>
                    </div>
                </div>

                <Link href={`/${restorantId}`} className="flex justify-center items-center w-full py-2 bg-blue-900 text-white font-semibold">
                    See Detail
                </Link>
            </div>
        </div>
    )   
}