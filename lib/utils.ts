import { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function loginUserState(user: User): UserState {
  const userdata: UserState = {
    clerkId: user.id,
    email: user?.emailAddresses[0].emailAddress,
    firstname: user.firstName ?? "",
    lastname: user.lastName ?? "",
    created: new Date(user.createdAt),
    updated: new Date(user.updatedAt)
  }
  return userdata;
}

export function writeTime(date: Date) {
  const now = new Date();
  const diff = ((now.getTime() / 1000) - (date.getTime() / 1000));
  if (diff < 10) {
    return "Just now";
  } else if (diff < 60) {
    return "Seconds ago";
  } else {
    return date.toLocaleString("se-SV", { year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute: '2-digit' });
  }
}