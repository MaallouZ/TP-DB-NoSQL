// 4.1 Marquer un livre comme indisponible (remplace l'_id par celui voulu)
db.livres.updateOne(
  { _id: ObjectId("6aabdc61024e67fdcdb67ef6") }, // "Vol de nuit"
  { $set: { disponible: false } }
);

// 4.2 Augmenter la note_moyenne de 0.5 pour un livre connu
db.livres.updateOne(
  { _id: ObjectId("6aabdc61024e67fdcdb67f01") }, // "Un peu d'air frais"
  { $inc: { note_moyenne: 0.5 } }
);

// 4.3 Ajouter le tag "Littérature" à tous les livres du genre "Roman"
db.livres.updateMany(
  { genre: "Roman" },
  { $push: { tags: "Littérature" } }
);

// 4.4 Remettre disponible = true pour tous les livres retournés
// Étape 1 : récupérer les livre_id des emprunts avec statut "retourne"
const livresRendus = db.emprunts.distinct("livre_id", { statut: "retourne" });
// Étape 2 : mettre à jour ces livres
db.livres.updateMany(
  { _id: { $in: livresRendus } },
  { $set: { disponible: true } }
);

// 4.5 Corriger l'annee_publication d'un livre connu à 1990
db.livres.updateOne(
  { _id: ObjectId("6aabdc61024e67fdcdb67eff") }, // "Les Robots"
  { $set: { annee_publication: 1990 } }
);

// 4.6 Ajouter le tag "Bestseller" à tous les livres de J.K. Rowling
const rowling = db.auteurs.findOne({ nom: "J.K. Rowling" });
db.livres.updateMany(
  { auteur_id: rowling._id },
  { $push: { tags: "Bestseller" } }
);

// 4.7 Incrémenter nombre_emprunts de 1 pour un utilisateur connu
db.utilisateurs.updateOne(
  { _id: ObjectId("6aabdcd3024e67fdcdb67f0b") }, // Nathan Laurent
  { $inc: { nombre_emprunts: 1 } }
);

// 4.8 Marquer "retard" les emprunts en_cours dont la date prévue est dépassée
db.emprunts.updateMany(
  {
    statut: "en_cours",
    date_retour_prevue: { $lt: new Date() }
  },
  { $set: { statut: "retard" } }
);

// 4.9 Mettre à jour la date_retour_reelle à aujourd'hui pour un emprunt connu
db.emprunts.updateOne(
  { _id: ObjectId("REMPLACER_PAR_UN_ID_EMPRUNT_VALIDE") },
  { $set: { date_retour_reelle: new Date() } }
);

// 4.10 Réinitialiser l'amende à 0 pour les emprunts rendus à temps ou en avance
db.emprunts.updateMany(
  { $expr: { $lte: ["$date_retour_reelle", "$date_retour_prevue"] } },
  { $set: { amende: 0 } }
);