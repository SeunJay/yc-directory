import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!startup) return notFound();

  const parsedContent = md.render(startup?.pitch || "");

  return (
    <>
      <section className="pink_container !py-20 !min-h-[230px]">
        <p className="tag">{formatDate(startup?._createdAt)}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
          width={100}
          height={100}
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author.avatar}
                width={64}
                height={64}
                alt="avatar"
                className="rounded-full drop-shadow-lg"
              />

              <div className="">
                <p className="text-20-medium">{startup.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{startup.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-4-xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />
        {/* Todo: Show selected startups */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
