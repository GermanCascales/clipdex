import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaMuteButton,
  MediaPosterImage,
} from "media-chrome/react";

export default function Post({
  post,
  isMuted,
  toggleMute,
}: {
  post: any;
  isMuted: boolean;
  toggleMute: () => void;
}) {
  return (
    <div
      className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      key={post.uri}
    >
      <div className="relative group">
        <MediaController className="w-full h-56">
          <hls-video
            src={post.embed.playlist}
            slot="media"
            crossOrigin
            preload="none"
            muted={isMuted}
          ></hls-video>
          <MediaPosterImage
            slot="poster"
            src={post.embed.thumbnail}
          ></MediaPosterImage>
          <MediaControlBar className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <MediaPlayButton></MediaPlayButton>
            <MediaMuteButton onClick={toggleMute}></MediaMuteButton>
          </MediaControlBar>
        </MediaController>
        <div className="absolute cursor-pointer select-none top-2 right-2 bg-black bg-opacity-40 size-8 p-1 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="material-icons text-white text-lg">
            favorite_border
          </span>
        </div>
      </div>
    </div>
  );
}
