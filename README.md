# Dragons & découvertes

Première version de la PWA Android « Dragonne-et-apprentissages », pensée pour une enfant de 4 ans. Univers de papier découpé, dragonne chevalière et commandes visuelles avec voix française.

## Fonctionnement

- Les douze activités de l’accueil sont jouables : quatre jeux initiaux, six jeux de lecture et deux jeux de mathématiques, tous activables par profil dans le coin parent.
- Lettres majuscules A–Z et consigne vocale réécoutable. Le coin parent propose un niveau global : **Facile** (6 lettres), **Moyen** (13 lettres), **Difficile** (26 lettres). Facile est le réglage par défaut. Une grille compacte est utilisée à partir de 13 lettres.
- Le même profil définit le memory avec 4 / 8 / 16 paires (8 / 16 / 32 cartes), les chiffres avec 3 / 6 / 9 choix et le comptage de 1 à 9 à tous les niveaux, avec 3 / 6 / 9 réponses proposées. Le tableau du coin parent expose ces valeurs.
- Comptage : une quantité exacte de pommes, étoiles, pierres précieuses ou fleurs en papier découpé apparaît. La voix demande combien il y en a, sans annoncer la réponse. Certaines questions présentent un dé avec 1 à 6 points ; les quantités 7 à 9 utilisent toujours des objets. Le haut-parleur répète la question. Le chiffre demandé ne se répète pas immédiatement.
- Comptage : 3 réponses avec doigts seuls en Facile, 6 avec doigts et chiffre en Moyen, 9 chiffres seuls en Difficile. Les objets vont toujours de 1 à 9 ; la bonne réponse est incluse et les autres propositions sont distinctes. Les positions non proposées restent vides. Une erreur retire seulement le mauvais chiffre et invite à recompter sans révéler la quantité. Points 10 / 5 / 1, bonus, sauvegarde et transitions sont partagés avec les autres activités.
- Chiffres : une voix française demande un chiffre de 1 à 9. Trois, six ou neuf choix distincts sont tirés selon la difficulté. La bonne réponse fait toujours partie des choix ; le chiffre demandé ne se répète pas immédiatement. Facile montre 3 réponses en doigts uniquement ; Moyen montre 6 réponses avec doigts et chiffre ; Difficile montre les 9 chiffres dans le pavé habituel. Le haut-parleur permet de réécouter.
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
- La fenêtre d’évolution attend à la fois sa durée visuelle minimale (3,4 secondes, ou 1,4 seconde sans animations) et la fin réelle de la phrase, avec 0,35 seconde de respiration. Elle ne coupe plus la voix en démarrant la question suivante. Sans voix disponible ou en cas d’erreur vocale, la durée minimale suffit. Un toucher permet toujours de continuer ; les anciens événements vocaux ne peuvent pas fermer une nouvelle fenêtre.
- Le coin parent affiche les 15 seuils cumulés (0, 300, 600… 4 200 étoiles), le palier actuel et les étoiles restantes avant l’évolution suivante. Depuis zéro, le palier 15 demande 360 réponses parfaites avec bonus, 840 questions à une faute chacune ou 4 200 à deux fautes ou plus chacune. Les seuils ont été triplés. Les étoiles acquises sont conservées ; le palier et la jauge sont recalculés selon les nouveaux seuils.
- Progression et réglages conservés dans le stockage du navigateur sur l’appareil. Aucun compte ni synchronisation automatique.
- Transfert manuel entre appareils : dans le coin parent, « Points de départ » permet de saisir le total de l’autre téléphone. Exemple : 312 étoiles redonnent le palier 2, son apparence et 12/300 dans la jauge. Aperçu avant application et validation des entiers positifs ou nuls. La partie en cours recommence ; les réglages locaux restent conservés. Il n’y a pas de synchronisation automatique entre téléphones.
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
- `evolution.mjs` : synchronisation entre animation d’évolution et fin de la voix.
- `assets/` : planches approuvées et icônes. Les personnages utilisent pour l’instant la planche de conception comme atlas CSS, à remplacer par des images transparentes séparées pour la finition.
- `manifest.webmanifest`, `sw.js` : installation et cache PWA. Incrémenter la version du cache à chaque modification publiée des ressources.
- `.github/workflows/pages.yml` : publication automatique de la branche `main` avec GitHub Pages.

Pour tester, servir ce dossier avec un serveur HTTP local ; ne pas ouvrir simplement le fichier HTML. Par exemple : `npx http-server . -p 4173`. Les services PWA nécessitent HTTPS ou localhost.

