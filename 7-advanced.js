// 7.1 Montant total des amendes par utilisateur
db.emprunts.aggregate([
  { $group: { _id: "$utilisateur_id", total_amendes: { $sum: "$amende" } } },
  { $lookup: { from: "utilisateurs", localField: "_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $project: { _id: 0, nom: "$utilisateur.nom", total_amendes: 1 } }
]);

// 7.2 Durée moyenne des emprunts (en jours) par livre
db.emprunts.aggregate([
  { $match: { date_retour_reelle: { $exists: true } } },
  {
    $project: {
      livre_id: 1,
      duree: { $divide: [{ $subtract: ["$date_retour_reelle", "$date_emprunt"] }, 1000 * 60 * 60 * 24] }
    }
  },
  { $group: { _id: "$livre_id", duree_moyenne: { $avg: "$duree" } } },
  { $lookup: { from: "livres", localField: "_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $project: { _id: 0, titre: "$livre.titre", duree_moyenne: 1 } }
]);

// 7.3 Taux d'occupation par livre (% du temps emprunté depuis son ajout)
// Les emprunts en cours comptent jusqu'à aujourd'hui ($$NOW)
db.emprunts.aggregate([
  {
    $project: {
      livre_id: 1,
      duree: {
        $divide: [
          { $subtract: [{ $ifNull: ["$date_retour_reelle", "$$NOW"] }, "$date_emprunt"] },
          1000 * 60 * 60 * 24
        ]
      }
    }
  },
  { $group: { _id: "$livre_id", somme_durees: { $sum: "$duree" } } },
  { $lookup: { from: "livres", localField: "_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  {
    $project: {
      _id: 0,
      titre: "$livre.titre",
      taux_occupation_pct: {
        $multiply: [
          {
            $divide: [
              "$somme_durees",
              { $divide: [{ $subtract: ["$$NOW", "$livre.date_ajout"] }, 1000 * 60 * 60 * 24] }
            ]
          },
          100
        ]
      }
    }
  }
]);

// 7.4 Les 5 livres les plus empruntés
db.emprunts.aggregate([
  { $group: { _id: "$livre_id", total_emprunts: { $sum: 1 } } },
  { $sort: { total_emprunts: -1 } },
  { $limit: 5 },
  { $lookup: { from: "livres", localField: "_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $project: { _id: 0, titre: "$livre.titre", total_emprunts: 1 } }
]);

// 7.5 Les 5 utilisateurs les plus actifs
db.emprunts.aggregate([
  { $group: { _id: "$utilisateur_id", total_emprunts: { $sum: 1 } } },
  { $sort: { total_emprunts: -1 } },
  { $limit: 5 },
  { $lookup: { from: "utilisateurs", localField: "_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $project: { _id: 0, nom: "$utilisateur.nom", total_emprunts: 1 } }
]);

// 7.6 Livres avec note_moyenne >= 4.5 ET nombre_pages >= 300
db.livres.find({ note_moyenne: { $gte: 4.5 }, nombre_pages: { $gte: 300 } });

// 7.7 Auteurs ayant au moins un livre disponible
db.auteurs.aggregate([
  { $lookup: { from: "livres", localField: "_id", foreignField: "auteur_id", as: "livres" } },
  { $match: { "livres.disponible": true } },
  { $project: { _id: 0, nom: 1 } }
]);

// 7.8 Les 3 emprunts avec la plus longue durée
db.emprunts.aggregate([
  { $match: { date_retour_reelle: { $exists: true } } },
  {
    $project: {
      livre_id: 1,
      utilisateur_id: 1,
      duree_jours: { $divide: [{ $subtract: ["$date_retour_reelle", "$date_emprunt"] }, 1000 * 60 * 60 * 24] }
    }
  },
  { $sort: { duree_jours: -1 } },
  { $limit: 3 }
]);

// 7.9 Livres jamais empruntés
db.livres.aggregate([
  { $lookup: { from: "emprunts", localField: "_id", foreignField: "livre_id", as: "emprunts" } },
  { $match: { emprunts: { $size: 0 } } },
  { $project: { _id: 0, titre: 1 } }
]);

// 7.10 Utilisateurs n'ayant jamais emprunté
db.utilisateurs.aggregate([
  { $lookup: { from: "emprunts", localField: "_id", foreignField: "utilisateur_id", as: "emprunts" } },
  { $match: { emprunts: { $size: 0 } } },
  { $project: { _id: 0, nom: 1 } }
]);

// 7.11 Durée moyenne des emprunts par genre
db.emprunts.aggregate([
  { $match: { date_retour_reelle: { $exists: true } } },
  { $lookup: { from: "livres", localField: "livre_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  {
    $project: {
      genre: "$livre.genre",
      duree: { $divide: [{ $subtract: ["$date_retour_reelle", "$date_emprunt"] }, 1000 * 60 * 60 * 24] }
    }
  },
  { $group: { _id: "$genre", duree_moyenne: { $avg: "$duree" } } }
]);

// 7.12 Livres empruntés par des utilisateurs "Premium"
db.emprunts.aggregate([
  { $lookup: { from: "utilisateurs", localField: "utilisateur_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $match: { "utilisateur.abonnements": "Premium" } },
  { $lookup: { from: "livres", localField: "livre_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $group: { _id: "$livre._id", titre: { $first: "$livre.titre" } } },
  { $project: { _id: 0, titre: 1 } }
]);

// 7.13 Les 3 auteurs dont les livres ont été le plus empruntés
db.auteurs.aggregate([
  { $lookup: { from: "livres", localField: "_id", foreignField: "auteur_id", as: "livres" } },
  { $unwind: { path: "$livres", preserveNullAndEmptyArrays: true } },
  { $lookup: { from: "emprunts", localField: "livres._id", foreignField: "livre_id", as: "emprunts" } },
  { $group: { _id: "$_id", nom: { $first: "$nom" }, total_emprunts: { $sum: { $size: "$emprunts" } } } },
  { $sort: { total_emprunts: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, nom: 1, total_emprunts: 1 } }
]);

// 7.14 Nombre d'emprunts par mois de l'année en cours
db.emprunts.aggregate([
  { $match: { $expr: { $eq: [{ $year: "$date_emprunt" }, { $year: "$$NOW" }] } } },
  { $group: { _id: { $month: "$date_emprunt" }, total: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// 7.15 Livres ayant au moins un emprunt en_cours
db.livres.aggregate([
  { $lookup: { from: "emprunts", localField: "_id", foreignField: "livre_id", as: "emprunts" } },
  { $match: { "emprunts.statut": "en_cours" } },
  { $project: { _id: 0, titre: 1 } }
]);

// 7.16 Utilisateurs ayant emprunté au moins un livre "Science-Fiction"
db.emprunts.aggregate([
  { $lookup: { from: "livres", localField: "livre_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $match: { "livre.genre": "Science-Fiction" } },
  { $lookup: { from: "utilisateurs", localField: "utilisateur_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $group: { _id: "$utilisateur._id", nom: { $first: "$utilisateur.nom" } } },
  { $project: { _id: 0, nom: 1 } }
]);

// 7.17 Durée totale des emprunts (en jours) par utilisateur
db.emprunts.aggregate([
  { $match: { date_retour_reelle: { $exists: true } } },
  {
    $project: {
      utilisateur_id: 1,
      duree: { $divide: [{ $subtract: ["$date_retour_reelle", "$date_emprunt"] }, 1000 * 60 * 60 * 24] }
    }
  },
  { $group: { _id: "$utilisateur_id", duree_totale: { $sum: "$duree" } } },
  { $lookup: { from: "utilisateurs", localField: "_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $project: { _id: 0, nom: "$utilisateur.nom", duree_totale: 1 } }
]);

// 7.18 Livres retournés en retard (date_retour_reelle > date_retour_prevue)
db.emprunts.aggregate([
  { $match: { $expr: { $gt: ["$date_retour_reelle", "$date_retour_prevue"] } } },
  { $lookup: { from: "livres", localField: "livre_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $group: { _id: "$livre._id", titre: { $first: "$livre.titre" } } },
  { $project: { _id: 0, titre: 1 } }
]);

// 7.19 Auteurs ayant au moins un livre avec note_moyenne >= 4.5
db.auteurs.aggregate([
  { $lookup: { from: "livres", localField: "_id", foreignField: "auteur_id", as: "livres" } },
  { $match: { "livres.note_moyenne": { $gte: 4.5 } } },
  { $project: { _id: 0, nom: 1 } }
]);

// 7.20 Utilisateurs ayant emprunté des livres d'au moins 2 genres différents
db.emprunts.aggregate([
  { $lookup: { from: "livres", localField: "livre_id", foreignField: "_id", as: "livre" } },
  { $unwind: "$livre" },
  { $group: { _id: "$utilisateur_id", genres: { $addToSet: "$livre.genre" } } },
  { $match: { $expr: { $gte: [{ $size: "$genres" }, 2] } } },
  { $lookup: { from: "utilisateurs", localField: "_id", foreignField: "_id", as: "utilisateur" } },
  { $unwind: "$utilisateur" },
  { $project: { _id: 0, nom: "$utilisateur.nom", genres: 1 } }
]);