"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 
        className={cn(
          "text-3xl font-bold text-gray-900 dark:text-white mb-8",
          isMounted 
            ? "animate-fadeInUp duration-500 ease-out" 
            : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: '100ms' }}
      >
        About Me
      </h1>
      
      <div className="prose dark:prose-invert">
        <p 
          className={cn(
            "text-lg text-gray-600 dark:text-gray-300 mb-6",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '200ms' }}
        >
          Hello! I'm a Level Designer passionate about creating immersive player experiences. 
          I specialize in crafting engaging gameplay spaces and environmental storytelling.
        </p>

        <h2 
          className={cn(
            "text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '300ms' }}
        >
          Skills
        </h2>
        <ul 
          className={cn(
            "list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <li>Level Design & Layout</li>
          <li>Unreal Engine 5 & Unity</li>
          <li>Visual Scripting (Blueprints)</li>
          <li>Environmental Storytelling</li>
          <li>Documentation & Greyboxing</li>
        </ul>

        <h2 
          className={cn(
            "text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '500ms' }}
        >
          Contact
        </h2>
        <p 
          className={cn(
            "text-gray-600 dark:text-gray-300",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '600ms' }}
        >
          Feel free to reach out to me at <a href="mailto:email@example.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">email@example.com</a>.
        </p>
        
        <div 
          className={cn(
            "mt-8",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '700ms' }}
        >
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition transform hover:scale-105">
                Download Resume
            </button>
        </div>
      </div>
    </div>
  );
}
