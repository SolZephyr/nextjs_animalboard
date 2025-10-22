"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

export default function HeaderUser() {
    return (
        <div className="grid grid-col-1 ml-4">
            <SignedOut>
                <SignInButton>
                    <button className="flex flex-row justify-center items-center cursor-pointer hover:underline hover:decoration-solid" title="Login">
                        <UserRound className="w-10 h-10 text-white bg-gray-300 rounded-full hover:bg-gray-500" />
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton fallback={<UserRound className="w-10 h-10 text-white bg-gray-300 rounded-full hover:bg-gray-500" />}/>
            </SignedIn>
        </div>
    );
}