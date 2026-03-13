"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { verbs, Verb } from "@/data/verbs";
import { SETTINGS } from "@/constants/settings";

interface Person {
  pronoun: string;
  reflexive: string;
  ending: string;
}

const persons: Person[] = [
  { pronoun: "Je", reflexive: "me", ending: "ais" },
  { pronoun: "Tu", reflexive: "te", ending: "ais" },
  { pronoun: "Il", reflexive: "se", ending: "ait" },
  { pronoun: "Elle", reflexive: "se", ending: "ait" },
  { pronoun: "Nous", reflexive: "nous", ending: "ions" },
  { pronoun: "Vous", reflexive: "vous", ending: "iez" },
  { pronoun: "Ils", reflexive: "se", ending: "aient" },
  { pronoun: "Elles", reflexive: "se", ending: "aient" },
];

export default function ImparfaitPage() {
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPerson, setCurrentPerson] = useState<Person>(persons[0]);
  const [isNegated, setIsNegated] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; solution: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accents = ["é", "è", "ê", "ë", "à", "â", "î", "ï", "ô", "û", "ù", "ç", "'"];

  useEffect(() => {
    setShuffledVerbs([...verbs].sort(() => Math.random() - 0.5));
    setupRound();
  }, []);

  const setupRound = () => {
    setCurrentPerson(persons[Math.floor(Math.random() * persons.length)]);
    setIsNegated(Math.random() > (1 - SETTINGS.NEGATION_CHANCE));
  };

  const handleAccentClick = (accent: string) => {
    setUserGuess((prev) => prev + accent);
    inputRef.current?.focus();
  };

  const getSolution = (verb: Verb, person: Person, negated: boolean) => {
    let stem = verb.imparfaitStem;
    let conjugated = stem + person.ending;
    let pronoun = person.pronoun;
    let reflexive = verb.isReflexive ? person.reflexive : "";

    const startsWithVowel = (word: string) => /^[aeiouh]/i.test(word);

    let result = "";

    if (negated) {
      if (verb.isReflexive) {
        // Je ne me lavais pas
        let ne = startsWithVowel(reflexive) ? "n'" : "ne ";
        result = `${pronoun} ${ne}${reflexive} ${conjugated} pas`;
      } else {
        // Je n'aimais pas / Je ne venais pas
        let ne = startsWithVowel(conjugated) ? "n'" : "ne ";
        result = `${pronoun} ${ne}${conjugated} pas`;
      }
    } else {
      if (verb.isReflexive) {
        // Je me lavais / Je m'appelais
        if (startsWithVowel(reflexive)) {
          result = `${pronoun} ${reflexive.slice(0, -1)}'${conjugated}`;
        } else {
          result = `${pronoun} ${reflexive} ${conjugated}`;
        }
      } else {
        // J'aimais / Je venais
        if (pronoun.toLowerCase() === "je" && startsWithVowel(conjugated)) {
          result = `J'${conjugated}`;
        } else {
          result = `${pronoun} ${conjugated}`;
        }
      }
    }

    return result.replace(/\s+/g, " ").trim();
  };

  const checkAnswer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userGuess.trim() || isFlipped) return;

    const currentVerb = shuffledVerbs[currentIndex];
    const solution = getSolution(currentVerb, currentPerson, isNegated);
    
    const normalizedGuess = userGuess.trim().toLowerCase().replace(/\s+/g, " ");
    const normalizedSolution = solution.toLowerCase();

    const isCorrect = normalizedGuess === normalizedSolution;

    setFeedback({
      isCorrect,
      message: isCorrect ? "Bravo ! Correct." : "Oups !",
      solution: solution,
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
      setupRound();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }, 150);
  };

  const currentVerb = shuffledVerbs[currentIndex];

  if (!currentVerb) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950">
      <title>Imparfait - Apprendre le Français</title>
      <div className="mb-8 w-full max-w-md text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          L'Imparfait
        </h1>
        <p className="text-gray-600 dark:text-zinc-400">
          Type the full phrase in the Imperfect tense.
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
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-emerald-100 bg-white p-8 shadow-xl backface-hidden dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
              {isNegated && <span className="text-red-500 mr-3">(Négation)</span>}
              {currentPerson.pronoun} + {currentVerb.infinitive}
            </h2>
            <p className="mt-4 text-base text-gray-500 dark:text-zinc-400 text-center">
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
                Correct Form
              </span>
              <h2 className="text-4xl font-extrabold text-white text-center px-4">
                {feedback?.solution}
              </h2>
              <p className="mt-4 font-medium text-white/90">{feedback?.message}</p>
              {!feedback?.isCorrect && (
                <p className="mt-8 text-sm text-white/70 italic animate-pulse text-center">
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
            placeholder={`e.g. ${currentPerson.pronoun} ...`}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={isFlipped || !userGuess.trim()}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition-all hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-zinc-800"
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
