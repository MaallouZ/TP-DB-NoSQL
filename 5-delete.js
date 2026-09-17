// 5.1 Supprimer un livre connu (remplace l'_id par celui voulu)
db.livres.deleteOne({ _id: ObjectId('6aabdc61024e67fdcdb67ef7') });

// 5.2 Supprimer tous les livres du genre "Poésie"
db.livres.deleteMany({ genre: "Poésie" });

// 5.3 Supprimer tous les livres publiés avant 1900
db.livres.deleteMany({ annee_publication: { $lt: 1900 } });

// 5.4 Supprimer tous les emprunts annulés
db.emprunts.deleteMany({ statut: "annule" });

// 5.5 Supprimer les utilisateurs sans aucun emprunt
const utilisateursAvecEmprunts = db.emprunts.distinct("utilisateur_id");
db.utilisateurs.deleteMany({ _id: { $nin: utilisateursAvecEmprunts } });

// 5.6 Supprimer les livres sans auteur_id (null ou absent)
db.livres.deleteMany({
  $or: [{ auteur_id: null }, { auteur_id: { $exists: false } }]
});

// 5.7 Supprimer tous les emprunts d'un utilisateur connu (remplace l'_id)
db.emprunts.deleteMany({
  utilisateur_id: ObjectId("6aabdcd3024e67fdcdb67f09")
});

// 5.8 Supprimer les livres avec une note_moyenne < 2
db.livres.deleteMany({ note_moyenne: { $lt: 2 } });

// 5.9 Supprimer les auteurs sans aucun livre associé
const auteursAvecLivres = db.livres.distinct("auteur_id");
db.auteurs.deleteMany({ _id: { $nin: auteursAvecLivres } });

// 5.10 Supprimer les emprunts retournés depuis plus d'un an
const ilYaUnAn = new Date();
ilYaUnAn.setFullYear(ilYaUnAn.getFullYear() - 1);
db.emprunts.deleteMany({
  statut: "retourne",
  date_retour_reelle: { $lt: ilYaUnAn }
});