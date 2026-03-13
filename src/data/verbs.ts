export interface Verb {
  infinitive: string;
  participe: string;
  translation: string;
  auxiliary: "avoir" | "être";
  imparfaitStem: string;
  isReflexive?: boolean;
}

export const verbs: Verb[] = [
  // Avoir verbs
  { infinitive: "aimer", participe: "aimé", translation: "to love", auxiliary: "avoir", imparfaitStem: "aim" },
  { infinitive: "finir", participe: "fini", translation: "to finish", auxiliary: "avoir", imparfaitStem: "finiss" },
  { infinitive: "vendre", participe: "vendu", translation: "to sell", auxiliary: "avoir", imparfaitStem: "vend" },
  { infinitive: "avoir", participe: "eu", translation: "to have", auxiliary: "avoir", imparfaitStem: "av" },
  { infinitive: "être", participe: "été", translation: "to be", auxiliary: "avoir", imparfaitStem: "ét" },
  { infinitive: "faire", participe: "fait", translation: "to do/make", auxiliary: "avoir", imparfaitStem: "fais" },
  { infinitive: "dire", participe: "dit", translation: "to say", auxiliary: "avoir", imparfaitStem: "dis" },
  { infinitive: "pouvoir", participe: "pu", translation: "to be able to", auxiliary: "avoir", imparfaitStem: "pouv" },
  { infinitive: "vouloir", participe: "voulu", translation: "to want", auxiliary: "avoir", imparfaitStem: "voul" },
  { infinitive: "prendre", participe: "pris", translation: "to take", auxiliary: "avoir", imparfaitStem: "pren" },
  { infinitive: "voir", participe: "vu", translation: "to see", auxiliary: "avoir", imparfaitStem: "voy" },
  { infinitive: "devoir", participe: "dû", translation: "to must", auxiliary: "avoir", imparfaitStem: "dev" },
  { infinitive: "savoir", participe: "su", translation: "to know", auxiliary: "avoir", imparfaitStem: "sav" },
  { infinitive: "mettre", participe: "mis", translation: "to put", auxiliary: "avoir", imparfaitStem: "mett" },
  { infinitive: "écrire", participe: "écrit", translation: "to write", auxiliary: "avoir", imparfaitStem: "écriv" },
  { infinitive: "lire", participe: "lu", translation: "to read", auxiliary: "avoir", imparfaitStem: "lis" },
  { infinitive: "croire", participe: "cru", translation: "to believe", auxiliary: "avoir", imparfaitStem: "croy" },

  // Être verbs
  { infinitive: "venir", participe: "venu", translation: "to come", auxiliary: "être", imparfaitStem: "ven" },
  { infinitive: "aller", participe: "allé", translation: "to go", auxiliary: "être", imparfaitStem: "all" },
  { infinitive: "partir", participe: "parti", translation: "to leave", auxiliary: "être", imparfaitStem: "part" },
  { infinitive: "entrer", participe: "entré", translation: "to enter", auxiliary: "être", imparfaitStem: "entr" },
  { infinitive: "rester", participe: "resté", translation: "to stay", auxiliary: "être", imparfaitStem: "rest" },
  { infinitive: "tomber", participe: "tombé", translation: "to fall", auxiliary: "être", imparfaitStem: "tomb" },
  { infinitive: "naître", participe: "né", translation: "to be born", auxiliary: "être", imparfaitStem: "naiss" },
  { infinitive: "mourir", participe: "mort", translation: "to die", auxiliary: "être", imparfaitStem: "mour" },

  // Reflexive verbs
  { infinitive: "se laver", participe: "lavé", translation: "to wash oneself", auxiliary: "être", imparfaitStem: "lav", isReflexive: true },
  { infinitive: "se souvenir", participe: "souvenu", translation: "to remember", auxiliary: "être", imparfaitStem: "souven", isReflexive: true },
  { infinitive: "se dépêcher", participe: "dépêché", translation: "to hurry", auxiliary: "être", imparfaitStem: "dépêch", isReflexive: true },
  { infinitive: "se lever", participe: "levé", translation: "to get up", auxiliary: "être", imparfaitStem: "lev", isReflexive: true },
  { infinitive: "se coucher", participe: "couché", translation: "to go to bed", auxiliary: "être", imparfaitStem: "couch", isReflexive: true },
];

export const participeVerbs = verbs;
