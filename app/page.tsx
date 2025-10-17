import ContentHome from "@/components/content-home";
import { PostListParams, SearchParams } from "@/lib/types";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { page, sort, filter, search } = await searchParams;

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
