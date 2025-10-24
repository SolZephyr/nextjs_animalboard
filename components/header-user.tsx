"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

export default function HeaderUser() {
    return (
        <div className="grid grid-col-1 ml-4">
            <SignedOut>
                <SignInButton>
                    <button className="flex flex-row justify-center items-center cursor-pointer hover:underline hover:decoration-solid" title="Login">
                        <UserRound className="w-10 h-10 bg-white text-muted-foreground border-3 border-muted-foreground rounded-full hover:bg-black hover:text-white hover:border-black" />
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton fallback={<UserRound className="w-10 h-10 bg-white text-muted-foreground border-3 border-muted-foreground rounded-full hover:bg-black hover:text-white hover:border-black" />}/>
            </SignedIn>
        </div>
    );
}