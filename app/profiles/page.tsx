import ContentProfiles from "@/components/content-profiles";
import { ProfileListParams, SearchParams } from "@/lib/types";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const { page, animal, country } = await searchParams;

    const params: ProfileListParams = {
        page: page ? parseInt(page.toString()) : 1,
        animal: animal ? animal.toString() : undefined,
        country: country ? country.toString() : undefined,
    }
    return (
        <ContentProfiles params={params} />
    );
}
