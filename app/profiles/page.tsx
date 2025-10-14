import { SearchParams } from "@/lib/types";

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
    const { page, sort, filter } = await searchParams;

    return (
        <h2>Profiles</h2>
    );
}
