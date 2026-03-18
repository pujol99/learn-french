export interface Verb {
  infinitive: string;
  participe: string;
  translation: string;
  auxiliary: "avoir" | "être";
  imparfaitStem: string;
  futureStem: string;
  isReflexive?: boolean;
}

export const verbs: Verb[] = [
  // Avoir verbs
  { infinitive: "aimer", participe: "aimé", translation: "to love", auxiliary: "avoir", imparfaitStem: "aim", futureStem: "aimer" },
  { infinitive: "finir", participe: "fini", translation: "to finish", auxiliary: "avoir", imparfaitStem: "finiss", futureStem: "finir" },
  { infinitive: "vendre", participe: "vendu", translation: "to sell", auxiliary: "avoir", imparfaitStem: "vend", futureStem: "vendr" },
  { infinitive: "avoir", participe: "eu", translation: "to have", auxiliary: "avoir", imparfaitStem: "av", futureStem: "aur" },
  { infinitive: "être", participe: "été", translation: "to be", auxiliary: "avoir", imparfaitStem: "ét", futureStem: "ser" },
  { infinitive: "faire", participe: "fait", translation: "to do/make", auxiliary: "avoir", imparfaitStem: "fais", futureStem: "fer" },
  { infinitive: "dire", participe: "dit", translation: "to say", auxiliary: "avoir", imparfaitStem: "dis", futureStem: "dir" },
  { infinitive: "pouvoir", participe: "pu", translation: "to be able to", auxiliary: "avoir", imparfaitStem: "pouv", futureStem: "pourr" },
  { infinitive: "vouloir", participe: "voulu", translation: "to want", auxiliary: "avoir", imparfaitStem: "voul", futureStem: "voudr" },
  { infinitive: "prendre", participe: "pris", translation: "to take", auxiliary: "avoir", imparfaitStem: "pren", futureStem: "prendr" },
  { infinitive: "voir", participe: "vu", translation: "to see", auxiliary: "avoir", imparfaitStem: "voy", futureStem: "verr" },
  { infinitive: "devoir", participe: "dû", translation: "to must", auxiliary: "avoir", imparfaitStem: "dev", futureStem: "devr" },
  { infinitive: "savoir", participe: "su", translation: "to know", auxiliary: "avoir", imparfaitStem: "sav", futureStem: "saur" },
  { infinitive: "mettre", participe: "mis", translation: "to put", auxiliary: "avoir", imparfaitStem: "mett", futureStem: "mettr" },
  { infinitive: "écrire", participe: "écrit", translation: "to write", auxiliary: "avoir", imparfaitStem: "écriv", futureStem: "écrir" },
  { infinitive: "lire", participe: "lu", translation: "to read", auxiliary: "avoir", imparfaitStem: "lis", futureStem: "lir" },
  { infinitive: "croire", participe: "cru", translation: "to believe", auxiliary: "avoir", imparfaitStem: "croy", futureStem: "croir" },

  // Être verbs
  { infinitive: "venir", participe: "venu", translation: "to come", auxiliary: "être", imparfaitStem: "ven", futureStem: "viendr" },
  { infinitive: "aller", participe: "allé", translation: "to go", auxiliary: "être", imparfaitStem: "all", futureStem: "ir" },
  { infinitive: "partir", participe: "parti", translation: "to leave", auxiliary: "être", imparfaitStem: "part", futureStem: "partir" },
  { infinitive: "entrer", participe: "entré", translation: "to enter", auxiliary: "être", imparfaitStem: "entr", futureStem: "entrer" },
  { infinitive: "rester", participe: "resté", translation: "to stay", auxiliary: "être", imparfaitStem: "rest", futureStem: "rester" },
  { infinitive: "tomber", participe: "tombé", translation: "to fall", auxiliary: "être", imparfaitStem: "tomb", futureStem: "tomber" },
  { infinitive: "naître", participe: "né", translation: "to be born", auxiliary: "être", imparfaitStem: "naiss", futureStem: "naîtr" },
  { infinitive: "mourir", participe: "mort", translation: "to die", auxiliary: "être", imparfaitStem: "mour", futureStem: "mourr" },

  // Reflexive verbs
  { infinitive: "se laver", participe: "lavé", translation: "to wash oneself", auxiliary: "être", imparfaitStem: "lav", futureStem: "laver", isReflexive: true },
  { infinitive: "se souvenir", participe: "souvenu", translation: "to remember", auxiliary: "être", imparfaitStem: "souven", futureStem: "souviendr", isReflexive: true },
  { infinitive: "se dépêcher", participe: "dépêché", translation: "to hurry", auxiliary: "être", imparfaitStem: "dépêch", futureStem: "dépêcher", isReflexive: true },
  { infinitive: "se lever", participe: "levé", translation: "to get up", auxiliary: "être", imparfaitStem: "lev", futureStem: "lèver", isReflexive: true },
  { infinitive: "se coucher", participe: "couché", translation: "to go to bed", auxiliary: "être", imparfaitStem: "couch", futureStem: "coucher", isReflexive: true },
];

export const participeVerbs = verbs;
