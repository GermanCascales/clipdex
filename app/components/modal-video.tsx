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
import { forwardRef, useEffect, useRef } from "react";

interface ModalVideoProps {
  open: boolean;
  onClose: () => void;
  post?: AppBskyFeedDefs.PostView;
}

const ModalVideo = forwardRef<HTMLDialogElement, ModalVideoProps>(
  ({ open, onClose, post }, ref) => {
    const sectionRef = useRef<HTMLElement>(null);

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

    return (
      <dialog
        ref={ref}
        id="modal-video"
        className={`inset-0 m-auto w-full max-w-4xl h-[70vh] max-h-[600px] rounded-lg shadow-xl flex overflow-hidden ${
          !open ? "hidden" : ""
        }`}
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
                    {new Date(post.indexedAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
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
                <div className="mt-auto">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <input
                      className="text-xs text-gray-700 flex-grow focus:outline-none"
                      readOnly={true}
                      type="text"
                      value={post.uri}
                    />
                    <button
                      className="pl-2 text-xs text-gray-500 hover:text-gray-700"
                      title="Copiar enlace"
                    >
                      <span className="material-icons">link</span>
                    </button>
                  </div>
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
