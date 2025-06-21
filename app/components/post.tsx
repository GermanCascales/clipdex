import HlsVideoElement from "hls-video-element/react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaPosterImage,
} from "media-chrome/react";

export default function Post({
  post,
  isMuted,
  toggleMute,
  onOpenModal,
}: {
  post: any;
  isMuted: boolean;
  toggleMute: () => void;
  onOpenModal?: (post: any) => void;
}) {
  return (
    <div
      className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      key={post.uri}
    >
      <div className="relative group">
        <MediaController className="w-full h-56">
          <HlsVideoElement
            src={post.embed.playlist}
            slot="media"
            crossOrigin="true"
            preload="none"
            muted={isMuted}
          ></HlsVideoElement>
          <MediaPosterImage
            slot="poster"
            src={post.embed.thumbnail}
          ></MediaPosterImage>
          <MediaControlBar className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <MediaPlayButton></MediaPlayButton>
            <MediaMuteButton onClick={toggleMute}></MediaMuteButton>
          </MediaControlBar>
        </MediaController>
        <div
          className="absolute cursor-pointer select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal && onOpenModal(post);
          }}
        >
          <span className="material-icons text-white text-3xl drop-shadow-lg bg-black bg-opacity-40 rounded-full p-2">
            open_in_new
          </span>
        </div>
        <div className="absolute cursor-pointer select-none top-2 right-2 bg-black bg-opacity-40 size-8 p-1 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="material-icons text-white text-lg">
            favorite_border
          </span>
        </div>
      </div>
    </div>
  );
}
