import { Agent, type AppBskyFeedDefs } from "@atproto/api";
import { useState } from "react";
import Post from "~/components/post";
import Search from "~/components/search";
import Skeleton from "~/components/skeleton";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Clipdex" }];
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<AppBskyFeedDefs.FeedViewPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    const agent = new Agent({ service: "https://public.api.bsky.app" });

    try {
      setError(null);
      setLoading(true);
      setPosts([]);
      const res = await agent.app.bsky.feed.getFeed({
        feed: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot",
        limit: 20,
      });
      setPosts(res.data.feed || []);
      console.log("Fetched posts:", res.data.feed);
    } catch (error) {
      setError("Error al obtener los resultados. Inténtalo de nuevo.");
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {error && <div className="text-red-600 text-center my-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
        ) : posts.length > 0 ? (
          posts.map((post) => <Post key={post.post.uri} post={post} />)
        ) : (
          <p className="text-center py-8 dark:text-gray-400">No posts found.</p>
        )}
      </div>
    </div>
  );
}
