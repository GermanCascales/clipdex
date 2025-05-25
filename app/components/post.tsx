export default function Post({ post }: { post: any }) {
  return (
    <div
      key={post.post.uri}
      className="w-full p-4 mb-4 bg-white rounded shadow"
    >
      <h2 className="text-lg font-bold">{post.post.record.text as string}</h2>
      <p className="text-sm text-gray-600">Posted by {post.post.author.did}</p>
    </div>
  );
}
