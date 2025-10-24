"use client";

import { RestService } from "@/lib/service/rest";
import { LoaderCircle, Star } from "lucide-react";
import { MouseEvent, useState } from "react";

export default function ProfileFavs({ profileId, favourites = 0, isFavourite = false }: { profileId: number, favourites?: number, isFavourite?: boolean }) {

    const [count, setCount] = useState<number>(favourites);
    const [hasFavourite, setFavourite] = useState<boolean>(isFavourite);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = await RestService().favouriteProfile(profileId);
        setLoading(false);
        if (data?.status == 200) {
            const result: { current: boolean; count: number; } = data.body;
            setCount(result.count);
            setFavourite(result.current);
        }
    }

    return (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="text-lg sm:text-base">{count}</span>
            {isLoading
                ? <LoaderCircle className="animate-spin size-8 md:size-6" />
                : <button type="button" onClick={(e) => handleClick(e)}><span className="sr-only">Favourite profile</span><Star className={`size-8 md:size-6 cursor-pointer ${hasFavourite ? "fill-fav-full stroke-fav-border hover:fill-none" : "stroke-fav-border"} hover:fill-fav-full hover:stroke-fav-border`} /></button>
            }
        </div>
    );
}