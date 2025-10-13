import { ScrollArea } from "@radix-ui/react-scroll-area"
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export default function Sidebar() {

    const navLinks = [
        {
            url: "/", label: "Home"
        },
        {
            url: "/profiles", label: "Profiles"
        },
        {
            url: "/about", label: "About"
        }
    ];

    return (
        <aside className="grid-area-sidebar hidden md:block max-h-full w-50">
            <section className="min-h-(sidebar-height) border border-red-500 max-h-(--sidebar-height) bg-white sticky top-(--header-height)">
                <ScrollArea>
                    <Separator />
                    <nav>
                        <ul>
                            {navLinks.map((nav, index) => (
                                <li key={index}>
                                    <Link href={nav.url} className="w-full inline-block hover:bg-black hover:text-white p-2">{nav.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Separator />
                    <Collapsible className="flex flex-col gap-2 justify-start items-start">
                        <CollapsibleTrigger className="w-full text-left inline-block hover:bg-black hover:text-white p-2">Explore</CollapsibleTrigger>
                        <CollapsibleContent className="w-full">
                            <ul>
                                <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                                <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                                <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                            </ul>
                        </CollapsibleContent>
                    </Collapsible>
                </ScrollArea>
            </section>
        </aside>
    );
}