## Vérification

`node check.mjs` vérifie les tirages (600 questions), les bonus, les seuils et la limite des 15 paliers. `node --check app.js` et `node --check sw.js` vérifient la syntaxe.

`node check-evolution.mjs` vérifie avec une horloge simulée une voix plus longue que 6,5 secondes, une voix courte, l’absence de voix, la durée visuelle minimale, la fermeture manuelle et les événements vocaux tardifs ou répétés.

Transfert de points vérifié dans le navigateur, uniquement sur localhost : saisie de 312, aperçu du palier 2, application, 288 étoiles restantes avant le palier 3, puis conservation des 312 points et de l’apparence après rechargement. Les valeurs vides, négatives, décimales ou hors entier sûr sont rejetées par les tests automatiques. La difficulté et les autres réglages sont conservés.

Comptage révisé : les 900 tirages couvrent toutes les quantités 1 à 9 pour chaque difficulté, avec exactement 3 / 6 / 9 réponses. Dans le navigateur, Facile a bien présenté un dé à six points avec seulement trois propositions, dont le chiffre 6.

Chiffres : 600 tirages supplémentaires vérifient les trois difficultés, le nombre de choix, l’absence de doublons, la présence de la cible, les valeurs entre 1 et 9, l’ordre numérique et l’absence de répétition immédiate.

`node check-counting.mjs` vérifie 900 questions avec générateur déterministe : toutes les quantités 1 à 9 dans chaque difficulté, présence de la bonne réponse, choix numériques, absence de répétition immédiate, consignes sans réponse et six faces de dé avec le nombre exact de points. Tous les objets et les deux types de question sont couverts.

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

## Deux profils et réponses en doigts

- Choix visuel Dragonne / Dragon à chaque ouverture et changement via le portrait de l’en-tête. Chaque enfant possède ses points, son évolution parmi 15 apparences, sa difficulté, son et animations.
- Migration automatique de la sauvegarde historique vers Dragonne ; Dragon démarre à zéro en Facile. Les deux profils restent locaux à cet appareil, sans connexion ni synchronisation cloud. La saisie manuelle des points et la remise à zéro concernent uniquement le profil sélectionné dans le coin parent.
- Chiffres et Je compte : Facile = 3 mains sans chiffres ; Moyen = 6 mains avec chiffres ; Difficile = 9 chiffres seuls. Les nombres vont toujours de 1 à 9. De 6 à 9, deux mains montrent 5 + les doigts restants. Les mauvaises réponses disparaissent sans déplacer les autres.
- Mains illustrées en papier dans `assets/mains-papier.png`, assemblées par `hands.mjs` : cinq poses contrôlées (1 pouce, 2 en V, 3, 4, 5), puis 5 + le complément pour 6–9. Atlas du dragon bleu et or dans `assets/dragon.png`, généré à partir de la dragonne comme référence de style papier découpé, même grille de 15 évolutions.
- Sauvegarde : `profiles.mjs`, clé `dragonne-profiles-v1`. L’ancienne clé reste intacte. Cache PWA v18 incluant les nouveaux modules et le dragon.
- Vérifications : suites moteur, memory, comptage, évolution, migration et indépendance des profils, exactitude de 1 à 9 doigts ; contrôle visuel téléphone des deux représentations, changement de profil et persistance après rechargement.

## Portrait agrandi du compagnon

Toucher le compagnon sur l’accueil ou dans les jeux ouvre un portrait en grand de son apparence actuelle, avec son palier et ses points. Fermeture par grande croix, Échap ou fond extérieur. La pause entre questions attend la fermeture du portrait. Le bouton de changement de profil conserve son rôle.

Mains : nouvelle illustration générée avec l’outil intégré, puis corrigée et contrôlée visuellement pose par pose. Prompt : « cinq mains en papier découpé texturé, peau pêche, poignets vert sauge, fond transparent, 1 / 2 / 3 / 4 / 5 doigts levés, aucune inscription ». Source de production : `assets/mains-papier.png`. Vérification des combinaisons 1–9 et de l’affichage portrait/paysage ; points et sauvegardes inchangés.

## Activités visibles par enfant

Publication : nom unique par exécution et tentative pour l’archive GitHub Pages, afin d’éviter les doublons lors d’une relance après une erreur serveur.

