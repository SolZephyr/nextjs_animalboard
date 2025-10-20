import Sidebar from "./sidebar";
import { ProfileService } from "@/lib/service/profiles";
import { Suspense } from "react";
import ProfileContent, { ProfileContentSkeleton } from "./profile-content";
import { PostListParams } from "@/lib/types";

export default function ContentProfile({ profileId, postParams }: { profileId: number, postParams: PostListParams }) {

    const data = ProfileService().getProfile(profileId);

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <Suspense fallback={<ProfileContentSkeleton />}>
                    <ProfileContent data={data} postParams={postParams} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}