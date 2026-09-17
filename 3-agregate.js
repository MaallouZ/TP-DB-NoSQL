// 3.1 Nombre de livres par genre
db.livres.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
]);

// 3.2 Note moyenne par genre, triée par note décroissante
db.livres.aggregate([
  { $group: { _id: "$genre", note_moyenne: { $avg: "$note_moyenne" } } },
  { $sort: { note_moyenne: -1 } }
]);

// 3.3 Nombre total de pages par genre
db.livres.aggregate([
  { $group: { _id: "$genre", total_pages: { $sum: "$nombre_pages" } } }
]);

// 3.4 Les 3 livres avec le plus de pages
db.livres.find().sort({ nombre_pages: -1 }).limit(3);

// 3.5 Âge moyen des livres (année actuelle - annee_publication)
db.livres.aggregate([
  {
    $project: {
      titre: 1,
      age: { $subtract: [{ $year: "$$NOW" }, "$annee_publication"] }
    }
  },
  { $group: { _id: null, age_moyen: { $avg: "$age" } } }
]);

// 3.6 Les 3 auteurs les plus prolifiques
db.auteurs.find().sort({ livres_ecrits: -1 }).limit(3);

// 3.7 Livres avec une note_moyenne supérieure à la moyenne globale
const moyenneGlobale = db.livres.aggregate([
  { $group: { _id: null, moyenne: { $avg: "$note_moyenne" } } }
]).toArray()[0].moyenne;
db.livres.find({ note_moyenne: { $gt: moyenneGlobale } });

// 3.8 Livres dont le titre commence par "L"
db.livres.find({ titre: { $regex: "^L" } });

// 3.9 Livres publiés il y a plus de 50 ans
db.livres.aggregate([
  {
    $addFields: {
      age: { $subtract: [{ $year: "$$NOW" }, "$annee_publication"] }
    }
  },
  { $match: { age: { $gt: 50 } } }
]);

// 3.10 Les 5 livres disponibles avec le plus grand nombre de pages
db.livres.find({ disponible: true }).sort({ nombre_pages: -1 }).limit(5);