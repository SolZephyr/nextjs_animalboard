import { ProfileListParams } from "@/lib/types";
import Sidebar from "./sidebar";
import { ProfileService } from "@/lib/service/profiles";
import { Suspense } from "react";
import ProfilesList from "./profiles-list";

export default function ContentProfiles({ params }: { params: ProfileListParams }) {

    const data = ProfileService().getProfiles(params);

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2">
                <h2>Profiles</h2>
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfilesList data={data} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}