"use client";

import Link from "next/link";
import { useStats } from "@/hooks/useStats";

export default function Home() {
  // Load stats for all modes
  const statsParticipe = useStats("participe");
  const statsPasseCompose = useStats("passe-compose");
  const statsImparfait = useStats("imparfait");
  const statsFuturSimple = useStats("futur-simple");

  const studyModes = [
    {
      title: "Participe",
      description: "Master the past and present participles in French.",
      href: "/participe",
      color: "bg-blue-500",
      stats: statsParticipe,
    },
    {
      title: "Passé Composé",
      description: "Practice the most common past tense in French.",
      href: "/passe-compose",
      color: "bg-indigo-500",
      stats: statsPasseCompose,
    },
    {
      title: "Imparfait",
      description: "Learn the imperfect tense for descriptions and habits.",
      href: "/imparfait",
      color: "bg-emerald-500",
      stats: statsImparfait,
    },
    {
      title: "Futur Simple",
      description: "Practice the future tense for plans and predictions.",
      href: "/futur-simple",
      color: "bg-orange-500",
      stats: statsFuturSimple,
    },
    {
      title: "Vocabulaire",
      description: "Learn essential French connectors and phrases.",
      href: "/vocabulaire",
      color: "bg-rose-500",
      stats: null, // Vocabulaire doesn't have stats yet
    },
  ];

  // Calculate Overall average
  const modesWithStats = [statsParticipe, statsPasseCompose, statsImparfait, statsFuturSimple]
    .filter(s => s.successRate !== null);
  
  const overallAccuracy = modesWithStats.length > 0
    ? Math.round(modesWithStats.reduce((acc, curr) => acc + (curr.successRate || 0), 0) / modesWithStats.length)
    : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Apprendre le Français
        </h1>
        
        {overallAccuracy !== null ? (
          <div className="mb-12 inline-flex items-center rounded-full bg-white px-4 py-1.5 shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
            <span className="text-sm font-medium text-gray-600 dark:text-zinc-400 mr-2 text-center">Overall Accuracy:</span>
            <span className={`text-sm font-bold ${overallAccuracy >= 80 ? 'text-green-500' : overallAccuracy >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
              {overallAccuracy}%
            </span>
          </div>
        ) : (
          <p className="mb-12 text-lg text-gray-600 dark:text-zinc-400">
            Choose a study mode to begin your French learning journey.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {studyModes.map((mode) => (
            <Link
              key={mode.href}
              href={mode.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900"
            >
              <div
                className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-5 ${mode.color}`}
              />
              <div className="flex flex-col items-center text-center h-full">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${mode.color}`}
                >
                  <span className="text-xl font-bold">
                    {mode.title.charAt(0)}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {mode.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-zinc-400 flex-grow">
                  {mode.description}
                </p>
                
                {mode.stats?.successRate !== null && mode.stats?.successRate !== undefined ? (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      <span>Accuracy</span>
                      <span>{mode.stats.successRate}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-zinc-800">
                      <div 
                        className={`h-full transition-all duration-1000 ${mode.color}`} 
                        style={{ width: `${mode.stats.successRate}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex items-center font-semibold text-sm text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                    Start Learning →
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
