import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

interface ViewProps {
  id: string;
}

const View = async ({ id }: ViewProps) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  return (
    <div className="view-container relative">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">
          {totalViews}: View{`${totalViews > 1 ? "s" : ""}`}
        </span>
      </p>
    </div>
  );
};

export default View;
