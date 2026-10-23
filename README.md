# Dragonne & découvertes

Première version de la PWA Android « Dragonne-et-apprentissages », pensée pour une enfant de 4 ans. Univers de papier découpé, dragonne chevalière et commandes visuelles avec voix française.

## Fonctionnement

- Accueil avec les quatre activités illustrées. Seul le jeu des lettres est jouable à cette étape ; memory, chiffres et quantités sont annoncés comme à venir.
- Lettres majuscules A–Z, consigne vocale réécoutable, trois choix par défaut. Le coin parent propose aussi six choix et l’alphabet complet.
- Erreurs sans retrait de points. Chaque erreur retire le choix incorrect ; les autres lettres restent à leur place pour conserver les repères visuels. La bonne réponse reste toujours disponible. Les choix reviennent à la question suivante. Ce principe sera repris pour les chiffres.
- 10 étoiles par bonne réponse et 5 étoiles bonus toutes les trois bonnes réponses consécutives. Une erreur remet uniquement la série à zéro.
- Un palier par tranche de 100 étoiles, jusqu’à 15 apparences. Animation de transformation avec étoiles, carillon et nouvel équipement ; toucher pour continuer. Prévisualisation dans le coin parent.
- Progression et réglages conservés dans le stockage du navigateur sur l’appareil. Aucun compte ni transfert de progression.
- Mise en page portrait et paysage, téléphone et tablette. Cache hors connexion après un premier chargement réussi. Installation Android depuis le menu du navigateur.
- Coin parent derrière un petit calcul ; il évite les ouvertures accidentelles mais ne constitue pas un contrôle de sécurité.

## Modifier le projet

Application statique sans dépendance de production ni étape de compilation.

- `index.html` : écrans et textes.
- `style.css` : mise en page, couleurs, animations et affichage adaptatif.
- `app.js` : voix, interactions, sauvegarde et réglages.
- `engine.mjs` : tirage des lettres, points et paliers.
- `assets/` : planches approuvées et icônes. Les personnages utilisent pour l’instant la planche de conception comme atlas CSS, à remplacer par des images transparentes séparées pour la finition.
- `manifest.webmanifest`, `sw.js` : installation et cache PWA. Incrémenter la version du cache à chaque modification publiée des ressources.
- `.github/workflows/pages.yml` : publication automatique de la branche `main` avec GitHub Pages.

Pour tester, servir ce dossier avec un serveur HTTP local ; ne pas ouvrir simplement le fichier HTML. Par exemple : `npx http-server . -p 4173`. Les services PWA nécessitent HTTPS ou localhost.

## Vérification

`node check.mjs` vérifie les tirages (600 questions), les bonus, les seuils et la limite des 15 paliers. `node --check app.js` et `node --check sw.js` vérifient la syntaxe.

Vérifications réalisées dans le navigateur : accueil et jeu en portrait 390 × 844, accueil en paysage 844 × 390 et écran large 1280 × 720, attribution des étoiles, retrait du choix incorrect sans perte de points, conservation de la progression après rechargement, calcul d’accès au coin parent et prévisualisation de transformation. Le bon fonctionnement de la voix réelle et de l’installation doit être confirmé sur le téléphone Android cible.

Dépôt : https://github.com/Anlito/Dragonne-et-apprentissages. Hébergement prévu : https://anlito.github.io/Dragonne-et-apprentissages/. GitHub Pages est configuré pour GitHub Actions ; chaque envoi sur `main` lance le déploiement. Ce dossier est le dépôt local de référence de cette première version.

## Suite

Développer memory, reconnaissance des chiffres, quantités puis atelier photo. Finaliser les personnages transparents, les voix hors connexion et vérifier les petits écrans ainsi que les orientations sur appareils réels. Aucune caméra n’est activée dans cette version.

La synthèse vocale utilise les voix françaises disponibles dans le navigateur ; sa disponibilité hors connexion dépend du système. Le mode muet désactive les consignes parlées : réactiver la voix pour l’exercice d’écoute.
