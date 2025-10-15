import { ProfileListParams } from "@/lib/types";
import Sidebar from "./sidebar";
import { ProfileService } from "@/lib/service/profiles";
import { Suspense } from "react";
import ProfilesList from "./profiles-list";
import { ProfilesFilter } from "./profiles-filter";

export default function ContentProfiles({ params }: { params: ProfileListParams }) {

    const data = ProfileService().getProfiles(params);
    const filterData = Promise.all([
        ProfileService().getAnimals(),
        ProfileService().getCountries()
    ]);

    return (
        <div className="grid grid-content-home">
            <main className="grid-area-content grid grid-cols-1 content-start ml-2 my-2">
                <h2>Profiles</h2>
                <ProfilesFilter data={filterData} />
                <Suspense fallback={<p>Loading...</p>}>
                    <ProfilesList data={data} />
                </Suspense>
            </main>
            <Sidebar />
        </div>
    );
}