Dans le coin parent, choisir Dragonne ou Dragon puis cocher les activités à afficher. Enregistrement immédiat par profil dans la sauvegarde existante ; étoiles, difficulté et apparence conservées. Les anciennes sauvegardes affichent les quatre activités par défaut. Masquer le jeu ouvert ramène à l’accueil et annule ses transitions. Si tous les jeux sont masqués, un panneau invite à les choisir dans le coin parent ; les réglages restent accessibles.

La liste commune se trouve dans `activities.mjs` (identifiant stable, bouton d’accueil, nom, illustration). Pour ajouter un jeu, y ajouter son entrée et son écran/bouton/gestionnaire dans l’application. La liste parent et la normalisation des sauvegardes incluront automatiquement cette nouvelle activité, visible par défaut. Ne pas réutiliser l’identifiant d’un ancien jeu. Cache PWA v19.

Vérifications : migration sans perte des points, booléens de visibilité, indépendance entre enfants, sauvegarde et restauration, cas tous masqués. Dans le navigateur sur localhost : deux jeux masqués pour Dragonne après rechargement, quatre jeux toujours visibles pour Dragon, retour à l’accueil après masquage du jeu ouvert, panneau sans activité et réactivation. Aucun réglage de test modifié sur le site public.

## Six activités de lecture (5 à 10)

1. **Les sons** : écouter un son contextualisé avec un mot exemple, puis choisir sa graphie. Les écritures équivalentes d’un même groupe ne sont pas proposées comme mauvaises réponses (au/eau, an/en…). Le ch de chat et le ch de chorale sont distingués par le son et le contexte.
2. **J’écoute et je complète** : écouter le mot et compléter une partie manquante. Facile travaille b/d/p/q ; les niveaux suivants ajoutent les graphèmes et des distracteurs.
3. **Les morceaux du mot** : compléter le groupe de lettres d’un mot visible, avec écoute facultative (par exemple bat… + eau).
4. **J’écoute un mot** : choisir le mot écrit correspondant à celui entendu.
5. **Je relie** : écouter trois boutons puis associer chacun à son mot. Les numéros et les liens colorés gardent les associations visibles. Une erreur retire un choix uniquement pour l’audio sélectionné ; il reste disponible pour les autres. Récompense à la fin des trois associations.
6. **Le mot en morceaux** : écouter puis sélectionner les morceaux dans l’ordre. Exemple cha + peau ; distracteurs comme fa, deau, coin, bou. Possibilité de retirer le dernier morceau. Une mauvaise proposition disparaît pour l’étape en cours et revient à la suivante si nécessaire. Récompense une fois le mot entier terminé.

Difficulté par profil : 3 / 4 / 6 propositions pour les jeux de lecture simples, toujours 3 mots pour Je relie, et 4 / 6 / 8 morceaux pour la construction. Le vocabulaire complexe et les mots plus longs deviennent disponibles aux niveaux supérieurs. Même barème 10 / 5 / 1, bonus, pauses, sauvegarde et évolution ; aucune attribution de points pour un morceau ou une association intermédiaire.

### Contenus, origine et voix

`reading.mjs` contient les familles de sons, exemples, mots masqués et découpages écrits. La source des familles est le fichier utilisateur « liste moi Les sons complexes et les graphèmes mul....xlsx », feuille « liste moi Les sons complexes et », A1:C18. Le fichier original reste inchangé et n’est pas publié. Les graphies sont regroupées par son pour éviter les réponses ambiguës ; œu est la typographie usuelle de oeu. Les contextes gu/ge/ch sont explicités. Les transcriptions API du document ne sont pas lues par la voix.

La synthèse vocale française du téléphone est utilisée, avec un mot exemple pour les sons. Certains groupes complexes sont donnés dans leur mot exemple plutôt qu’isolés, car la voix du navigateur ne garantit pas la lecture d’un phonème seul. Les morceaux sont des segments écrits du mot, pas une transcription phonétique. Le haut-parleur permet de réécouter ; la disponibilité hors connexion dépend des voix installées sur l’appareil. Un enregistrement humain de chaque son isolé reste une amélioration possible.

`assets/lecture.png` : atlas 3 × 2 généré par l’outil intégré, avec une correction du visuel bat + eau. Prompt : six pictogrammes de lecture en papier découpé texturé, haut-parleur et graphèmes, casque et mot incomplet, crayon et bat…/eau, écoute et choix de mots, trois audios reliés à trois cartes, puzzle cha/peau et chapeau. Couleurs sauge/lavande/abricot, fond crème et marges de sécurité.

