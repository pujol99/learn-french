"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { verbs, Verb } from "@/data/verbs";

interface Person {
  pronoun: string;
  reflexive: string;
  aux_avoir: string;
  aux_etre: string;
  isPlural: boolean;
  isFeminine: boolean;
}

const persons: Person[] = [
  { pronoun: "Je", reflexive: "me", aux_avoir: "ai", aux_etre: "suis", isPlural: false, isFeminine: false },
  { pronoun: "Tu", reflexive: "te", aux_avoir: "as", aux_etre: "es", isPlural: false, isFeminine: false },
  { pronoun: "Il", reflexive: "se", aux_avoir: "a", aux_etre: "est", isPlural: false, isFeminine: false },
  { pronoun: "Elle", reflexive: "se", aux_avoir: "a", aux_etre: "est", isPlural: false, isFeminine: true },
  { pronoun: "Nous", reflexive: "nous", aux_avoir: "avons", aux_etre: "sommes", isPlural: true, isFeminine: false },
  { pronoun: "Vous", reflexive: "vous", aux_avoir: "avez", aux_etre: "êtes", isPlural: true, isFeminine: false },
  { pronoun: "Ils", reflexive: "se", aux_avoir: "ont", aux_etre: "sont", isPlural: true, isFeminine: false },
  { pronoun: "Elles", reflexive: "se", aux_avoir: "ont", aux_etre: "sont", isPlural: true, isFeminine: true },
];

export default function PasseComposePage() {
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
    setIsNegated(Math.random() > 0.7); // 30% chance of negation
  };

  const handleAccentClick = (accent: string) => {
    setUserGuess((prev) => prev + accent);
    inputRef.current?.focus();
  };

  const getSolution = (verb: Verb, person: Person, negated: boolean) => {
    let auxiliary = verb.auxiliary === "avoir" ? person.aux_avoir : person.aux_etre;
    let participe = verb.participe;
    let pronoun = person.pronoun;
    let reflexive = verb.isReflexive ? person.reflexive : "";

    // Agreement for "être" verbs (including reflexives)
    if (verb.auxiliary === "être") {
      if (person.isFeminine) participe += "e";
      if (person.isPlural) participe += "s";
    }

    // Handle contractions (Je ai -> J'ai, me + vowel -> m', etc.)
    const startsWithVowel = (word: string) => /^[aeiouh]/i.test(word);

    let result = "";

    if (negated) {
      if (verb.isReflexive) {
        // Je ne me suis pas lavé
        let ne = startsWithVowel(reflexive) ? "n'" : "ne ";
        result = `${pronoun} ${ne}${reflexive} ${auxiliary} pas ${participe}`;
      } else {
        // Je n'ai pas aimé / Je ne suis pas venu
        let ne = startsWithVowel(auxiliary) ? "n'" : "ne ";
        result = `${pronoun} ${ne}${auxiliary} pas ${participe}`;
      }
    } else {
      if (verb.isReflexive) {
        // Je me suis lavé / Je m'appelle (not in list but for logic)
        if (startsWithVowel(reflexive)) {
          result = `${pronoun} ${reflexive.slice(0, -1)}'${auxiliary} ${participe}`;
        } else {
          result = `${pronoun} ${reflexive} ${auxiliary} ${participe}`;
        }
      } else {
        // J'ai aimé / Je suis venu
        if (pronoun.toLowerCase() === "je" && startsWithVowel(auxiliary)) {
          result = `J'${auxiliary} ${participe}`;
        } else {
          result = `${pronoun} ${auxiliary} ${participe}`;
        }
      }
    }

    // Clean up double spaces if any
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

    // Automatically move to the next card
    setTimeout(() => {
      nextCard();
    }, isCorrect ? 1200 : 2400);
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
      <title>Passé Composé - Apprendre le Français</title>
      <div className="mb-8 w-full max-w-md text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Le Passé Composé
        </h1>
        <p className="text-gray-600 dark:text-zinc-400">
          Type the full phrase {isNegated && <span className="font-bold text-red-500 underline">(Negated)</span>}.
        </p>
      </div>

      <div className="relative h-64 w-full max-w-md perspective-1000">
        <div
          className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-indigo-100 bg-white p-8 shadow-xl backface-hidden dark:border-zinc-800 dark:bg-zinc-900">
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
              <h2 className="text-3xl font-extrabold text-white">
                {feedback?.solution}
              </h2>
              <p className="mt-4 font-medium text-white/90">{feedback?.message}</p>
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
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={isFlipped || !userGuess.trim()}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition-all hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-zinc-800"
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
