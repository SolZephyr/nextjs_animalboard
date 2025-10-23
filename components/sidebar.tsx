"use client";

import { MenuFooter, MenuNavigation } from "./menu-content";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function SidebarDefault() {

    return (
        <aside className="grid-area-sidebar hidden md:block min-h-(--sidebar-height) w-50 bg-gray-50">
            <section className="border border-red-500 sticky top-(--header-height) flex flex-col items-start justify-between min-h-(--sidebar-height)">
                <MenuNavigation />
                <MenuFooter className="w-full self-end px-4" />
            </section>
        </aside>
    );
}

export function SidebarMobile({ trigger }: { trigger?: React.ReactNode }) {
    return (
        <div className="block md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    {trigger
                        ? trigger
                        : <Button variant="outline">Menu</Button>
                    }
                </SheetTrigger>
                <SheetContent side="left" className="w-50 top-(--header-height)">
                    <section className="border border-red-500 sticky flex flex-col items-start justify-between min-h-(--sidebar-height)">
                        <div className="w-full inline-block">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <MenuNavigation />
                        </div>
                        <MenuFooter className="w-full self-end px-4" />
                    </section>
                </SheetContent>
            </Sheet>
        </div>
    );
}