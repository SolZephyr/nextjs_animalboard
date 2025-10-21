import ContentHome from "@/components/content-home";
import { ProfileService } from "@/lib/service/profiles";
import { PostListParams, SearchParams } from "@/lib/types";
import { loginUserState } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { page, sort, filter, search } = await searchParams;
  const user = await currentUser();
  const loginId = user ? await ProfileService().handleLoginUser(loginUserState(user)) : undefined;

  const params: PostListParams = {
    page: page ? parseInt(page.toString()) : 1,
    sort: sort ? sort.toString() : undefined,
    filter: filter ? filter.toString() : undefined,
    query: search ? search.toString() : undefined
  }
  return (
    <ContentHome params={params} />
  );
}
