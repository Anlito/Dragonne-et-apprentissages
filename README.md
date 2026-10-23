# Dragonne & découvertes

Première version de la PWA Android « Dragonne-et-apprentissages », pensée pour une enfant de 4 ans. Univers de papier découpé, dragonne chevalière et commandes visuelles avec voix française.

## Fonctionnement

- Les quatre activités de l’accueil sont jouables : lettres, memory des animaux, reconnaissance des chiffres et comptage d’objets ou de points sur un dé.
- Lettres majuscules A–Z et consigne vocale réécoutable. Le coin parent propose un niveau global : **Facile** (6 lettres), **Moyen** (13 lettres), **Difficile** (26 lettres). Facile est le réglage par défaut. Une grille compacte est utilisée à partir de 13 lettres.
- Le même profil définit le memory avec 4 / 8 / 16 paires (8 / 16 / 32 cartes), les chiffres avec 3 / 6 / 9 choix et le comptage de 1 à 3 / 6 / 9. Le tableau du coin parent expose ces valeurs.
- Comptage : une quantité exacte de pommes, étoiles, pierres précieuses ou fleurs en papier découpé apparaît. La voix demande combien il y en a, sans annoncer la réponse. Certaines questions présentent un dé avec 1 à 6 points ; les quantités 7 à 9 utilisent toujours des objets. Le haut-parleur répète la question. Le chiffre demandé ne se répète pas immédiatement.
- Comptage : pavé 1–2–3 / 4–5–6 / 7–8–9 stable, avec les choix 1 à 3, 1 à 6 ou 1 à 9 selon la difficulté. Une erreur retire seulement le mauvais chiffre et invite à recompter sans révéler la quantité. Points 10 / 5 / 1, bonus, sauvegarde et transitions sont partagés avec les autres activités.
- Chiffres : une voix française demande un chiffre de 1 à 9. Trois, six ou neuf choix distincts sont tirés selon la difficulté. La bonne réponse fait toujours partie des choix ; le chiffre demandé ne se répète pas immédiatement. Le pavé garde la disposition 1–2–3 / 4–5–6 / 7–8–9, avec des emplacements vides pour les chiffres non proposés. Le haut-parleur permet de réécouter.
- Chiffres : après une erreur, seul le mauvais choix disparaît sans déplacer les touches. Barème commun 10 / 5 / 1, bonus de série, étoiles sauvegardées, pause de réussite et transformations à chaque tranche de 300 points. Mise en page ajustée à la hauteur du téléphone, en portrait et paysage, avec texture de papier sur les touches.
- Memory : 16 animaux en papier découpé, choisis et mélangés à chaque partie. Toucher deux cartes ; une mauvaise paire reste visible 1,5 seconde puis se retourne. Les paires trouvées restent visibles à leur place. Aucun chronomètre ni limite de tentatives.
- Grille ajustée à la largeur et à la hauteur réellement disponibles, y compris les barres du navigateur Android : nombre de colonnes choisi automatiquement (4 ou 8 pour 32 cartes), hauteur de cartes flexible, marges compactes sur petits écrans et décor de bas de page masqué pendant le memory. Changer d’orientation recalcule la grille sans mélanger les animaux. Le panneau de fin se superpose à la grille pour ne pas créer de défilement.
- Memory : aucun commentaire vocal après une bonne ou mauvaise paire. Les retours visuels et le carillon de réussite sont conservés. La voix garde la consigne et le nom de l’animal lors de la première carte retournée, ainsi que l’annonce exceptionnelle d’une évolution.
- Memory : une mauvaise paire compte comme une faute. La paire trouvée suivante rapporte 10 étoiles sans faute depuis la dernière paire, 5 après une faute, 1 après deux fautes ou plus. Une erreur casse la série ; trois paires consécutives sans erreur donnent 5 étoiles bonus. La pause de réussite et les transformations de palier sont communes aux deux activités. Fin de partie avec total gagné et bouton illustré pour rejouer.
- Une partie de memory en cours n’est pas sauvegardée après fermeture ; les étoiles déjà gagnées sont conservées. Changer la difficulté relance une nouvelle grille en conservant les étoiles.
- Les anciens réglages sont migrés sans perdre les étoiles : 3 ou 6 lettres deviennent Facile ; l’alphabet complet devient Difficile. Le niveau global est sauvegardé sur l’appareil et appliqué immédiatement à la partie en cours.
- Erreurs sans retrait de points. Chaque erreur retire le choix incorrect ; les autres lettres ou chiffres restent à leur place pour conserver les repères visuels. La bonne réponse reste toujours disponible. Les choix reviennent à la question suivante.
- Récompense selon les erreurs de la question : 10 étoiles sans faute, 5 après une faute, 1 après deux fautes ou plus. Les points déjà acquis ne sont jamais retirés. Le compteur d’erreurs revient à zéro à chaque question.
- Bonus de 5 étoiles toutes les trois réponses consécutives sans faute. Une faute remet la série à zéro ; une réponse trouvée avec aide ne démarre pas une série.
- Après chaque question réussie : pause de 2,2 secondes avec un petit panneau Bravo et le gain exact (bonus inclus), étoiles en papier, petit bond de la dragonne puis fondu de 0,3 seconde vers la question suivante. Les réponses sont verrouillées pendant cette pause. Le retour à l’accueil annule la transition. Le coin parent ouvert retarde la suite ; le réglage « Animations et transitions » et la préférence système de mouvement réduit désactivent les effets tout en conservant la pause.
- Si la réponse déclenche une évolution, la pause de réussite précède la transformation spéciale du personnage.
- Un palier par tranche de 300 étoiles, jusqu’à 15 apparences. Animation de transformation avec étoiles, carillon et nouvel équipement ; toucher pour continuer. Prévisualisation dans le coin parent.
- Le coin parent affiche les 15 seuils cumulés (0, 300, 600… 4 200 étoiles), le palier actuel et les étoiles restantes avant l’évolution suivante. Depuis zéro, le palier 15 demande 360 réponses parfaites avec bonus, 840 questions à une faute chacune ou 4 200 à deux fautes ou plus chacune. Les seuils ont été triplés. Les étoiles acquises sont conservées ; le palier et la jauge sont recalculés selon les nouveaux seuils.
- Progression et réglages conservés dans le stockage du navigateur sur l’appareil. Aucun compte ni transfert de progression.
- Mise en page portrait et paysage, téléphone et tablette. Cache hors connexion après un premier chargement réussi. Installation Android depuis le menu du navigateur.
- Actualisation PWA : en ligne, les ressources sont récupérées sur le réseau et rafraîchissent le cache ; hors connexion, la copie enregistrée prend le relais. Le préchargement d’une nouvelle version contourne le cache HTTP pour éviter de conserver une ancienne échelle de progression.
- Coin parent derrière un petit calcul ; il évite les ouvertures accidentelles mais ne constitue pas un contrôle de sécurité.
- Coin parent : bouton « Remettre la progression à zéro » suivi d’une confirmation et d’un bouton Annuler. Remet les étoiles à 0, le palier à 1 et recommence une éventuelle partie en cours. La difficulté, le son et les animations restent conservés. Action locale à l’appareil ; la suppression confirmée est définitive.

