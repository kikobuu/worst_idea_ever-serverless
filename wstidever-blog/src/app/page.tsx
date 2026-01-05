import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to My Level Design Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Showcasing my journey in creating immersive worlds and engaging gameplay experiences. 
            Explore my projects, read my thoughts on design, and get to know me.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Projects
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              About Me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
