import { Agent, type AppBskyFeedDefs } from "@atproto/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ModalVideo from "~/components/modal-video";
import Post from "~/components/post";
import Skeleton from "~/components/skeleton";
import { authService } from "~/services/auth.service";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Clipdex" }];
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<AppBskyFeedDefs.PostView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      if (!isAuthenticated) {
        navigate("/login");
      }

      handleSearch();
    };

    checkAuth();
  }, [navigate]);

  const handleSearch = async () => {
    const publicAgent = new Agent({ service: "https://public.api.bsky.app" });

    const agent = new Agent({
      service: import.meta.env.VITE_USER_ENDPOINT,
    });

    try {
      setError(null);
      setLoading(true);
      setPosts([]);

      const client = await authService.getOAuthClient();

      if (client) {
        const res = await agent.com.atproto.repo.listRecords({
          repo: import.meta.env.VITE_USER_DID,
          collection: "app.bsky.feed.like",
          limit: 25,
        });

        const uris = res.data.records.map(
          (record) => (record.value as { subject: { uri: string } }).subject.uri
        );

        const postsRes = await publicAgent.app.bsky.feed.getPosts({ uris });
        setPosts(postsRes.data.posts || []);
        console.log("Profile fetched successfully:", postsRes.data);
      }
    } catch (error) {
      setError("Error al obtener los resultados. Inténtalo de nuevo.");
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsOpen(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      {/* <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      /> */}
      {error && <div className="text-red-600 text-center my-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.uri}
              post={post}
              isMuted={isMuted}
              toggleMute={toggleMute}
              onOpenModal={openModal}
            />
          ))
        ) : (
          <p className="text-center py-8 dark:text-gray-400">No posts found.</p>
        )}
      </div>

      <ModalVideo
        ref={dialogRef}
        open={isOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </>
  );
}
