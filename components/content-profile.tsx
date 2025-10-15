import Sidebar from "./sidebar";
import { ProfileService } from "@/lib/service/profiles";
import { Suspense } from "react";
import ProfileContent from "./profile-content";

export default function ContentProfile({ profileId }: { profileId: number }) {

    const data = ProfileService().getProfile(profileId);

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfileContent data={data} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}