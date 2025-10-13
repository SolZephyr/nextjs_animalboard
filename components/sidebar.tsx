import { ScrollArea } from "@radix-ui/react-scroll-area"
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Heart } from "lucide-react";

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
            <section className="border border-red-500 max-h-(--sidebar-height) bg-white sticky top-(--header-height)">
                <ScrollArea>
                    <nav className="my-4">
                        <ul>
                            {navLinks.map((nav, index) => (
                                <li key={index}>
                                    <Link href={nav.url} className="w-full inline-block hover:bg-black hover:text-white p-2">{nav.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Separator />
                </ScrollArea>
            </section>
        </aside>
    );
}