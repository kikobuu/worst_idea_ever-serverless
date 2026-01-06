"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A level design experiment focusing on verticality.",
      category: "Level Design",
    },
    {
      id: 2,
      title: "Project Beta",
      description: "An open-world exploration map with environmental storytelling.",
      category: "World Building",
    },
    // Add more placeholder projects
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 
        className={cn(
          "text-3xl font-bold text-gray-900 dark:text-white mb-8",
          isMounted 
            ? "animate-fadeInUp duration-500 ease-out" 
            : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: '100ms' }}
      >
        Projects
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={cn(
              "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 group",
              isMounted 
                ? "animate-fadeInUp duration-500 ease-out" 
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <div className="px-4 py-5 sm:p-6 transition-transform group-hover:scale-[1.02]">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                {project.category}
              </p>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
                <p>{project.description}</p>
              </div>
              <div className="mt-4">
                <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
