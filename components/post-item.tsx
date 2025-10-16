import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "./ui/item";
import { Post } from "@/lib/types";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { Heart, MessageSquareText } from "lucide-react";
import { writeTime } from "@/lib/utils";

export default function PostItem({ post }: { post: Post }) {
    const profileName = post.profile?.name ?? "[Profile]";
    const userName = post.profile?.user ?? "[User]";
    const avatarSrc = post.profile?.avatar?.source ?? "";
    const images = post.images ? post.images : undefined;
    return (
        <article className="flex w-full flex-col gap-6">
            <Item variant="outline" className="p-4">
                <ItemHeader>
                    <ItemMedia>
                        <Avatar className="size-10">
                            <AvatarImage src={avatarSrc} className="rounded-full" />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>{profileName}</ItemTitle>
                    </ItemContent>
                    <ItemContent className="flex-none text-right">
                        <ItemDescription>Poster: {userName}</ItemDescription>
                        <ItemDescription>{writeTime(post.created)}</ItemDescription>
                    </ItemContent>
                </ItemHeader>
                <ItemContent>
                    <ItemTitle className="text-xl">{post.title}</ItemTitle>
                    <ItemDescription>{post.content}</ItemDescription>
                    {images ?
                        <ItemMedia className="flex flex-row justify-center w-full">
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
                                        <CarouselPrevious className="-left-4" />
                                        <CarouselNext className="-right-4" />
                                    </> : ""
                                }
                            </Carousel>
                        </ItemMedia> : ""
                    }
                </ItemContent>
                <ItemFooter>
                    <ItemActions>
                        <Button><Heart />&nbsp;0</Button>
                        <Button><MessageSquareText />&nbsp;0</Button>
                    </ItemActions>
                </ItemFooter>
            </Item>
        </article>
    )
}