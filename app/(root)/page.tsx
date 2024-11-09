import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _id: 1,
      views: 55,
      description: "This is a description",
      category: "Robots",
      title: "We Robots",
      image:
        "https://res.cloudinary.com/dhfsofugy/image/upload/v1722230104/hero-slider-3_ijkyov.webp",
      author: {
        _id: 1,
        name: "John Smith",
      },
      createdAt: new Date(),
    },
  ];
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
          {posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard
                _id={post._id}
                views={post.views}
                author={post.author}
                description={post.description}
                category={post.category}
                title={post.title}
                image={post.image}
                createdAt={post.createdAt}
                key={post._id}
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
