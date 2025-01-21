import Image from "next/image";

interface CommentProps {
    name: string;
    review: string;
    date: string;
    rating: number;
    pictureId: string;
}

export default function Comment({
    name,
    review,
    date,
    rating,
    pictureId
}: CommentProps) {
    return (
        <>
            <Image src={`https://restaurant-api.dicoding.dev/images/small/${pictureId}`} alt="profile" width={100} height={100} className="rounded-md w-20 h-20 object-cover" />
            <div className="w-64">
                <div className="flex gap-4 items-center">
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <p className="text-xs">{date}</p>
                </div>
                <p>{rating} ⭐</p>
                <p className="text-base">{review}</p>
            </div>
        </>
    )
}