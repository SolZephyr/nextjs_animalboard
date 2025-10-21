"use client";

import { RestService } from "@/lib/service/rest";
import { LoaderCircle, Star } from "lucide-react";
import { MouseEvent, useState } from "react";

export default function ProfileFavourite({ profileId, favourites = 0, isFavourite = false }: { profileId: number, favourites?: number, isFavourite?: boolean }) {

    const [count, setCount] = useState<number>(favourites);
    const [hasFavourite, setFavourite] = useState<boolean>(isFavourite);
    const [isLoading, setLoading] = useState<boolean>(false);
    const dataId = profileId;

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = await RestService().favouriteProfile(dataId);
        setLoading(false);
        if (data?.status == 200) {
            const result: { current: boolean; count: number; } = data.body;
            setCount(result.count);
            setFavourite(result.current);
        }
    }

    return (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            {count}
            {isLoading
                ? <LoaderCircle className="animate-spin" />
                : <button type="button" onClick={(e) => handleClick(e)}><Star data-star className={`cursor-pointer ${hasFavourite ? "fill-yellow-300 stroke-yellow-500 hover:fill-yellow-100 hover:stroke-yellow-300" : "hover:fill-yellow-300 hover:stroke-yellow-500"}}`} /></button>
            }
        </div>
    );
}