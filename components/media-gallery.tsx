"use client";
import { useEffect, useState, useMemo, MouseEvent } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
    CarouselPrevious,
    CarouselNext,
} from "./ui/carousel";
import Image from "next/image";
import { Media } from "@/lib/types";

// https://www.reddit.com/r/nextjs/comments/1cgktu9/shadcnui_image_carousel_with_thumbnail_images/
export default function MediaGallery({ images }: { images: Media[] }) {
    const [mainApi, setMainApi] = useState<CarouselApi>();
    const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const mainImage = useMemo(
        () =>
            images.map((image, index) => (
                <CarouselItem key={index} className="relative aspect-square w-full">
                    <Image
                        src={image.source}
                        alt={`Carousel Main Image ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </CarouselItem>
            )),
        [images],
    );

    const thumbnailImages = useMemo(
        () =>
            images.map((image, index) => (
                <CarouselItem
                    key={index}
                    className="relative aspect-square w-full basis-1/4"
                    onClick={() => handleClick(index)}
                >
                    <Image
                        className={`${index === current ? "border-2 border-gray-400" : ""}`}
                        src={image.source}
                        fill
                        alt={`Carousel Thumbnail Image ${index + 1}`}
                        style={{ objectFit: "cover" }}
                    />
                </CarouselItem>
            )),
        [images, current],
    );

    useEffect(() => {
        if (!mainApi || !thumbnailApi) {
            return;
        }

        const handleTopSelect = () => {
            const selected = mainApi.selectedScrollSnap();
            setCurrent(selected);
            thumbnailApi.scrollTo(selected);
        };

        const handleBottomSelect = () => {
            const selected = thumbnailApi.selectedScrollSnap();
            setCurrent(selected);
            mainApi.scrollTo(selected);
        };

        mainApi.on("select", handleTopSelect);
        thumbnailApi.on("select", handleBottomSelect);

        return () => {
            mainApi.off("select", handleTopSelect);
            thumbnailApi.off("select", handleBottomSelect);
        };
    }, [mainApi, thumbnailApi]);

    const handleClick = (index: number) => {
        if (!mainApi || !thumbnailApi) {
            return;
        }
        thumbnailApi.scrollTo(index);
        mainApi.scrollTo(index);
        setCurrent(index);
    };

    return (
        <div className="w-full">
            <Carousel setApi={setMainApi}
                opts={{
                    align: "start",
                    loop: true
                }}>
                <CarouselContent className="m-1">{mainImage}</CarouselContent>
                {images.length > 1 ?
                    <>
                        <CarouselPrevious className="-left-4 cursor-pointer" />
                        <CarouselNext className="-right-4 cursor-pointer" />
                    </> : ""
                }
            </Carousel>
            {images.length > 1 ?
                <Carousel setApi={setThumbnailApi}>
                    <CarouselContent className="m-1">{thumbnailImages}</CarouselContent>
                </Carousel> : ""
            }
        </div>
    );
};