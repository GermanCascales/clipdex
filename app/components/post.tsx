export default function Post({ post }: { post: any }) {
  return (
    <div
      className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      key={post.uri}
    >
      <div className="relative">
        {post.embed.thumbnail && (
          <img
            alt="Video thumbnail"
            className="w-full h-56 object-cover"
            src={post.embed.thumbnail}
          />
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-40 p-1 rounded-full">
          <span className="material-icons text-white text-lg">
            favorite_border
          </span>
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs text-white">
          <span className="material-icons text-sm align-middle">volume_up</span>
        </div>
      </div>
    </div>
  );
}
