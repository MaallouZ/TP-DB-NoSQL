// À exécuter dans mongosh, connecté à la bonne base :
// use bibliotheque

db.auteurs.insertMany([
  {
    nom: "George Orwell",
    nationalite: "Royaume-Uni",
    annee_naissance: 1903,
    annee_deces: 1950,
    biographie: "Écrivain et journaliste britannique, connu pour ses œuvres dystopiques et satiriques dénonçant le totalitarisme.",
    livres_ecrits: 9
  },
  {
    nom: "Antoine de Saint-Exupéry",
    nationalite: "France",
    annee_naissance: 1900,
    annee_deces: 1944,
    biographie: "Aviateur et écrivain français, auteur du Petit Prince, disparu en vol en 1944.",
    livres_ecrits: 15
  },
  {
    nom: "Victor Hugo",
    nationalite: "France",
    annee_naissance: 1802,
    annee_deces: 1885,
    biographie: "Poète, dramaturge et romancier français, figure majeure du romantisme et de la littérature française.",
    livres_ecrits: 20
  },
  {
    nom: "J.K. Rowling",
    nationalite: "Royaume-Uni",
    annee_naissance: 1965,
    annee_deces: null,
    biographie: "Autrice britannique mondialement connue pour la saga Harry Potter.",
    livres_ecrits: 14
  },
  {
    nom: "Isaac Asimov",
    nationalite: "États-Unis",
    annee_naissance: 1920,
    annee_deces: 1992,
    biographie: "Écrivain et biochimiste américain d'origine russe, l'un des maîtres de la science-fiction.",
    livres_ecrits: 40
  }
]);


