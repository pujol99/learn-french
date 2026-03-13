export interface VocabularyItem {
  word: string;
  translation: string;
  category: string;
}

export const vocabulary: VocabularyItem[] = [
    // Connectors (existing)
    { word: "Mais", translation: "Però", category: "Connectors" },
    {
        word: "D'abord",
        translation: "Primer / En primer lloc",
        category: "Connectors",
    },
    {
        word: "Ensuite",
        translation: "Després / Seguidament",
        category: "Connectors",
    },
    {
        word: "Enfin",
        translation: "Finalment / Per fi",
        category: "Connectors",
    },
    { word: "Cependant", translation: "Tanmateix", category: "Connectors" },
    { word: "Donc", translation: "Doncs / Per tant", category: "Connectors" },

    // Més Connectors (A2 level)
    {
        word: "Alors",
        translation: "Llavors / Aleshores",
        category: "Connectors",
    },
    { word: "Puis", translation: "Després / Llavors", category: "Connectors" },
    {
        word: "Parce que",
        translation: "Perquè (causa)",
        category: "Connectors",
    },
    {
        word: "Car",
        translation: "Ja que / Car (formal)",
        category: "Connectors",
    },
    {
        word: "Pourtant",
        translation: "Tanmateix / No obstant",
        category: "Connectors",
    },
    {
        word: "D'ailleurs",
        translation: "Per cert / D'altra banda",
        category: "Connectors",
    },
    { word: "En plus", translation: "A més a més", category: "Connectors" },
    {
        word: "C'est pourquoi",
        translation: "És per això que",
        category: "Connectors",
    },
    { word: "Grâce à", translation: "Gràcies a", category: "Connectors" },
    { word: "À cause de", translation: "A causa de", category: "Connectors" },
    { word: "Sinon", translation: "Si no / Altrament", category: "Connectors" },
    { word: "Pendant que", translation: "Mentre", category: "Connectors" },
    { word: "Après", translation: "Després de", category: "Connectors" },
    { word: "Avant", translation: "Abans de", category: "Connectors" },
    { word: "Surtout", translation: "Sobretot", category: "Connectors" },
    {
        word: "Même si",
        translation: "Encara que / Fins i tot si",
        category: "Connectors",
    },
    // Everyday Objects & Places
    { word: "La maison", translation: "La casa", category: "Everyday" },
    { word: "La voiture", translation: "El cotxe", category: "Everyday" },
    {
        word: "Le travail",
        translation: "La feina / El treball",
        category: "Everyday",
    },
    { word: "L'école", translation: "L'escola", category: "Everyday" },
    { word: "Le pain", translation: "El pa", category: "Everyday" },
    { word: "L'eau", translation: "L'aigua", category: "Everyday" },
    { word: "Le lit", translation: "El llit", category: "Everyday" },
    { word: "La table", translation: "La taula", category: "Everyday" },
    { word: "La chaise", translation: "La cadira", category: "Everyday" },
    { word: "Le livre", translation: "El llibre", category: "Everyday" },

    // Time & Days
    { word: "Aujourd'hui", translation: "Avui", category: "Time" },
    { word: "Demain", translation: "Demà", category: "Time" },
    { word: "Hier", category: "Time", translation: "Ahir" },
    { word: "Maintenant", translation: "Ara", category: "Time" },
    { word: "Toujours", translation: "Sempre", category: "Time" },
    { word: "Souvent", translation: "Sovint", category: "Time" },
    { word: "Parfois", translation: "A vegades", category: "Time" },
    { word: "Le matin", translation: "El matí", category: "Time" },
    { word: "Le soir", translation: "El vespre", category: "Time" },
    { word: "La nuit", translation: "La nit", category: "Time" },

    // Feelings & States
    { word: "Heureux / Heureuse", translation: "Feliç", category: "Feelings" },
    { word: "Triste", translation: "Trist / Trista", category: "Feelings" },
    {
        word: "Fatigué / Fatiguée",
        translation: "Cansat / Cansada",
        category: "Feelings",
    },
    { word: "Froid", translation: "Fred", category: "Feelings" },
    { word: "Chaud", translation: "Calor / Calent", category: "Feelings" },
    { word: "Faim", translation: "Gana", category: "Feelings" },
    { word: "Soif", translation: "Set", category: "Feelings" },
];