## Modifier le projet

Application statique sans dépendance de production ni étape de compilation.

- `index.html` : écrans et textes.
- `style.css` : mise en page, couleurs, animations et affichage adaptatif.
- `app.js` : voix, interactions, sauvegarde et réglages.
- `engine.mjs` : tirage des lettres, points et paliers.
- `memory.mjs` : création des grilles, retournement, comparaisons et fin de partie du memory.
- `counting.mjs` : quantités, choix des objets, consignes et disposition exacte des points du dé.
- `assets/` : planches approuvées et icônes. Les personnages utilisent pour l’instant la planche de conception comme atlas CSS, à remplacer par des images transparentes séparées pour la finition.
- `manifest.webmanifest`, `sw.js` : installation et cache PWA. Incrémenter la version du cache à chaque modification publiée des ressources.
- `.github/workflows/pages.yml` : publication automatique de la branche `main` avec GitHub Pages.

Pour tester, servir ce dossier avec un serveur HTTP local ; ne pas ouvrir simplement le fichier HTML. Par exemple : `npx http-server . -p 4173`. Les services PWA nécessitent HTTPS ou localhost.

## Vérification

`node check.mjs` vérifie les tirages (600 questions), les bonus, les seuils et la limite des 15 paliers. `node --check app.js` et `node --check sw.js` vérifient la syntaxe.

Chiffres : 600 tirages supplémentaires vérifient les trois difficultés, le nombre de choix, l’absence de doublons, la présence de la cible, les valeurs entre 1 et 9, l’ordre numérique et l’absence de répétition immédiate.

`node check-counting.mjs` vérifie 900 questions avec générateur déterministe : quantités dans la difficulté, présence de la bonne réponse, choix numériques, absence de répétition immédiate, consignes sans réponse et six faces de dé avec le nombre exact de points. Tous les objets et les deux types de question sont couverts.

Vérifications navigateur du comptage : trois fleurs visibles pour une question à 3, retrait du choix 1 sans changer les objets, gain de +5 après une erreur, pause et question suivante, dé à deux points, choix 3 / 6 / 9 selon la difficulté, bonus de série, neuf pommes visibles sur écran 320 × 568, absence de défilement aussi en 360 × 640 et 844 × 390. Retour à la reconnaissance des chiffres avec le panneau d’objets bien masqué. Tous les gains de test sont limités à localhost.