db.livres.insertMany([
  {
    titre: "1984",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eee"), // George Orwell
    annee_publication: 1949,
    genre: "Dystopie",
    nombre_pages: 328,
    langue: "Anglais",
    editeur: "Secker & Warburg",
    disponible: true,
    note_moyenne: 4.7,
    date_ajout: ISODate("2023-01-15"),
    tags: ["Politique", "Surveillance", "Classique"]
  },
  {
    titre: "La Ferme des animaux",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eee"), // George Orwell
    annee_publication: 1945,
    genre: "Fable politique",
    nombre_pages: 141,
    langue: "Anglais",
    editeur: "Secker & Warburg",
    disponible: true,
    note_moyenne: 4.5,
    date_ajout: ISODate("2023-01-20"),
    tags: ["Politique", "Satire", "Classique"]
  },
  {
    titre: "Le Petit Prince",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eef"), // Antoine de Saint-Exupéry
    annee_publication: 1943,
    genre: "Roman",
    nombre_pages: 96,
    langue: "Français",
    editeur: "Gallimard",
    disponible: true,
    note_moyenne: 4.8,
    date_ajout: ISODate("2023-05-10"),
    tags: ["Aventure", "Philosophie", "Classique"]
  },
  {
    titre: "Vol de nuit",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eef"), // Antoine de Saint-Exupéry
    annee_publication: 1931,
    genre: "Roman",
    nombre_pages: 179,
    langue: "Français",
    editeur: "Gallimard",
    disponible: true,
    note_moyenne: 4.2,
    date_ajout: ISODate("2023-05-12"),
    tags: ["Aviation", "Aventure"]
  },
  {
    titre: "Terre des hommes",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eef"), // Antoine de Saint-Exupéry
    annee_publication: 1939,
    genre: "Récit",
    nombre_pages: 224,
    langue: "Français",
    editeur: "Gallimard",
    disponible: false,
    note_moyenne: 4.4,
    date_ajout: ISODate("2023-05-15"),
    tags: ["Aviation", "Philosophie"]
  },
  {
    titre: "Les Misérables",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef0"), // Victor Hugo
    annee_publication: 1862,
    genre: "Roman",
    nombre_pages: 1488,
    langue: "Français",
    editeur: "A. Lacroix, Verboeckhoven & Cie",
    disponible: true,
    note_moyenne: 4.9,
    date_ajout: ISODate("2022-11-01"),
    tags: ["Classique", "Drame", "Société"]
  },
  {
    titre: "Notre-Dame de Paris",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef0"), // Victor Hugo
    annee_publication: 1831,
    genre: "Roman",
    nombre_pages: 940,
    langue: "Français",
    editeur: "Gosselin",
    disponible: true,
    note_moyenne: 4.6,
    date_ajout: ISODate("2022-11-05"),
    tags: ["Classique", "Drame", "Histoire"]
  },
  {
    titre: "Les Contemplations",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef0"), // Victor Hugo
    annee_publication: 1856,
    genre: "Poésie",
    nombre_pages: 480,
    langue: "Français",
    editeur: "Pagnerre",
    disponible: false,
    note_moyenne: 4.3,
    date_ajout: ISODate("2022-11-10"),
    tags: ["Poésie", "Classique"]
  },
  {
    titre: "Harry Potter à l'école des sorciers",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef1"), // J.K. Rowling
    annee_publication: 1997,
    genre: "Fantasy",
    nombre_pages: 320,
    langue: "Anglais",
    editeur: "Bloomsbury",
    disponible: true,
    note_moyenne: 4.8,
    date_ajout: ISODate("2023-03-01"),
    tags: ["Magie", "Aventure", "Jeunesse"]
  },
  {
    titre: "Harry Potter et la Chambre des secrets",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef1"), // J.K. Rowling
    annee_publication: 1998,
    genre: "Fantasy",
    nombre_pages: 352,
    langue: "Anglais",
    editeur: "Bloomsbury",
    disponible: true,
    note_moyenne: 4.7,
    date_ajout: ISODate("2023-03-05"),
    tags: ["Magie", "Aventure", "Jeunesse"]
  },
  {
    titre: "Harry Potter et le Prisonnier d'Azkaban",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef1"), // J.K. Rowling
    annee_publication: 1999,
    genre: "Fantasy",
    nombre_pages: 448,
    langue: "Anglais",
    editeur: "Bloomsbury",
    disponible: false,
    note_moyenne: 4.9,
    date_ajout: ISODate("2023-03-10"),
    tags: ["Magie", "Aventure", "Jeunesse"]
  },
  {
    titre: "Fondation",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef2"), // Isaac Asimov
    annee_publication: 1951,
    genre: "Science-Fiction",
    nombre_pages: 255,
    langue: "Anglais",
    editeur: "Gnome Press",
    disponible: true,
    note_moyenne: 4.6,
    date_ajout: ISODate("2023-02-01"),
    tags: ["Science-Fiction", "Espace", "Classique"]
  },
  {
    titre: "Les Robots",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef2"), // Isaac Asimov
    annee_publication: 1950,
    genre: "Science-Fiction",
    nombre_pages: 288,
    langue: "Anglais",
    editeur: "Gnome Press",
    disponible: true,
    note_moyenne: 4.5,
    date_ajout: ISODate("2023-02-05"),
    tags: ["Science-Fiction", "Robots"]
  },
  {
    titre: "Prélude à Fondation",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67ef2"), // Isaac Asimov
    annee_publication: 1988,
    genre: "Science-Fiction",
    nombre_pages: 480,
    langue: "Anglais",
    editeur: "Doubleday",
    disponible: true,
    note_moyenne: 4.4,
    date_ajout: ISODate("2023-02-10"),
    tags: ["Science-Fiction", "Espace"]
  },
  {
    titre: "Un peu d'air frais",
    auteur_id: ObjectId("6aabdaf4024e67fdcdb67eee"), // George Orwell
    annee_publication: 1939,
    genre: "Roman",
    nombre_pages: 288,
    langue: "Anglais",
    editeur: "Victor Gollancz Ltd",
    disponible: true,
    note_moyenne: 3.9,
    date_ajout: ISODate("2023-01-25"),
    tags: ["Roman", "Satire"]
  }
]);

// À exécuter dans mongosh, connecté à la bonne base :
// use bibliotheque

