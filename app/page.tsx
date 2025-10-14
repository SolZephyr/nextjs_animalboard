import ContentHome from "@/components/content-home";
import { PostListParams, SearchParams } from "@/lib/types";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { page, sort, filter } = await searchParams;

  const params: PostListParams = {
    page: page ? parseInt(page.toString()) : 1,
    sort: sort ? sort.toString() : undefined,
    filter: filter ? filter.toString() : undefined
  }
  return (
    <ContentHome params={params} />
  );
}