`assets/objets.png` : atlas 2 × 2 créé avec l’outil de génération d’images intégré, une pomme rouge, une étoile dorée, une pierre mauve et une fleur jaune, centrées sur fond crème et en papier découpé texturé. Les objets sont répétés individuellement en nombre exact dans l’application.

Vérifications navigateur des chiffres : 9 choix en Difficile, 6 en Moyen, 3 en Facile ; disparition d’un choix incorrect ; gain de +1 après plusieurs erreurs ; pause et question suivante avec tous les choix rétablis. Aucun défilement en 360 × 640, 320 × 568 et 844 × 390. Retour aux lettres (6 choix) et au memory (8 cartes) vérifié. La qualité et la disponibilité de la voix française doivent être confirmées sur l’Android cible.

Remise à zéro : ouverture de la confirmation et annulation vérifiées dans le navigateur ; les 82 étoiles de test restent présentes après Annuler. Aucune progression publique n’a été effacée pendant ces vérifications.

`node check-memory.mjs` vérifie les 3 tailles sur 150 grilles, exactement deux cartes par animal, les doubles clics, le blocage d’une troisième carte, le retournement après erreur, le barème après aide et la fin d’une partie complète.

Adaptation à l’écran vérifiée automatiquement pour 8 / 16 / 32 cartes dans quatre formats. Dans le navigateur : 32 cartes sans défilement en 360 × 640, 320 × 568 et 844 × 390 ; dimensions de page égales à celles de l’écran, dernière ligne visible et passage à huit colonnes en paysage. Retour à l’accueil vérifié, sans conserver le mode plein écran de la grille.

Vérifications navigateur du memory : partie de 4 paires terminée, 36 étoiles gagnées après deux erreurs puis trois paires sans erreur (1 + 10 + 10 + 15), pause de réussite, cartes conservées à leur place, bouton Encore avec nouvelle grille, difficultés à 8 / 16 / 32 cartes et vues portrait 390 × 844 / paysage 844 × 390. Aucun score de test n’a été ajouté sur le site public : les parties de vérification utilisent uniquement localhost.

Visuels : `assets/animaux.png` est une planche 4 × 4 créée avec l’outil de génération d’images intégré. Direction : 16 animaux distincts centrés dans des cases régulières, papier découpé texturé, couleurs douces, fond crème, aucun texte. Ordre des animaux défini dans `memory.mjs`.

Transitions vérifiées dans le navigateur : panneau visible avec un gain de +5 puis +10 selon les fautes, arrivée automatique de la question suivante après la pause et panneau masqué immédiatement lors du retour à l’accueil. Les vérifications des points et paliers continuent de passer.

Barème 10/5/1 : vérifications automatiques de zéro, une, deux et plusieurs fautes, exclusion du bonus après aide, franchissement d’un palier avec un seul point, limites des 15 seuils et parcours de 360 réponses parfaites jusqu’à 4 200 points. L’interface utilise la récompense calculée pour afficher le nombre exact d’étoiles gagnées.

Mise à jour des difficultés : profils 6 / 13 / 26 lettres et migration des anciens réglages vérifiés automatiquement. Dans le navigateur, le niveau Moyen affiche 13 boutons, Difficile en affiche 26, et le niveau Difficile ainsi que les 30 étoiles existantes sont conservés après rechargement. Le changement de difficulté en cours de partie remplace immédiatement la question.

Vérifications réalisées dans le navigateur : accueil et jeu en portrait 390 × 844 et paysage 844 × 390, accueil sur écran large 1280 × 720, attribution des étoiles, retrait du choix incorrect sans perte de points, conservation de la progression après rechargement, calcul d’accès au coin parent et prévisualisation de transformation. Les changements d’écran reviennent en haut de page. Le bon fonctionnement de la voix réelle et de l’installation doit être confirmé sur le téléphone Android cible.

Dépôt : https://github.com/Anlito/Dragonne-et-apprentissages. Hébergement prévu : https://anlito.github.io/Dragonne-et-apprentissages/. GitHub Pages est configuré pour GitHub Actions ; chaque envoi sur `main` lance le déploiement. Ce dossier est le dépôt local de référence de cette première version.

## Suite

Développer l’atelier photo. Finaliser les personnages transparents, les voix hors connexion et vérifier les petits écrans ainsi que les orientations sur appareils réels. Aucune caméra n’est activée dans cette version.

La synthèse vocale utilise les voix françaises disponibles dans le navigateur ; sa disponibilité hors connexion dépend du système. Le mode muet désactive les consignes parlées : réactiver la voix pour l’exercice d’écoute.
