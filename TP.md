# Gestion d'une Bibliothèque Numérique

## 🎯 Contexte

Vous êtes responsable du développement d'une base de données MongoDB pour une bibliothèque numérique moderne.

Votre mission est de concevoir un système efficace pour gérer :

- ✔ Les livres (avec leurs métadonnées)
- ✔ Les auteurs (créateurs des œuvres)
- ✔ Les utilisateurs (lecteurs et membres de la bibliothèque)
- ✔ Les emprunts (historique des livres empruntés)

Contrairement aux bases de données relationnelles, MongoDB utilise des **collections** (équivalentes aux tables) et des **documents JSON** (équivalents aux lignes).

Les relations entre entités peuvent être gérées via :

- ✅ **Références** (stockage des `ObjectId` dans d'autres documents)
- ✅ **Embedding** (intégration directe de sous-documents)

---

## 📌 Structure des Données

### 1️⃣ Collection `livres`

Stockez les informations suivantes pour chaque livre :

| Champ | Type | Description | Exemple |
|---|---|---|---|
| `_id` | ObjectId | Identifiant unique (généré automatiquement) | `ObjectId("...")` |
| `titre` | String | Titre du livre | `"Le Petit Prince"` |
| `auteur_id` | ObjectId | Référence à l'auteur (dans la collection `auteurs`) | `ObjectId("...")` |
| `annee_publication` | Number | Année de publication | `1943` |
| `genre` | String | Genre littéraire | `"Roman"`, `"Science-Fiction"`, `"Biographie"` |
| `nombre_pages` | Number | Nombre de pages | `96` |
| `langue` | String | Langue du livre | `"Français"` |
| `editeur` | String | Maison d'édition | `"Gallimard"` |
| `disponible` | Boolean | Disponibilité pour emprunt | `true` / `false` |
| `note_moyenne` | Number | Note moyenne (sur 5) | `4.8` |
| `date_ajout` | Date | Date d'ajout dans la bibliothèque | `ISODate("2023-05-10")` |
| `tags` | Array | Mots-clés pour la recherche | `["Aventure", "Philosophie", "Classique"]` |

### 2️⃣ Collection `auteurs`

Stockez les informations suivantes pour chaque auteur :

| Champ | Type | Description | Exemple |
|---|---|---|---|
| `_id` | ObjectId | Identifiant unique | `ObjectId("...")` |
| `nom` | String | Nom complet de l'auteur | `"Antoine de Saint-Exupéry"` |
| `nationalite` | String | Pays d'origine | `"France"` |
| `annee_naissance` | Number | Année de naissance | `1900` |
| `annee_deces` | Number | Année de décès (si applicable) | `1944` |
| `biographie` | String | Brève biographie | `"Aviateur et écrivain français..."` |
| `livres_ecrits` | Number | Nombre total de livres écrits | `15` |

### 3️⃣ Collection `utilisateurs`

Stockez les informations suivantes pour chaque utilisateur :

| Champ | Type | Description | Exemple |
|---|---|---|---|
| `_id` | ObjectId | Identifiant unique | `ObjectId("...")` |
| `nom` | String | Nom complet | `"Marie Dupont"` |
| `email` | String | Adresse email | `"marie.dupont@example.com"` |
| `type` | String | Type d'utilisateur | `"Étudiant"`, `"Professeur"`, `"Membre"` |
| `date_inscription` | Date | Date d'inscription | `ISODate("2022-09-01")` |
| `nombre_emprunts` | Number | Nombre total d'emprunts | `12` |
| `abonnements` | Array | Types d'abonnements | `["Premium", "Numérique"]` |

### 4️⃣ Collection `emprunts`

Stockez les informations suivantes pour chaque emprunt :

| Champ | Type | Description | Exemple |
|---|---|---|---|
| `_id` | ObjectId | Identifiant unique | `ObjectId("...")` |
| `livre_id` | ObjectId | Référence au livre emprunté | `ObjectId("...")` |
| `utilisateur_id` | ObjectId | Référence à l'utilisateur | `ObjectId("...")` |
| `date_emprunt` | Date | Date de début de l'emprunt | `ISODate("2023-10-15")` |
| `date_retour_prevue` | Date | Date de retour prévue | `ISODate("2023-11-15")` |
| `date_retour_reelle` | Date | Date de retour réelle (si retourné) | `ISODate("2023-11-10")` |
| `statut` | String | Statut de l'emprunt | `"en_cours"`, `"retourne"`, `"retard"`, `"annule"` |
| `amende` | Number | Montant de l'amende (si retard) | `5.00` |

---

## 📝 Exercice : Requêtes MongoDB

### 🔹 1. Création des Collections et Insertion de Données

**1.1 Créer les collections**
Créez les collections `livres`, `auteurs`, `utilisateurs` et `emprunts`.
> Astuce : En MongoDB, une collection est créée automatiquement à la première insertion de document.

**1.2 Insérer des données**
Insérez au moins **15 livres** dans la collection `livres` avec des valeurs variées pour chaque champ.

Exemple de document :

```json
{
  "titre": "1984",
  "auteur_id": ObjectId("65f1a2b3c4d5e6f7a8b9c0d1"),
  "annee_publication": 1949,
  "genre": "Dystopie",
  "nombre_pages": 328,
  "langue": "Anglais",
  "editeur": "Secker & Warburg",
  "disponible": true,
  "note_moyenne": 4.7,
  "date_ajout": ISODate("2023-01-15"),
  "tags": ["Politique", "Surveillance", "Classique"]
}
```

Insérez également :

- Au moins **5 auteurs** dans la collection `auteurs`.
- Au moins **10 utilisateurs** dans la collection `utilisateurs`.
- Au moins **20 emprunts** dans la collection `emprunts` (en utilisant des `ObjectId` valides pour les références).

### 🔹 2. Requêtes de Sélection de Base

| # | Requête |
|---|---|
| 2.1 | Trouvez tous les livres dont le genre est `"Science-Fiction"`. |
| 2.2 | Trouvez tous les livres publiés avant 1950. |
| 2.3 | Trouvez tous les livres disponibles (`disponible: true`) avec une `note_moyenne` supérieure ou égale à 4.5. |
| 2.4 | Trouvez tous les livres dont le `nombre_pages` est compris entre 200 et 400. |
| 2.5 | Trouvez tous les livres écrits par un auteur dont le nom est `"Victor Hugo"` (utilisez `auteur_id` pour la référence). |
| 2.6 | Trouvez tous les livres qui ont le tag `"Classique"` dans leur tableau `tags`. |
| 2.7 | Trouvez tous les livres disponibles (`disponible: true`) et triez-les par `note_moyenne` dans l'ordre décroissant. |
| 2.8 | Trouvez les 5 livres avec la `note_moyenne` la plus élevée. |
| 2.9 | Trouvez tous les livres publiés en 1984. |
| 2.10 | Trouvez tous les livres dont le titre contient le mot `"Guerre"` (utilisez une expression régulière). |

### 🔹 3. Requêtes d'Agrégation

**3.1 Compter le nombre de livres par genre**
Comptez le nombre de livres pour chaque genre et affichez le résultat sous la forme :

```json
{ "_id": "Roman", "count": 8 }
```

| # | Requête |
|---|---|
| 3.2 | Calculez la `note_moyenne` pour chaque genre et triez les résultats par note décroissante. |
| 3.3 | Calculez le nombre total de pages (`nombre_pages`) pour chaque genre. |
| 3.4 | Trouvez les 3 livres avec le plus grand nombre de pages (`nombre_pages`). |
| 3.5 | Calculez l'âge moyen des livres (année actuelle − `annee_publication`). |
| 3.6 | Trouvez les 3 auteurs ayant écrit le plus de livres (champ `livres_ecrits`). |
| 3.7 | Trouvez tous les livres dont la `note_moyenne` est supérieure à la moyenne des notes de tous les livres. |
| 3.8 | Trouvez tous les livres dont le titre commence par la lettre `"L"` (expression régulière). |
| 3.9 | Trouvez tous les livres publiés il y a plus de 50 ans (par rapport à l'année actuelle). |
| 3.10 | Trouvez les 5 livres disponibles (`disponible: true`) avec le plus grand `nombre_pages`. |

### 🔹 4. Requêtes de Mise à Jour

| # | Requête |
|---|---|
| 4.1 | Mettez à jour le champ `disponible` à `false` pour un livre dont l'`_id` est connu. |
| 4.2 | Augmentez la `note_moyenne` de 0.5 pour un livre dont l'`_id` est connu. |
| 4.3 | Mettez à jour tous les livres du genre `"Roman"` pour ajouter le tag `"Littérature"` à leur tableau `tags`. |
| 4.4 | Mettez à jour le champ `disponible` à `true` pour tous les livres qui ont été retournés (utilisez la collection `emprunts`). |
| 4.5 | Modifiez l'`annee_publication` d'un livre dont l'`_id` est connu pour le mettre à jour à 1990. |
| 4.6 | Ajoutez le tag `"Bestseller"` à tous les livres écrits par un auteur dont le nom est `"J.K. Rowling"`. |
| 4.7 | Incrémentez le champ `nombre_emprunts` de 1 pour un utilisateur dont l'`_id` est connu. |
| 4.8 | Mettez à jour le `statut` à `"retard"` pour tous les emprunts où `date_retour_prevue` est antérieure à la date actuelle et où `statut` est `"en_cours"`. |
| 4.9 | Mettez à jour le champ `date_retour_reelle` à la date actuelle pour un emprunt dont l'`_id` est connu. |
| 4.10 | Mettez à jour le champ `amende` à 0 pour tous les emprunts où `date_retour_reelle` est antérieure ou égale à `date_retour_prevue`. |

### 🔹 5. Requêtes de Suppression

| # | Requête |
|---|---|
| 5.1 | Supprimez un livre dont l'`_id` est connu. |
| 5.2 | Supprimez tous les livres dont le genre est `"Poésie"`. |
| 5.3 | Supprimez tous les livres dont l'`annee_publication` est antérieure à 1900. |
| 5.4 | Supprimez tous les emprunts dont le `statut` est `"annule"`. |
| 5.5 | Supprimez tous les utilisateurs qui n'ont aucun emprunt associé (utilisez la collection `emprunts`). |
| 5.6 | Supprimez tous les livres dont le champ `auteur_id` est `null` ou inexistant. |
| 5.7 | Supprimez tous les emprunts associés à un utilisateur dont l'`_id` est connu. |
| 5.8 | Supprimez tous les livres dont la `note_moyenne` est inférieure à 2. |
| 5.9 | Supprimez tous les auteurs qui n'ont aucun livre associé dans la collection `livres`. |
| 5.10 | Supprimez tous les emprunts dont le `statut` est `"retourne"` et dont la `date_retour_reelle` est antérieure à un an par rapport à la date actuelle. |

### 🔹 6. Jointures avec `$lookup`

**6.1 Liste des livres avec les informations de leur auteur**
Affichez pour chaque livre son titre, genre, et le nom de son auteur. Utilisez `$lookup` pour joindre la collection `auteurs`.

**6.2 Liste des emprunts avec les informations du livre et de l'utilisateur**
Affichez pour chaque emprunt :
- Le titre du livre
- Le nom de l'utilisateur
- La `date_emprunt`
- La `date_retour_prevue`

Utilisez `$lookup` pour joindre les collections `livres` et `utilisateurs`.

**6.3 Liste des utilisateurs avec leurs emprunts en cours**
Affichez pour chaque utilisateur :
- Son nom
- Son email
- Le nombre d'emprunts `en_cours`

Utilisez `$lookup` pour joindre la collection `emprunts` et filtrez avec `$match`.

**6.4 Liste des auteurs avec leurs livres**
Affichez pour chaque auteur :
- Son nom
- Une liste de ses livres (avec titre et `annee_publication`)

Utilisez `$lookup` pour joindre la collection `livres`.

**6.5 Liste des livres disponibles avec leurs auteurs**
Affichez pour chaque livre disponible (`disponible: true`) :
- Son titre
- Le nom de son auteur
- Sa `note_moyenne`

Utilisez `$lookup` pour joindre la collection `auteurs`.

**6.6 Liste des emprunts en retard avec les détails du livre et de l'utilisateur**
Affichez pour chaque emprunt en retard (`statut: "retard"`) :
- Le titre du livre
- Le nom de l'utilisateur
- La `date_emprunt`
- La `date_retour_prevue`
- Le montant de l'amende

Utilisez `$lookup` pour joindre les collections `livres` et `utilisateurs`.

**6.7 Liste des utilisateurs avec le nombre total de livres empruntés**
Affichez pour chaque utilisateur :
- Son nom
- Le nombre total de livres empruntés (comptez les emprunts dans la collection `emprunts`)

Utilisez `$lookup` + `$size` ou `$group`.

**6.8 Liste des livres avec le nombre total d'emprunts**
Affichez pour chaque livre :
- Son titre
- Le nombre total d'emprunts (comptez les emprunts dans la collection `emprunts`)

Utilisez `$lookup` + `$group`.

**6.9 Liste des auteurs avec le nombre total d'emprunts de leurs livres**
Affichez pour chaque auteur :
- Son nom
- Le nombre total d'emprunts de ses livres

Utilisez `$lookup` pour joindre `livres` et `emprunts`, puis `$group`.

**6.10 Liste des genres avec le nombre total de livres et leur note moyenne**
Affichez pour chaque genre :
- Le nom du genre
- Le nombre total de livres
- La `note_moyenne` moyenne des livres de ce genre

Utilisez `$group` avec `$avg` et `$sum`.

### 🔹 7. Exercices Avancés (Agrégations Complexes)

| # | Requête |
|---|---|
| 7.1 | Calculez le montant total des amendes pour chaque utilisateur. |
| 7.2 | Calculez la durée moyenne (en jours) des emprunts pour chaque livre (différence entre `date_retour_reelle` et `date_emprunt`). |
| 7.3 | Calculez le pourcentage de temps où chaque livre est emprunté par rapport au temps écoulé depuis son ajout (`date_ajout`). Formule : `(Somme des durées des emprunts / (Date actuelle - date_ajout)) * 100` |
| 7.4 | Trouvez les 5 livres les plus empruntés (nombre total d'emprunts). |
| 7.5 | Trouvez les 5 utilisateurs ayant le plus grand nombre d'emprunts. |
| 7.6 | Trouvez les livres qui ont à la fois une `note_moyenne` ≥ 4.5 **et** un `nombre_pages` ≥ 300. |
| 7.7 | Trouvez tous les auteurs qui ont au moins un livre disponible (`disponible: true`). |
| 7.8 | Trouvez les 3 emprunts avec la durée la plus longue (différence entre `date_retour_reelle` et `date_emprunt`). |
| 7.9 | Trouvez tous les livres qui n'apparaissent dans aucun emprunt (collection `emprunts`). |
| 7.10 | Trouvez tous les utilisateurs qui n'apparaissent dans aucun emprunt. |
| 7.11 | Calculez la durée moyenne des emprunts pour chaque genre de livre. |
| 7.12 | Trouvez tous les livres empruntés par des utilisateurs ayant l'abonnement `"Premium"` dans leur tableau `abonnements`. |
| 7.13 | Trouvez les 3 auteurs dont les livres ont été empruntés le plus grand nombre de fois. |
| 7.14 | Calculez le nombre total d'emprunts pour chaque mois de l'année en cours. |
| 7.15 | Trouvez tous les livres qui ont au moins un emprunt avec le statut `"en_cours"`. |
| 7.16 | Trouvez tous les utilisateurs ayant emprunté au moins un livre du genre `"Science-Fiction"`. |
| 7.17 | Calculez la durée totale (en jours) des emprunts pour chaque utilisateur. |
| 7.18 | Trouvez tous les livres qui ont été retournés en retard (`date_retour_reelle` > `date_retour_prevue`). |
| 7.19 | Trouvez tous les auteurs dont au moins un livre a une `note_moyenne` ≥ 4.5. |
| 7.20 | Trouvez tous les utilisateurs ayant emprunté des livres d'au moins 2 genres différents. |

### 🔹 8. Exercices sur les Tableaux et les Sous-Documents

| # | Requête |
|---|---|
| 8.1 | Trouvez tous les livres qui ont exactement 3 tags dans leur tableau `tags`. |
| 8.2 | Trouvez tous les livres dont le premier élément du tableau `tags` est `"Classique"`. |
| 8.3 | Ajoutez le tag `"Promotion"` à tous les livres du genre `"Roman"`. |
| 8.4 | Supprimez le tag `"Ancien"` de tous les livres qui l'ont dans leur tableau `tags`. |
| 8.5 | Trouvez tous les utilisateurs qui ont l'abonnement `"Numérique"` dans leur tableau `abonnements`. |
| 8.6 | Trouvez tous les utilisateurs qui ont au moins 2 abonnements dans leur tableau `abonnements`. |
| 8.7 | Trouvez tous les livres dont le `nombre_pages` est un nombre pair. |
| 8.8 | Trouvez tous les livres dont le titre contient au moins 3 mots (séparés par des espaces). |
| 8.9 | Trouvez tous les auteurs dont l'`annee_naissance` est comprise entre 1901 et 2000. |
| 8.10 | Mettez à jour la `note_moyenne` de tous les livres pour l'arrondir à l'entier le plus proche (ex : 4.6 → 5, 4.4 → 4). |

---

## 📌 Conseils pour MongoDB

| Opération | Syntaxe MongoDB |
|---|---|
| Sélection simple | `db.collection.find({ condition })` |
| Sélection avec projection | `db.collection.find({}, { champ1: 1, champ2: 1 })` |
| Tri | `db.collection.find().sort({ champ: 1 })` (1 = ASC, -1 = DESC) |
| Limite | `db.collection.find().limit(5)` |
| Compter | `db.collection.countDocuments({ condition })` |
| Moyenne | `db.collection.aggregate([{ $group: { _id: null, avg: { $avg: "$champ" } } }])` |
| Somme | `db.collection.aggregate([{ $group: { _id: "$champ", total: { $sum: 1 } } }])` |
| Filtrage dans un tableau | `db.collection.find({ tags: "Classique" })` |
| Filtrage avec taille de tableau | `db.collection.find({ $expr: { $eq: [{ $size: "$tags" }, 3] } })` |
| Mise à jour | `db.collection.updateMany({ condition }, { $set: { champ: valeur } })` |
| Incrémentation | `db.collection.updateMany({ condition }, { $inc: { champ: 1 } })` |
| Ajout à un tableau | `db.collection.updateMany({ condition }, { $push: { tags: "Nouveau" } })` |
| Suppression d'un élément de tableau | `db.collection.updateMany({ condition }, { $pull: { tags: "Ancien" } })` |
| Jointure | `db.collection.aggregate([{ $lookup: { from: "otherCollection", localField: "ref", foreignField: "_id", as: "joinedData" } }])` |
| Filtrage après jointure | `db.collection.aggregate([{ $lookup: { ... } }, { $unwind: "$joinedData" }, { $match: { "joinedData.champ": valeur } }])` |

---

## 🎯 Bonus : Indexation et Optimisation

Pour améliorer les performances des requêtes :

**Créez des index sur les champs fréquemment interrogés :**

```js
db.livres.createIndex({ titre: 1 });
db.livres.createIndex({ genre: 1 });
db.livres.createIndex({ disponible: 1 });
db.livres.createIndex({ auteur_id: 1 });
db.emprunts.createIndex({ livre_id: 1 });
db.emprunts.createIndex({ utilisateur_id: 1 });
db.emprunts.createIndex({ statut: 1 });
db.emprunts.createIndex({ date_emprunt: 1 });
```

**Utilisez des index composés pour les requêtes multi-critères :**

```js
db.livres.createIndex({ genre: 1, note_moyenne: -1 });
db.emprunts.createIndex({ utilisateur_id: 1, statut: 1 });
```

**Évitez les `$lookup` inutiles :** si possible, utilisez des références ou de l'embedding pour réduire les jointures.