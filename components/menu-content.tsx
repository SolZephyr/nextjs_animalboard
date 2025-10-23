"use client";

import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/socials/facebook.svg";
import instagram from "@/public/socials/instagram.svg";
import twitter from "@/public/socials/twitter.svg";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function MenuNavigation() {
    const pathname = usePathname();

    type NavItem = { url: string, label: string, paths: string[] };

    const navLinks: NavItem[] = [
        {
            url: "/", label: "Home", paths: ["/", "/posts"]
        },
        {
            url: "/profiles", label: "Profiles", paths: ["/profiles"]
        },
        {
            url: "/about", label: "About", paths: ["/about"]
        }
    ];

    function NavLink({ item }: { item: NavItem }) {
        const path = pathname.split("/")[1] ?? "";
        const current = item.paths.includes(`/${path}`);
        return (
            <Link href={item.url} className={`w-full inline-block p-2 ${current ? `bg-gray-300 hover:text-white` : ``} hover:text-white hover:bg-black`}>{item.label}</Link>
        );
    }

    return (
        <ScrollArea className="w-full">
            <nav>
                <ul>
                    {navLinks.map((nav, index) => (
                        <li key={index}>
                            <NavLink item={nav} />
                        </li>
                    ))}
                </ul>
            </nav>
            <Separator />
            <Collapsible className="flex flex-col gap-2 justify-start items-start">
                <CollapsibleTrigger className="w-full text-left inline-block hover:bg-black hover:text-white p-2 cursor-pointer">Explore</CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                    <ul>
                        <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                        <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                        <li><Link href="" className="w-full inline-block hover:bg-black hover:text-white p-2">Tag</Link></li>
                    </ul>
                </CollapsibleContent>
            </Collapsible>
        </ScrollArea>
    );
}

export function MenuFooter({ className }: { className: string }) {
    return (
        <footer className={className}>
            <ul className="flex flex-row justify-evenly gap-4">
                <li><Image src={facebook} alt={"Facebook icon"} width={32} height={32} className="cursor-pointer" /></li>
                <li><Image src={instagram} alt={"Instagram icon"} width={32} height={32} className="cursor-pointer" /></li>
                <li><Image src={twitter} alt={"Twitter icon"} width={32} height={32} className="cursor-pointer" /></li>
            </ul>
            <p className="font-bold text-center py-2">© 2025 Pet Project</p>
        </footer>
    );
}