db.emprunts.insertMany([
  // Marie Dupont - 1984 (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef3"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f02"),
    date_emprunt: ISODate("2023-10-15"),
    date_retour_prevue: ISODate("2023-11-15"),
    date_retour_reelle: ISODate("2023-11-10"),
    statut: "retourne",
    amende: 0
  },
  // Marie Dupont - Le Petit Prince (rendu en retard)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef5"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f02"),
    date_emprunt: ISODate("2023-06-01"),
    date_retour_prevue: ISODate("2023-06-15"),
    date_retour_reelle: ISODate("2023-06-20"),
    statut: "retourne",
    amende: 5.00
  },
  // Jean Martin - Les Misérables (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef8"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f03"),
    date_emprunt: ISODate("2023-01-05"),
    date_retour_prevue: ISODate("2023-02-05"),
    date_retour_reelle: ISODate("2023-02-01"),
    statut: "retourne",
    amende: 0
  },
  // Jean Martin - Notre-Dame de Paris (en cours)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef9"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f03"),
    date_emprunt: ISODate("2023-03-10"),
    date_retour_prevue: ISODate("2023-04-10"),
    statut: "en_cours",
    amende: 0
  },
  // Sophie Bernard - Harry Potter 1 (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efb"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f04"),
    date_emprunt: ISODate("2023-07-01"),
    date_retour_prevue: ISODate("2023-07-21"),
    date_retour_reelle: ISODate("2023-07-19"),
    statut: "retourne",
    amende: 0
  },
  // Sophie Bernard - Harry Potter 2 (en retard, non rendu)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efc"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f04"),
    date_emprunt: ISODate("2023-08-01"),
    date_retour_prevue: ISODate("2023-08-21"),
    statut: "retard",
    amende: 3.50
  },
  // Lucas Petit - La Ferme des animaux (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef4"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f05"),
    date_emprunt: ISODate("2023-09-01"),
    date_retour_prevue: ISODate("2023-09-21"),
    date_retour_reelle: ISODate("2023-09-18"),
    statut: "retourne",
    amende: 0
  },
  // Lucas Petit - Fondation (annulé)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efe"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f05"),
    date_emprunt: ISODate("2023-04-15"),
    date_retour_prevue: ISODate("2023-05-15"),
    statut: "annule",
    amende: 0
  },
  // Camille Robert - Vol de nuit (rendu en retard)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef6"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f06"),
    date_emprunt: ISODate("2023-05-01"),
    date_retour_prevue: ISODate("2023-05-31"),
    date_retour_reelle: ISODate("2023-06-05"),
    statut: "retourne",
    amende: 2.00
  },
  // Camille Robert - Les Robots (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67eff"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f06"),
    date_emprunt: ISODate("2023-02-10"),
    date_retour_prevue: ISODate("2023-03-10"),
    date_retour_reelle: ISODate("2023-03-08"),
    statut: "retourne",
    amende: 0
  },
  // Thomas Richard - Les Misérables (en cours)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef8"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f07"),
    date_emprunt: ISODate("2023-11-01"),
    date_retour_prevue: ISODate("2023-12-01"),
    statut: "en_cours",
    amende: 0
  },
  // Thomas Richard - Notre-Dame de Paris (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef9"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f07"),
    date_emprunt: ISODate("2022-12-01"),
    date_retour_prevue: ISODate("2023-01-01"),
    date_retour_reelle: ISODate("2022-12-28"),
    statut: "retourne",
    amende: 0
  },
  // Emma Durand - Les Contemplations (en retard, non rendu)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efa"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f08"),
    date_emprunt: ISODate("2023-06-15"),
    date_retour_prevue: ISODate("2023-07-15"),
    statut: "retard",
    amende: 4.00
  },
  // Emma Durand - Harry Potter 3 (annulé)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efd"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f08"),
    date_emprunt: ISODate("2023-10-01"),
    date_retour_prevue: ISODate("2023-10-21"),
    statut: "annule",
    amende: 0
  },
  // Hugo Moreau - 1984 (en cours)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef3"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f09"),
    date_emprunt: ISODate("2023-12-01"),
    date_retour_prevue: ISODate("2023-12-21"),
    statut: "en_cours",
    amende: 0
  },
  // Hugo Moreau - Prélude à Fondation (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67f00"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f09"),
    date_emprunt: ISODate("2023-03-20"),
    date_retour_prevue: ISODate("2023-04-20"),
    date_retour_reelle: ISODate("2023-04-15"),
    statut: "retourne",
    amende: 0
  },
  // Léa Simon - Terre des hommes (en retard, non rendu)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67ef7"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f0a"),
    date_emprunt: ISODate("2023-07-10"),
    date_retour_prevue: ISODate("2023-08-10"),
    statut: "retard",
    amende: 6.00
  },
  // Léa Simon - Harry Potter 2 (rendu à temps)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efc"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f0a"),
    date_emprunt: ISODate("2023-01-15"),
    date_retour_prevue: ISODate("2023-02-15"),
    date_retour_reelle: ISODate("2023-02-10"),
    statut: "retourne",
    amende: 0
  },
  // Marie Dupont - Fondation (en cours)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efe"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f02"),
    date_emprunt: ISODate("2023-08-20"),
    date_retour_prevue: ISODate("2023-09-20"),
    statut: "en_cours",
    amende: 0
  },
  // Jean Martin - Harry Potter 1 (annulé)
  {
    livre_id: ObjectId("6aabdc61024e67fdcdb67efb"),
    utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f03"),
    date_emprunt: ISODate("2023-05-05"),
    date_retour_prevue: ISODate("2023-05-25"),
    statut: "annule",
    amende: 0
  }
]);