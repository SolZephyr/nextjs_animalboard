"use client";

import { Separator } from "@radix-ui/react-separator";
import { MenuFooter, MenuNavigation } from "./menu-content";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export function SidebarDefault() {

    return (
        <aside className="grid-area-sidebar hidden sm:block min-h-(--sidebar-height) w-50 bg-gray-50">
            <section className="border border-red-500 sticky top-(--header-height) flex flex-col items-start justify-between min-h-(--sidebar-height)">
                <MenuNavigation />
                <MenuFooter className="w-full self-end px-4" />
            </section>
        </aside>
    );
}

export function SidebarMobile({ trigger }: { trigger?: React.ReactNode }) {
    return (
        <div className="block sm:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    {trigger
                        ? trigger
                        : <Button variant="outline">Menu</Button>
                    }
                </SheetTrigger>
                <SheetContent side="left" className="w-50 top-(--header-height) [&>button:first-of-type]:hidden">
                    <section className="border border-red-500 sticky flex flex-col items-start justify-between min-h-(--sidebar-height)">
                        <div className="w-full inline-block">
                            <SheetClose asChild className="p-2 cursor-pointer hover:text-white hover:bg-black">
                                <SheetTitle>Close menu</SheetTitle>
                            </SheetClose>
                            <Separator />
                            <MenuNavigation />
                        </div>
                        <MenuFooter className="w-full self-end px-4" />
                    </section>
                </SheetContent>
            </Sheet>
        </div>
    );
}