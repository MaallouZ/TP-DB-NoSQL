// 6.1 Livres avec le nom de leur auteur
db.livres.aggregate([
  {
    $lookup: {
      from: "auteurs",
      localField: "auteur_id",
      foreignField: "_id",
      as: "auteur"
    }
  },
  { $unwind: "$auteur" },
  { $project: { _id: 0, titre: 1, genre: 1, auteur: "$auteur.nom" } }
]);

// 6.2 Emprunts avec titre du livre et nom de l'utilisateur
db.emprunts.aggregate([
  {
    $lookup: {
      from: "livres",
      localField: "livre_id",
      foreignField: "_id",
      as: "livre"
    }
  },
  { $unwind: "$livre" },
  {
    $lookup: {
      from: "utilisateurs",
      localField: "utilisateur_id",
      foreignField: "_id",
      as: "utilisateur"
    }
  },
  { $unwind: "$utilisateur" },
  {
    $project: {
      _id: 0,
      titre_livre: "$livre.titre",
      nom_utilisateur: "$utilisateur.nom",
      date_emprunt: 1,
      date_retour_prevue: 1
    }
  }
]);

// 6.3 Utilisateurs avec leur nombre d'emprunts en_cours
db.utilisateurs.aggregate([
  {
    $lookup: {
      from: "emprunts",
      localField: "_id",
      foreignField: "utilisateur_id",
      as: "emprunts"
    }
  },
  {
    $project: {
      _id: 0,
      nom: 1,
      email: 1,
      emprunts_en_cours: {
        $size: {
          $filter: {
            input: "$emprunts",
            as: "e",
            cond: { $eq: ["$$e.statut", "en_cours"] }
          }
        }
      }
    }
  }
]);

// 6.4 Auteurs avec la liste de leurs livres (titre + année)
db.auteurs.aggregate([
  {
    $lookup: {
      from: "livres",
      localField: "_id",
      foreignField: "auteur_id",
      as: "livresEcrits"
    }
  },
  {
    $project: {
      _id: 0,
      nom: 1,
      livres: {
        $map: {
          input: "$livresEcrits",
          as: "l",
          in: { titre: "$$l.titre", annee_publication: "$$l.annee_publication" }
        }
      }
    }
  }
]);

// 6.5 Livres disponibles avec le nom de leur auteur
db.livres.aggregate([
  { $match: { disponible: true } },
  {
    $lookup: {
      from: "auteurs",
      localField: "auteur_id",
      foreignField: "_id",
      as: "auteur"
    }
  },
  { $unwind: "$auteur" },
  { $project: { _id: 0, titre: 1, auteur: "$auteur.nom", note_moyenne: 1 } }
]);

// 6.6 Emprunts en retard avec détails du livre et de l'utilisateur
db.emprunts.aggregate([
  { $match: { statut: "retard" } },
  {
    $lookup: {
      from: "livres",
      localField: "livre_id",
      foreignField: "_id",
      as: "livre"
    }
  },
  { $unwind: "$livre" },
  {
    $lookup: {
      from: "utilisateurs",
      localField: "utilisateur_id",
      foreignField: "_id",
      as: "utilisateur"
    }
  },
  { $unwind: "$utilisateur" },
  {
    $project: {
      _id: 0,
      titre_livre: "$livre.titre",
      nom_utilisateur: "$utilisateur.nom",
      date_emprunt: 1,
      date_retour_prevue: 1,
      amende: 1
    }
  }
]);

// 6.7 Utilisateurs avec leur nombre total de livres empruntés
db.utilisateurs.aggregate([
  {
    $lookup: {
      from: "emprunts",
      localField: "_id",
      foreignField: "utilisateur_id",
      as: "emprunts"
    }
  },
  { $project: { _id: 0, nom: 1, nombre_livres_empruntes: { $size: "$emprunts" } } }
]);

// 6.8 Livres avec leur nombre total d'emprunts
db.livres.aggregate([
  {
    $lookup: {
      from: "emprunts",
      localField: "_id",
      foreignField: "livre_id",
      as: "emprunts"
    }
  },
  { $project: { _id: 0, titre: 1, nombre_emprunts: { $size: "$emprunts" } } }
]);

// 6.9 Auteurs avec le nombre total d'emprunts de leurs livres
db.auteurs.aggregate([
  {
    $lookup: {
      from: "livres",
      localField: "_id",
      foreignField: "auteur_id",
      as: "livres"
    }
  },
  { $unwind: { path: "$livres", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "emprunts",
      localField: "livres._id",
      foreignField: "livre_id",
      as: "emprunts"
    }
  },
  {
    $group: {
      _id: "$_id",
      nom: { $first: "$nom" },
      total_emprunts: { $sum: { $size: "$emprunts" } }
    }
  },
  { $project: { _id: 0, nom: 1, total_emprunts: 1 } }
]);

// 6.10 Genres avec nombre total de livres et note moyenne
db.livres.aggregate([
  {
    $group: {
      _id: "$genre",
      nombre_livres: { $sum: 1 },
      note_moyenne: { $avg: "$note_moyenne" }
    }
  }
]);