### Vérifications de cette version

`node check-reading.mjs` : 4 320 tours déterministes sur les six jeux et les trois niveaux ; tous les graphèmes couverts, options sans doublons, présence de la cible, absence de variantes équivalentes parmi les distracteurs, reconstitution exacte des mots, mauvais ordre, doubles clics, associations et récompense limitée au tour complet. Les tests de profils couvrent la migration et l’ajout des six jeux sans perdre les choix précédents. Cache PWA v20 précharge le module et l’atlas.

Navigateur sur localhost : les six écrans ouverts, q après erreur sur p (+5), chap… + eau (+10), trois associations (+5 après une erreur), ma + man (+10), retrait/reprise du dernier morceau, trois puis six propositions, huit morceaux sans défilement en 320 × 568 et 740 × 360 après ajustement, et retour au pavé des neuf chiffres après Je relie. Les voix réellement installées sur les téléphones restent à valider à l’oreille sur les appareils cibles. Aucun score public modifié pour les tests.

## Profils d’enfants et quatre compagnons

L’écran de départ affiche les enfants existants avec leur prénom sur le portrait de leur dragon au palier actuel, puis le bouton Ajouter un enfant. Premier lancement neuf : aucun compte prédéfini ; création par prénom et choix du dragon. Plusieurs enfants peuvent choisir le même compagnon, chacun avec sa progression indépendante.

Quatre compagnons disponibles, chacun avec 15 étapes : Dragonne des feuilles, Dragon azur, Braise (rouge corail, crête bordeaux, équipement cuivré) et Soleil (jaune doré, cape turquoise, emblèmes solaires). Les nouveaux atlas suivent la grille 5 × 3 et le style de papier découpé des personnages existants.

Coin parent : liste des prénoms, Ajouter un enfant et Modifier ce profil (prénom et compagnon). Changer de dragon ne remet jamais les points à zéro : son apparence est recalculée à partir du score existant. Activités visibles, difficulté, sons, animations, points manuels et remise à zéro restent attachés à l’identifiant de l’enfant, indépendamment du prénom et du dragon. La création démarre à zéro, en Facile, avec tous les jeux visibles. Pas de suppression de profil dans cette version.

Migration locale : nouvelle clé `dragonne-profiles-v2`. Les anciennes clés v1 restent intactes. Les deux anciens comptes sont importés avec leurs points et réglages ; à leur première sélection, un prénom est demandé. Une installation issue de l’ancienne sauvegarde unique importe uniquement cette progression. Aucun ancien compte n’est recréé sur une nouvelle installation. Prénoms limités à 24 caractères ; en cas de doublon, ajouter une initiale. Aucun prénom n’est envoyé au serveur, et il n’y a toujours pas de synchronisation entre appareils.

Sources à modifier : `profiles.mjs` (registre DRAGONS, création, édition, migration), `app.js` (sélecteur, formulaire et sélection parent), `index.html` et `style.css` (portraits, prénom superposé, formulaire et mise en page). Cache PWA v21.

Visuels générés avec l’outil intégré, référence : l’atlas du dragon azur. Assets de production : `assets/dragon-braise.png` et `assets/dragon-soleil.png`. Prompts : même dragon chevalier adorable en papier découpé texturé, atlas 5 × 3 de quinze évolutions avec équipement progressif, fond crème, aucun texte ni numéro ; variante rouge corail/crête bordeaux/cape cuivrée/emblème braise et variante jaune soleil/cape turquoise/emblème solaire. Les sorties originales générées restent conservées.

Vérifications : tests de migration depuis les deux formats historiques, premier lancement vide, création de plusieurs enfants avec un même dragon, modification sans perte de points/réglages, doublons et restauration après rechargement. Navigateur sur localhost : prénom donné au profil existant en conservant 347 points et ses activités masquées ; création à zéro avec Braise ; saisie de 612 points et Moyen, masquage des Sons, puis changement de prénom et passage à Soleil avec conservation de tous ces réglages ; refus d’un prénom déjà utilisé ; retour à la liste nominative après rechargement. Autre origine de test vierge : aucun compte automatique, première création réussie et portrait agrandi. Vue portrait du formulaire et des cartes, vue paysage et portrait du dragon vérifiées. Aucun compte ni point public modifié pour les essais.

## Correction des récompenses, niveaux par jeu et mathématiques

