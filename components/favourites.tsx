"use client";

import { RestService } from "@/lib/service/rest";
import { Star } from "lucide-react";
import { MouseEvent, useState } from "react";

export default function ProfileFavourite({ profileId, favourites = 0, isFavourite = false }: { profileId: number, favourites?: number, isFavourite?: boolean }) {

    const [count, setCount] = useState<number>(favourites);
    const [hasFavourite, setFavourite] = useState<boolean>(isFavourite);
    const dataId = profileId;

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const data = await RestService().favouriteProfile(dataId);
        if (data?.status == 200) {
            const result: { success: boolean; count: number; } = data.body;
            setCount(result.count);
            setFavourite(result.success);
        }
    }

    return (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            {count}<button type="button" onClick={(e) => handleClick(e)}><Star data-star className={`cursor-pointer ${hasFavourite ? "fill-yellow-300 stroke-yellow-500 hover:fill-yellow-100 hover:stroke-yellow-300" : "hover:fill-yellow-300 hover:stroke-yellow-500"}}`} /></button>
        </div>
    );
}