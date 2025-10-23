import ContentMain from "@/components/content-main";
import PostsFeed from "@/components/posts-feed";
import PostsFilter from "@/components/posts-filter";
import { PostListParams, SearchParams } from "@/lib/types";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { page, sort, filter, search } = await searchParams;

  const params: PostListParams = {
    page: page ? parseInt(page.toString()) : 1,
    sort: sort ? sort.toString() : undefined,
    filter: filter ? filter.toString() : undefined,
    query: search ? search.toString() : undefined
  }
  return (
    <ContentMain>
      <h2 className="sr-only">Posts</h2>
      <Suspense>
        <PostsFilter />
      </Suspense>
      <PostsFeed params={params} />
    </ContentMain>
  );
}
