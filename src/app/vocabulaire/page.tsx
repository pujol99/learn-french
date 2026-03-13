"use client";

import { vocabulary, VocabularyItem } from "@/data/vocabulary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VocabulairePage() {
    const [items, setItems] = useState<VocabularyItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setItems([...vocabulary].sort(() => Math.random() - 0.5));
    }, []);

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % items.length);
        }, 150);
    };

    const currentItem = items[currentIndex];

    if (!currentItem) return null;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950">
            <title>Vocabulaire - Apprendre le Français</title>
            <div className="mb-8 w-full max-w-md text-center">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center text-sm font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-400"
                >
                    ← Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Vocabulaire
                </h1>
                <p className="text-gray-600 dark:text-zinc-400">
                    French to Catalan Vocabulary.
                </p>
            </div>

            <div className="relative h-64 w-full max-w-md perspective-1000">
                <div
                    onClick={() =>
                        isFlipped ? nextCard() : setIsFlipped(true)
                    }
                    className={`relative h-full w-full cursor-pointer transition-transform duration-500 preserve-3d ${
                        isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                    {/* Front of Card */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-rose-100 bg-white p-8 shadow-xl backface-hidden dark:border-zinc-800 dark:bg-zinc-900">
                        <span className="mb-2 text-sm font-medium uppercase tracking-widest text-rose-500">
                            {currentItem.category}
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
                            {currentItem.word}
                        </h2>
                        <p className="mt-8 text-sm text-gray-400 italic animate-pulse">
                            Click to reveal Catalan
                        </p>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center rounded-3xl bg-rose-600 p-8 shadow-xl backface-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="mb-2 text-sm font-medium uppercase tracking-widest text-white/80">
                                Català
                            </span>
                            <h2 className="text-4xl font-extrabold text-white text-center px-4">
                                {currentItem.translation}
                            </h2>
                            <p className="mt-12 text-sm text-white/70 italic animate-pulse">
                                Click to continue
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-500">
                    Word {currentIndex + 1} of {items.length}
                </p>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}
