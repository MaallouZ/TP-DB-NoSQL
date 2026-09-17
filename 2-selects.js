// 2.1 Tous les livres de genre "Science-Fiction"
db.livres.find({ genre: "Science-Fiction" });

// 2.2 Tous les livres publiés avant 1950
db.livres.find({ annee_publication: { $lt: 1950 } });

// 2.3 Livres disponibles avec note_moyenne >= 4.5
db.livres.find({ disponible: true, note_moyenne: { $gte: 4.5 } });

// 2.4 Livres dont le nombre de pages est entre 200 et 400
db.livres.find({ nombre_pages: { $gte: 200, $lte: 400 } });

// 2.5 Livres écrits par "Victor Hugo" (via auteur_id)
const victorHugo = db.auteurs.findOne({ nom: "Victor Hugo" });
db.livres.find({ auteur_id: victorHugo._id });

// 2.6 Livres ayant le tag "Classique"
db.livres.find({ tags: "Classique" });

// 2.7 Livres disponibles, triés par note_moyenne décroissante
db.livres.find({ disponible: true }).sort({ note_moyenne: -1 });

// 2.8 Les 5 livres les mieux notés
db.livres.find().sort({ note_moyenne: -1 }).limit(5);

// 2.9 Livres publiés en 1984
db.livres.find({ annee_publication: 1984 });

// 2.10 Livres dont le titre contient "Guerre" (insensible à la casse)
db.livres.find({ titre: { $regex: "Guerre", $options: "i" } });