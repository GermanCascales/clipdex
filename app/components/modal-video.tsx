import type { AppBskyFeedDefs } from "@atproto/api";
import HlsVideoElement from "hls-video-element/react";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaPosterImage,
  MediaTimeRange,
} from "media-chrome/react";
import {
  MediaRenditionMenu,
  MediaRenditionMenuButton,
} from "media-chrome/react/menu";
import { forwardRef, useEffect, useRef, useState } from "react";

interface ModalVideoProps {
  open: boolean;
  onClose: () => void;
  post?: AppBskyFeedDefs.PostView;
}

const ModalVideo = forwardRef<HTMLDialogElement, ModalVideoProps>(
  ({ open, onClose, post }, ref) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<number | null>(
      null
    );

    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const saveBlobAsFile = (blob: Blob, filename: string) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    };

    const handleDownload = async () => {
      if (!post || !post.embed) return;
      setDownloading(true);
      setDownloadProgress(0);
      const url = `https://bsky.social/xrpc/com.atproto.sync.getBlob?did=${encodeURIComponent(
        post.author.did
      )}&cid=${encodeURIComponent(post.embed.cid)}`;
      const filename = `clipdex_${post.author.handle}-${post.indexedAt}.mp4`;
      try {
        const response = await fetch(url, { credentials: "omit" });
        if (!response.ok) throw new Error("No se pudo descargar el vídeo");

        const contentLength = response.headers.get("content-length");
        if (!contentLength) {
          // fallback: no progress possible
          const blob = await response.blob();
          saveBlobAsFile(blob, filename);
          setDownloadProgress(null);
          setDownloading(false);
          return;
        }

        const total = parseInt(contentLength, 10);
        let loaded = 0;
        const reader = response.body!.getReader();
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            loaded += value.length;
            setDownloadProgress(Math.round((loaded / total) * 100));
          }
        }
        const blob = new Blob(chunks);
        saveBlobAsFile(blob, filename);
      } catch (e) {
        alert("No se pudo descargar el vídeo.");
      } finally {
        setDownloadProgress(null);
        setDownloading(false);
      }
    };

    return (
      <dialog
        ref={ref}
        id="modal-video"
        className="inset-0 m-auto w-full max-w-4xl h-[70vh] max-h-[600px] rounded-lg shadow-xl overflow-hidden starting:open:opacity-0 starting:open:animate-fade-in starting:open:transition-opacity duration-300"
        open={open}
        onClick={handleClick}
      >
        <section ref={sectionRef} className="relative flex h-full w-full">
          {post && post.embed ? (
            <>
              <div className="w-2/3 bg-black flex flex-col relative">
                <MediaController className="w-full h-full">
                  <HlsVideoElement
                    src={
                      post.embed &&
                      "playlist" in post.embed &&
                      typeof post.embed.playlist === "string"
                        ? post.embed.playlist
                        : ""
                    }
                    slot="media"
                    crossOrigin="true"
                    preload="auto"
                    autoplay={true}
                  ></HlsVideoElement>
                  <MediaPosterImage
                    slot="poster"
                    src={
                      post.embed &&
                      "thumbnail" in post.embed &&
                      typeof post.embed.thumbnail === "string"
                        ? post.embed.thumbnail
                        : ""
                    }
                  ></MediaPosterImage>
                  <MediaRenditionMenu
                    className="text-zinc-50 bg-gray-950/25 backdrop-blur-md rounded-lg"
                    hidden={true}
                    anchor="auto"
                  ></MediaRenditionMenu>

                  <MediaControlBar className="px-4 py-2 relative gap-x-3">
                    <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-linear-to-t from-black/70 to-transparent" />
                    <MediaPlayButton></MediaPlayButton>
                    <MediaMuteButton></MediaMuteButton>
                    <MediaTimeRange></MediaTimeRange>
                    <MediaRenditionMenuButton></MediaRenditionMenuButton>
                    <MediaFullscreenButton></MediaFullscreenButton>
                  </MediaControlBar>
                </MediaController>
              </div>
              <div className="w-1/3 bg-white p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <img
                        alt="User avatar"
                        className="w-10 h-10 rounded-full mr-3"
                        src={post.author.avatar}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {post.author.displayName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {post.author.handle}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {"text" in post.record
                      ? (post.record as { text: string }).text
                      : ""}
                  </p>
                  <p className="text-gray-400 text-xs mb-6">
                    {new Date(post.indexedAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm space-x-6 mb-6">
                    <div className="flex items-center">
                      <span className="material-icons text-base mr-1">
                        favorite_border
                      </span>
                      {post.likeCount}
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-base mr-1">
                        repeat
                      </span>
                      {post.repostCount}
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex">
                  <a
                    href={`https://bsky.app/profile/${
                      post.author.handle
                    }/post/${post.uri.split("/").pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 text-xs font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span className="material-icons text-base">
                      open_in_new
                    </span>
                    Ver en Bluesky
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!downloading) handleDownload();
                    }}
                    className={`inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 text-xs font-medium text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 ${
                      downloading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    style={{ pointerEvents: downloading ? "none" : "auto" }}
                    aria-disabled={downloading}
                  >
                    {downloading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        {downloadProgress !== null
                          ? `${downloadProgress}%`
                          : "Cargando..."}
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-base">
                          download
                        </span>
                        Descargar vídeo
                      </>
                    )}
                  </a>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-4 text-gray-400">No post selected.</p>
          )}
          <button
            onClick={onClose}
            className="absolute right-0 cursor-pointer mb-auto p-2 text-black"
          >
            <span className="material-icons">close</span>
          </button>
        </section>
      </dialog>
    );
  }
);

export default ModalVideo;
