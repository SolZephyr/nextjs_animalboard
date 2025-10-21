import Sidebar from "./sidebar";
import { Suspense } from "react";
import ProfileContent, { ProfileContentSkeleton } from "./profile-content";
import { PostListParams } from "@/lib/types";

export default function ContentProfile({ profileId, postParams }: { profileId: number, postParams: PostListParams }) {
    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <Suspense fallback={<ProfileContentSkeleton />}>
                    <ProfileContent profileId={profileId} postParams={postParams} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}