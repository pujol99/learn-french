"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { participeVerbs, Verb } from "@/data/verbs";
import { SETTINGS } from "@/constants/settings";

export default function ParticipePage() {
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accents = ["é", "è", "ê", "ë", "à", "â", "î", "ï", "ô", "û", "ù", "ç", "'"];

  useEffect(() => {
    setShuffledVerbs([...participeVerbs].sort(() => Math.random() - 0.5));
  }, []);

  const handleAccentClick = (accent: string) => {
    setUserGuess((prev) => prev + accent);
    inputRef.current?.focus();
  };

  const checkAnswer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userGuess.trim() || isFlipped) return;

    const isCorrect = userGuess.trim().toLowerCase() === currentVerb.participe.toLowerCase();
    setFeedback({
      isCorrect,
      message: isCorrect ? "Bravo ! Correct." : `Oups ! C'est "${currentVerb.participe}".`,
    });
    setIsFlipped(true);

    // Automatically move to the next card ONLY if correct
    if (isCorrect) {
      setTimeout(() => {
        nextCard();
      }, SETTINGS.SUCCESS_DELAY);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setUserGuess("");
    setFeedback(null);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledVerbs.length);
      // Refocus input after card transition
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }, 150);
  };

  const currentVerb = shuffledVerbs[currentIndex];

  if (!currentVerb) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950">
      <title>Participe - Apprendre le Français</title>
      <div className="mb-8 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Le Participe
        </h1>
        <p className="text-gray-600 dark:text-zinc-400">
          Type the past participle of the verb.
        </p>
      </div>

      <div className="relative h-64 w-full max-w-md perspective-1000">
        <div
          onClick={() => (isFlipped && !feedback?.isCorrect ? nextCard() : null)}
          className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          } ${isFlipped && !feedback?.isCorrect ? "cursor-pointer" : "cursor-default"}`}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-xl backface-hidden dark:border-zinc-800 dark:bg-zinc-900">
            <span className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-500">
              Infinitive
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {currentVerb.infinitive}
            </h2>
            <p className="mt-2 text-base text-gray-500 dark:text-zinc-400">
              ({currentVerb.translation})
            </p>
          </div>

          {/* Back of Card */}
          <div
            className={`absolute inset-0 flex rotate-y-180 flex-col items-center justify-center rounded-3xl p-8 shadow-xl backface-hidden ${
              feedback?.isCorrect ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="mb-2 text-sm font-medium uppercase tracking-widest text-white/80">
                Participe Passé
              </span>
              <h2 className="text-5xl font-extrabold text-white">
                {currentVerb.participe}
              </h2>
              <p className="mt-4 font-medium text-white/90">{feedback?.message}</p>
              {!feedback?.isCorrect && (
                <p className="mt-8 text-sm text-white/70 italic animate-pulse">
                  Click card to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="mt-8 w-full max-w-md space-y-4">
        <form onSubmit={checkAnswer} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            disabled={isFlipped}
            placeholder="Your guess..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={isFlipped || !userGuess.trim()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-zinc-800"
          >
            Check
          </button>
        </form>

        {/* Accent Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {accents.map((accent) => (
            <button
              key={accent}
              onClick={() => handleAccentClick(accent)}
              disabled={isFlipped}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-medium hover:bg-gray-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            >
              {accent}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={nextCard}
          className="rounded-full bg-gray-900 px-8 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
        >
          Next Verb
        </button>
        <p className="text-sm text-gray-500">
          Card {currentIndex + 1} of {shuffledVerbs.length}
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