La validation des lectures était interrompue par une sélection d’un seul élément utilisée comme une liste de boutons. La boucle a été corrigée : verrouillage, gain 10/5/1 et bonus, sauvegarde, pause de réussite puis nouvelle question reprennent normalement. `check-reward-ui.mjs` exécute le vrai gestionnaire de validation de l’application avec un DOM minimal et vérifie le gain, la sauvegarde, le callback de suite, le palier et l’absence de double récompense. Ce test reproduit la panne avant correction. Les deux jeux de maths réutilisent ce même gestionnaire.

Écoute et relie : consigne parlée et écrite « Écoute le son 1, 2 ou 3 et relie-le au bon mot. » Boutons Son 1/2/3. Les trois associations conservent une récompense commune en fin de tour.

### Difficulté par enfant et par activité

Dans le coin parent, chaque jeu de lecture et chaque jeu de maths dispose d’un choix Niveau du profil / Facile / Moyen / Difficile. Les réglages sont stockés dans `activityLevels` pour l’enfant sélectionné. Une valeur absente reprend le niveau général ; modifier ce niveau général ne supprime pas les choix propres aux activités. Aucun changement de points, prénom, compagnon ou visibilité. Les anciennes sauvegardes reçoivent un dictionnaire vide et gardent leur comportement.

Lecture : 3/4/6 réponses ; les mots en morceaux ont désormais exactement 2/3/4 morceaux corrects et 4/6/8 propositions selon le niveau. Je relie reste à trois mots : le niveau Difficile rapproche les mots par leurs débuts ou terminaisons pour travailler la discrimination. Les sons et graphèmes complexes deviennent disponibles aux niveaux supérieurs.

### Les calculs + et −

Facile : deux nombres et valeurs 0 à 10 ; Moyen : trois nombres et valeurs 0 à 20 ; Difficile : trois ou quatre nombres et valeurs 0 à 100. Les termes et chaque résultat intermédiaire sont entiers et non négatifs. Les tours alternent résultat à trouver, un nombre à compléter dans l’expression, et résultat à placer sur une jauge graduée. Propositions : 3/4/6.

La jauge va de 0 à la limite du niveau, avec pas de 1, curseur tactile/clavier, valeur sélectionnée visible et bouton Valider. Une mauvaise position ne retire pas de points ; elle compte comme une faute. Valider plusieurs fois la même mauvaise position ne rajoute pas de faute. La récompense et l’évolution arrivent après la bonne réponse, puis le calcul suivant est proposé automatiquement.

### Les multiplications

Au lancement, choix d’une table de 1 à 10. Facile : multiplicateurs 1–5 et 3 réponses. Moyen : 0–10 et 4 réponses. Difficile : 0–10 et 6 réponses, avec d’autres produits de la même table parmi les distracteurs. Le multiplicateur ne se répète pas immédiatement. Le bouton Changer de table permet de revenir au choix sans perdre les points ; une nouvelle série commence.

### Fichiers, visuels et vérifications

`maths.mjs` : génération des expressions, trous, choix et multiplications. `app.js` : interface, validation et curseur. `activities.mjs` : registre des douze activités et normalisation des niveaux. `profiles.mjs` : conservation des niveaux par enfant. Cache PWA v22, incluant le module et le nouvel atlas.

`assets/maths.png` : deux pictogrammes créés par l’outil intégré, papier découpé sauge/lavande/abricot, fond crème. Prompt : signes + et −, cartes 3/2/5 et jauge à étoile ; multiplication ×, trois rangées de quatre étoiles et cartes 3/4/12. Les illustrations sont décoratives ; les valeurs exactes des exercices sont affichées par le code.

Tests : 4 020 calculs couvrant les trois modes et niveaux, limites et intermédiaires non négatifs, présence et unicité de la bonne réponse, dix tables et multiplicateur différent du précédent. Test du gestionnaire de récompense réel et tests de sauvegarde des difficultés distinctes entre enfants. Les suites de lecture, profils, progression et évolution continuent de passer.

Navigateur, seulement sur localhost : une lecture validée fait passer 612 à 622 points et la question change ; 9−1+3 donne 11 (+10), 8−?+3=7 accepte 4 (+10), jauge 2−1+12 : erreur à 0 puis 13 (+5), table de 7 choisie et 7×2=14 (+10). Après rechargement, lecture en Facile et multiplication en Difficile restent distinctes pour le même enfant. Six réponses de multiplication tiennent sans défilement en 320×568 et en paysage ; réglage de la jauge au clavier vérifié. Les données publiques restent intactes.
