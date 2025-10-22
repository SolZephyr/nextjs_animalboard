import ContentMain from "@/components/content-main";
import { ProfilesFilter } from "@/components/profiles-filter";
import ProfilesList, { ProfilesListLoading } from "@/components/profiles-list";
import { ProfileService } from "@/lib/service/profiles";
import { ProfileListParams, SearchParams } from "@/lib/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Pet Profiles",
    description: "Pet Project: Browse all animals.",
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const { page, animal, country, search } = await searchParams;

    const params: ProfileListParams = {
        page: page ? parseInt(page.toString()) : 1,
        animal: animal ? animal.toString() : undefined,
        country: country ? country.toString() : undefined,
        query: search ? search.toString() : undefined
    }
    const filterData = Promise.all([
        ProfileService().getAnimals(),
        ProfileService().getCountries()
    ]);
    return (
        <ContentMain>
            <div className="flex flex-row justify-between">
                <h2 className="text-xl">Profiles</h2>
                <Suspense>
                    <ProfilesFilter data={filterData} />
                </Suspense>
            </div>
            <section className="my-2">
                <Suspense fallback={<ProfilesListLoading />}>
                    <ProfilesList params={params} />
                </Suspense>
            </section>
        </ContentMain>
    );
}
