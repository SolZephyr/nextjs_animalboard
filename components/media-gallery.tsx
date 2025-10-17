import { Media } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from "next/image";

export default function MediaGallery({ images }: { images: Media[] | undefined}) {
    if (!images || images.length <= 0) {
        return (<></>);
    }
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true
            }}
            className="w-[96%]">
            <CarouselContent>
                {images.map((media, index) => (
                    <CarouselItem key={index} className="basis-initial">
                        <Image src={media.source} width={150} height={150} className="w-full h-auto" alt="image" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 ?
                <>
                    <CarouselPrevious className="-left-4 cursor-pointer" />
                    <CarouselNext className="-right-4 cursor-pointer" />
                </> : ""
            }
        </Carousel>
    );
}