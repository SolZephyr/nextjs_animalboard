"use client";

import { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import { Heart, LoaderCircle } from "lucide-react";
import { RestService } from "@/lib/service/rest";

export default function PostLikes({ postId, likes = 0, isLiked = false }: { postId: number, likes?: number, isLiked?: boolean }) {

    const [count, setCount] = useState<number>(likes);
    const [hasLike, setLike] = useState<boolean>(isLiked);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = await RestService().likePost(postId);
        setLoading(false);
        if (data?.status == 200) {
            const result: { current: boolean; count: number; } = data.body;
            setCount(result.count);
            setLike(result.current);
        }
    }

    return (
        <>
            {isLoading
                ? <Button className="py-6 sm:py-4"><span className="sr-only">Processing like</span><LoaderCircle className="animate-spin" />&nbsp;{count}</Button>
                : <Button className="py-6 sm:py-4 cursor-pointer bg-primary hover:bg-primary/80" onClick={(e) => handleClick(e)}>
                    <span className="sr-only">Like post</span><Heart className={`${hasLike ? "fill-like-full stroke-like-border" : "hover:fill-like-full hover:stroke-like-border"}`} />&nbsp;{count}
                </Button>
            }
        </>
    );
}