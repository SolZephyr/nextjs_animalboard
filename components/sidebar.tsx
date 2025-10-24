"use client";

import { Separator } from "@radix-ui/react-separator";
import { MenuFooter, MenuNavigation } from "./menu-content";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export function SidebarDefault() {

    return (
        <aside className="grid-area-sidebar hidden sm:block min-h-(--sidebar-height) w-50 bg-sidebar border text-sidebar-foreground border-sidebar-border">
            <section className="flex flex-col items-start justify-between sticky min-h-(--sidebar-height) top-(--header-height)">
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
                <SheetContent side="left" className="w-50 top-(--header-height) [&>button:first-of-type]:hidden bg-sidebar border text-sidebar-foreground border-sidebar-border">
                    <section className="flex flex-col items-start justify-between min-h-(--sidebar-height) sticky">
                        <div className="w-full inline-block">
                            <SheetClose asChild className="p-4 font-medium cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                <SheetTitle>CLOSE MENU</SheetTitle>
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