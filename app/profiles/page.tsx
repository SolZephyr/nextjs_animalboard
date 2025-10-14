import ContentProfiles from "@/components/content-profiles";
import { ProfileListParams, SearchParams } from "@/lib/types";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const { page, sort } = await searchParams;

    const params: ProfileListParams = {
        page: page ? parseInt(page.toString()) : 1,
        sort: sort ? sort.toString() : undefined,
    }
    return (
        <ContentProfiles params={params} />
    );
}
