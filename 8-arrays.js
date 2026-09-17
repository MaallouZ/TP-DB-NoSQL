// 8.1 Livres ayant exactement 3 tags
db.livres.find({ $expr: { $eq: [{ $size: "$tags" }, 3] } });

// 8.2 Livres dont le premier tag est "Classique"
db.livres.find({ "tags.0": "Classique" });

// 8.3 Ajouter le tag "Promotion" à tous les livres du genre "Roman"
// $addToSet évite les doublons si le tag existe déjà
db.livres.updateMany(
  { genre: "Roman" },
  { $addToSet: { tags: "Promotion" } }
);

// 8.4 Retirer le tag "Ancien" de tous les livres qui l'ont
db.livres.updateMany(
  { tags: "Ancien" },
  { $pull: { tags: "Ancien" } }
);

// 8.5 Utilisateurs avec l'abonnement "Numérique"
db.utilisateurs.find({ abonnements: "Numérique" });

// 8.6 Utilisateurs avec au moins 2 abonnements
db.utilisateurs.find({ $expr: { $gte: [{ $size: "$abonnements" }, 2] } });

// 8.7 Livres avec un nombre de pages pair
db.livres.find({ $expr: { $eq: [{ $mod: ["$nombre_pages", 2] }, 0] } });

// 8.8 Livres dont le titre contient au moins 3 mots
db.livres.aggregate([
  { $project: { titre: 1, nombre_mots: { $size: { $split: ["$titre", " "] } } } },
  { $match: { nombre_mots: { $gte: 3 } } }
]);

// 8.9 Auteurs nés entre 1901 et 2000
db.auteurs.find({ annee_naissance: { $gte: 1901, $lte: 2000 } });

// 8.10 Arrondir la note_moyenne de tous les livres à l'entier le plus proche
// Update par pipeline d'agrégation (MongoDB 4.2+), la valeur dépend du champ lui-même
db.livres.updateMany(
  {},
  [{ $set: { note_moyenne: { $round: ["$note_moyenne", 0] } } }]
);