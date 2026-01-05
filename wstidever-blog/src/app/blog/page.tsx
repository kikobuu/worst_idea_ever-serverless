export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Thoughts on Pacing in FPS Levels",
      date: "2023-10-01",
      excerpt: "Analyzing how enemy placement affects player flow and tension.",
    },
    {
      id: 2,
      title: "Learning Unreal Engine 5: First Impressions",
      date: "2023-11-15",
      excerpt: "My journey transitioning from Unity to Unreal Engine 5 for level design.",
    },
    // Add more placeholder posts
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{post.date}</p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              <a href="#" className="hover:underline">{post.title}</a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
