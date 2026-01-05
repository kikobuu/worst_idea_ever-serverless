export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About Me</h1>
      
      <div className="prose dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Hello! I'm a Level Designer passionate about creating immersive player experiences. 
          I specialize in crafting engaging gameplay spaces and environmental storytelling.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Skills</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Level Design & Layout</li>
          <li>Unreal Engine 5 & Unity</li>
          <li>Visual Scripting (Blueprints)</li>
          <li>Environmental Storytelling</li>
          <li>Documentation & Greyboxing</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Feel free to reach out to me at <a href="mailto:email@example.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">email@example.com</a>.
        </p>
        
        <div className="mt-8">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Download Resume
            </button>
        </div>
      </div>
    </div>
  );
}
