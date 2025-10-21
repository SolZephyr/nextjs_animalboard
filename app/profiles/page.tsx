import ContentProfiles from "@/components/content-profiles";
import { ProfileService } from "@/lib/service/profiles";
import { ProfileListParams, SearchParams } from "@/lib/types";
import { loginUserState } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const { page, animal, country, search } = await searchParams;
    const login = await currentUser();
    const userId = login ? await ProfileService().handleLoginUser(loginUserState(login)) : undefined;

    const params: ProfileListParams = {
        page: page ? parseInt(page.toString()) : 1,
        animal: animal ? animal.toString() : undefined,
        country: country ? country.toString() : undefined,
        query: search ? search.toString() : undefined,
        userId: userId ?? undefined
    }
    return (
        <ContentProfiles params={params} />
    );
}
