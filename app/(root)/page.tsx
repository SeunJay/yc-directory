import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await auth();

  const query = (await searchParams).query;

  const params = { search: query || null };

  const { data: startups } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Votes on Pitches, and Get Noticed in Virtual
          Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {startups.length > 0 ? (
            // @ts-expect-error: WIP
            startups.map((post) => (
              <StartupCard
                _id={post._id}
                views={post.views}
                author={post.author}
                description={post.description}
                category={post.category}
                title={post.title}
                image={post.image}
                createdAt={post._createdAt}
                key={post._id}
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

        <SanityLive />
      </section>
    </>
  );
}
