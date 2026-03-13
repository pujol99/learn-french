export interface Verb {
  infinitive: string;
  participe: string;
  translation: string;
  auxiliary: "avoir" | "être";
  isReflexive?: boolean;
}

export const verbs: Verb[] = [
  // Avoir verbs
  { infinitive: "aimer", participe: "aimé", translation: "to love", auxiliary: "avoir" },
  { infinitive: "finir", participe: "fini", translation: "to finish", auxiliary: "avoir" },
  { infinitive: "vendre", participe: "vendu", translation: "to sell", auxiliary: "avoir" },
  { infinitive: "avoir", participe: "eu", translation: "to have", auxiliary: "avoir" },
  { infinitive: "être", participe: "été", translation: "to be", auxiliary: "avoir" },
  { infinitive: "faire", participe: "fait", translation: "to do/make", auxiliary: "avoir" },
  { infinitive: "dire", participe: "dit", translation: "to say", auxiliary: "avoir" },
  { infinitive: "pouvoir", participe: "pu", translation: "to be able to", auxiliary: "avoir" },
  { infinitive: "vouloir", participe: "voulu", translation: "to want", auxiliary: "avoir" },
  { infinitive: "prendre", participe: "pris", translation: "to take", auxiliary: "avoir" },
  { infinitive: "voir", participe: "vu", translation: "to see", auxiliary: "avoir" },
  { infinitive: "devoir", participe: "dû", translation: "to must", auxiliary: "avoir" },
  { infinitive: "savoir", participe: "su", translation: "to know", auxiliary: "avoir" },
  { infinitive: "mettre", participe: "mis", translation: "to put", auxiliary: "avoir" },
  { infinitive: "écrire", participe: "écrit", translation: "to write", auxiliary: "avoir" },
  { infinitive: "lire", participe: "lu", translation: "to read", auxiliary: "avoir" },
  { infinitive: "croire", participe: "cru", translation: "to believe", auxiliary: "avoir" },

  // Être verbs (DR MRS VANDERTRAMP)
  { infinitive: "venir", participe: "venu", translation: "to come", auxiliary: "être" },
  { infinitive: "aller", participe: "allé", translation: "to go", auxiliary: "être" },
  { infinitive: "partir", participe: "parti", translation: "to leave", auxiliary: "être" },
  { infinitive: "entrer", participe: "entré", translation: "to enter", auxiliary: "être" },
  { infinitive: "rester", participe: "resté", translation: "to stay", auxiliary: "être" },
  { infinitive: "tomber", participe: "tombé", translation: "to fall", auxiliary: "être" },
  { infinitive: "naître", participe: "né", translation: "to be born", auxiliary: "être" },
  { infinitive: "mourir", participe: "mort", translation: "to die", auxiliary: "être" },

  // Reflexive verbs (All use Être)
  { infinitive: "se laver", participe: "lavé", translation: "to wash oneself", auxiliary: "être", isReflexive: true },
  { infinitive: "se souvenir", participe: "souvenu", translation: "to remember", auxiliary: "être", isReflexive: true },
  { infinitive: "se dépêcher", participe: "dépêché", translation: "to hurry", auxiliary: "être", isReflexive: true },
  { infinitive: "se lever", participe: "levé", translation: "to get up", auxiliary: "être", isReflexive: true },
  { infinitive: "se coucher", participe: "couché", translation: "to go to bed", auxiliary: "être", isReflexive: true },
];

export const participeVerbs = verbs;
