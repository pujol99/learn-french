import Link from "next/link";

export default function Home() {
    const studyModes = [
        {
            title: "Participe",
            description: "Master the past and present participles in French.",
            href: "/participe",
            color: "bg-blue-500",
        },
        {
            title: "Passé Composé",
            description: "Practice the most common past tense in French.",
            href: "/passe-compose",
            color: "bg-indigo-500",
        },
        {
            title: "Imparfait",
            description:
                "Learn the imperfect tense for descriptions and habits.",
            href: "/imparfait",
            color: "bg-emerald-500",
        },
        {
            title: "Vocabulaire",
            description: "Learn essential French connectors and phrases.",
            href: "/vocabulaire",
            color: "bg-yellow-500",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                    Apprendre le Français
                </h1>
                <p className="mb-12 text-lg text-gray-600 dark:text-zinc-400">
                    Choose a study mode to begin your French learning journey.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {studyModes.map(mode => (
                        <Link
                            key={mode.href}
                            href={mode.href}
                            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900"
                        >
                            <div
                                className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-5 ${mode.color}`}
                            />
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${mode.color}`}
                                >
                                    <span className="text-2xl font-bold">
                                        {mode.title.charAt(0)}
                                    </span>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {mode.title}
                                </h2>
                                <p className="text-gray-600 dark:text-zinc-400">
                                    {mode.description}
                                </p>
                                <div className="mt-6 flex items-center font-semibold text-gray-900 dark:text-white">
                                    Start Learning
                                    <svg
                                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
