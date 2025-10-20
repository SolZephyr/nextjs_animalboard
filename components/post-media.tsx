"use client";

import { RestService } from "@/lib/service/rest";
import { Media, ResponseRest } from "@/lib/types";
import { useEffect, useState } from "react";
import Gallery from "./media-gallery";

export default function PostGallery({ postId }: { postId: number | undefined }) {


    const [media, setMedia] = useState<Media[] | null>(null);

    useEffect(() => {
        if (postId && media === null) {
            const result = RestService().getMediaByPost(postId);
            if (result) {
                onMedia(result);
            }
        }
    });

    async function onMedia(data: ResponseRest) {
        const result = await data;
        const body = result.body;
        if (body?.media) {
            setMedia(body.media);
        }
    }

    return (
        <>
            {media ? <Gallery images={media} /> : ""}
        </>
    );
}