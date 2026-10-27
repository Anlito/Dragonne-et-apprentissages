# Dragons & découvertes

Première version de la PWA Android « Dragonne-et-apprentissages », pensée pour une enfant de 4 ans. Univers de papier découpé, dragonne chevalière et commandes visuelles avec voix française.

## Fonctionnement

### 27 octobre 2026 — Formes progressives (v39)

Les formes proposent trois niveaux : facile, reconnaître une forme parmi trois dessins de couleurs et tailles variées ; moyen, reconnaître forme et couleur parmi quatre propositions ; difficile, reconnaître forme, couleur et taille parmi six propositions. Les consignes vocales et le haut-parleur décrivent les critères demandés. Le rectangle rejoint les six formes initiales aux niveaux moyen et difficile, avec des voisins proches (rond/ovale, carré/rectangle, triangle/losange). Chaque question possède une seule réponse correcte ; les distracteurs comprennent la même forme dans une autre couleur et, au niveau difficile, la même forme et couleur dans l’autre taille. Petit et grand utilisent deux échelles fixes dans des cartes identiques, sans indice dans le texte visible. Les 56 combinaisons forme/couleur/taille et leurs propositions sont générées, avec un historique évitant les répétitions récentes. La grille utilise trois colonnes (deux au niveau moyen), adaptée au portrait et au paysage.

La difficulté propre à chaque enfant, l’aperçu parent, le défi de 20, la suppression d’un mauvais choix et les points 10/5/1 avec bonus sont conservés. Les formes cachées restent une prochaine variante. Sources : preschool.mjs (formes, couleurs, consignes et génération), app.js (rendu et difficulté), style.css (grille). Vérifications : check-preschool.mjs dont 1 500 questions ciblant l’unicité de réponse et les critères proches, contrôles du défi et des nouvelles activités, syntaxe et aperçu navigateur. Cache PWA v39.

### 27 octobre 2026 — Défi toujours en première position (v38)

« Mon défi · 20 exercices » reste le premier bloc de l’accueil, avant les couleurs et les autres jeux. L’ordre est fixé dans index.html et activities.mjs, puis garanti à chaque affichage par renderActivities dans app.js. Le réglage parent permettant de masquer le défi reste respecté. parents.html est resynchronisée avec le modèle d’accueil ; le cache PWA passe en v38. Vérifications : ordre initial et registre, synchronisation de la page parents et syntaxe JavaScript. Aucun changement des points ni des sauvegardes.

### 26 octobre 2026 — Banque 100, observation 10 s, couleurs et page parent (v37)

La page parents.html remplace la fenêtre de réglages depuis le bouton cadenas. Elle conserve la petite vérification de calcul, puis organise les contrôles en quatre rubriques : Activités et aperçus, Défi de 20, Progression, Réglages. Le profil à régler reste visible en haut. Un sélecteur permet de se concentrer sur un seul jeu au lieu de parcourir tous les réglages. Visibilité et difficulté se règlent dans la carte de l’activité ; le texte de fluence reste éditable dans un panneau repliable. Les points de départ, la remise à zéro, les évolutions et la suppression d’un profil restent disponibles dans les rubriques correspondantes.

Chaque activité possède un aperçu interactif du vrai jeu, avec la difficulté et le profil sélectionnés, en format téléphone ou tablette. Le bouton son lit la vraie consigne ou le vrai enregistrement de l’exemple affiché. Les calculs et la fluence gardent leur fonctionnement sans voix. L’aperçu est silencieux tant que le parent n’a pas demandé l’écoute. Il utilise une copie en mémoire du profil : les écritures de sauvegarde et la suppression sont bloquées en mode aperçu. Fermer ou remplacer l’aperçu arrête sa voix et son audio. Un nouvel exemple peut être demandé sans toucher aux réglages ni aux points de l’enfant.

Les cris des animaux passent de 30 à 100 entrées illustrées, dont des animaux de la ferme, sauvages, oiseaux et insectes. Les 70 nouveaux cris sont de vrais enregistrements sous licences libres : sources, auteurs, licences et détails de l’extrait dans audio-credits.html et assets/animals-100-sources.json. Les extraits durent au maximum sept secondes ; un passage audible est choisi et normalisé, converti en mono 32 kHz Ogg Vorbis. Les originaux Commons restent accessibles par les liens de source. Les 70 extraits ajoutent environ 3,7 Mo ; les sept nouvelles planches de dix animaux sont décrites dans assets/animaux-100-visuels.md, avec leurs prompts ImageGen dans assets/animaux-100-prompts.json. Les cousins dont les cris ou les silhouettes sont trop semblables ne sont pas proposés ensemble dans une question. Le nombre de réponses reste 2/3/4 selon la difficulté.

Le jeu des différences et l’observation utilisent 100 compositions. Les éléments principaux, accessoires, emplacements et tailles changent entre les compositions : bâtiment à gauche, à droite ou au centre, objets répartis différemment en hauteur. Les neuf univers et 36 types d’éléments principaux sont combinés avec plusieurs dispositions et vues. Les erreurs peuvent être une substitution, un changement de couleur ou de quantité, une disparition, une réduction, un déplacement ou une inclinaison. Les deux images conservent le même décor et exactement 2/3/5 erreurs à trouver selon le niveau ; il ne s’agit pas de chercher cent erreurs dans une seule paire. Le dessin est redimensionné à l’intérieur de sa zone tactile pour que les différences de taille restent visibles sur petit écran. La galerie scenes.html montre les cent compositions.

L’observation dure désormais 10 000 ms après l’affichage, avec décompte de dix secondes et toutes les consignes adaptées. Les questions situent les objets à partir de leurs coordonnées réelles, au lieu de supposer qu’un élément reste toujours au même endroit. L’image disparaît avant la réponse. Les interruptions et reprises suivent les mêmes règles qu’auparavant.

Le mélange des couleurs est une nouvelle activité de peinture, avec deux taches à mélanger et une réponse parmi des taches colorées. Facile : trois recettes primaires et deux réponses ; Moyen : sept recettes, dont des mélanges avec du blanc, et trois réponses ; Difficile : quinze recettes avec teintes claires, foncées et mélanges complémentaires, quatre réponses. Les résultats sont des repères pédagogiques de peinture ; les pigments et proportions réels peuvent produire d’autres nuances. Les points 10/5/1, bonus, transitions, visibilité, difficulté par enfant et défi sont intégrés.

Pour limiter la redondance, le memory tire maintenant ses paires parmi les 100 illustrations et le comptage propose 18 familles d’objets, soit 162 couples quantité/objet possibles, plus les dés. Un historique par enfant, activité et difficulté privilégie les exercices non vus récemment dans les jeux de lecture et les petits domaines. Les banques de lecture existantes restent supérieures à cent éléments : 111 mots à lettres manquantes, 183 graphèmes, 266 mots/syllabes, 261 mots à écouter et 167 pièges. Les domaines volontairement petits (alphabet, chiffres 1 à 9, six formes) ne sont pas artificiellement gonflés ; leur tirage et leurs propositions varient. L’historique est propre à la session.

Fichiers : parent-page.mjs et parents.css pour l’organisation et les aperçus ; parents.html est générée à partir d’index.html en ajoutant l’attribut data-parent-page au body (commande node sync-parent-page.mjs). app.js gère le mode aperçu sans sauvegarde ; colors.mjs définit les mélanges ; variation.mjs gère l’historique ; preschool.mjs contient les cent animaux ; memory.mjs et counting.mjs étendent leurs banques ; scene-catalog.mjs et scene-games.mjs gèrent les cent scènes et le délai de dix secondes. Cache dragonne-v37, avec les nouveaux sons, images, modules et page parent préchargés.

Vérifications : check-new-activities.mjs (1 500 mélanges, trois niveaux, cent animaux, memory100, comptage18, historique et sauvegarde bloquée en aperçu), check-scene-catalog.mjs (12 000 paires sur les cent compositions et différences rendues), check-scene-games.mjs (chronomètre dix secondes, interruption/reprise, attribution unique des points), check-preschool.mjs, memory, comptage, profils, suppression, défi, lecture et récompenses. Les 70 nouveaux extraits ont tous été décodés et contrôlés après conversion. Dans le navigateur : ouverture de la page parent, vraie consigne et vrai cri dans l’aperçu, réussite de couleur à +10 dans l’aperçu puis rechargement avec les 707 points réels conservés, accès aux quatre choix de dragon de l’éditeur, décompte d’observation à 10, scène masquée et réponse contextuelle. Contrôles téléphone et paysage.

Limites : les cent compositions prolongent neuf familles de paysages et des dessins réutilisables ; elles ne sont pas cent photographies. Les formes restent les six formes actuelles : les variantes plus complexes ont été proposées à l’utilisateur, sans ajouter de questions ambiguës entre un carré tourné et un losange. L’audio parlé dépend de la voix française installée. Le premier téléchargement des nouvelles illustrations est plus important ; le mode hors connexion nécessite la fin de ce chargement. Un essai sur Android physique reste utile.

### 26 octobre 2026 — 36 compositions pour les deux jeux d’observation (v36)

Le jeu des différences et « Observe bien ! » disposent de 36 compositions identifiables dans neuf univers : campagne, mer, forêt, montagne, ville, château, espace, banquise et fonds marins. Chaque univers contient quatre scènes avec un bâtiment ou un élément principal propre : ferme, moulin, serre, verger ; phare, cabane de plage, voilier, château de sable ; cabane dans les arbres, camping, pont, maison champignon ; chalet, téléphérique, train, cascade ; boulangerie, caserne, école, parc de jeux ; château fort, tour, pont-levis, tournoi ; fusée, station, véhicule lunaire, observatoire ; igloo, bateau des glaces, colonie de manchots, palais de glace ; récif, épave, sous-marin, coffre englouti.

Les paysages, objets à retrouver, éléments à compter et accessoires changent selon l’univers. Les dessins vectoriels prolongent la palette et les formes du papier découpé existant. Chaque partie modifie les couleurs, formes, quantités et objets dans ces compositions. Les deux images d’une comparaison partagent exactement le même décor ; seules les 2/3/5 différences annoncées changent réellement.

Les questions d’observation désignent les nouveaux éléments : couleur du phare ou du sous-marin, coquillages ou étoiles de mer à compter, objet central à mémoriser, forme du panneau. Les questions précisent la position lorsque plusieurs objets de même type peuvent apparaître dans la scène. Le délai de cinq secondes, les 2/3/4 réponses, les points, sauvegardes et réglages par enfant sont conservés. Les scènes étant dessinées directement dans la page, le chronomètre n’attend plus une ancienne planche d’animaux inutile à ces nouveaux décors.

Un historique distinct par activité évite de revoir une composition avant d’avoir parcouru les 36 pendant la session. Revenir à l’accueil ne réinitialise pas cet historique ; recharger l’application le réinitialise. La page scenes.html présente les 36 compositions sans modifier les points ni les profils.

Sources : scene-catalog.mjs contient les neuf univers, les 36 éléments principaux, les objets et paysages ; scene-games.mjs compose les exercices et leurs questions ; app.js gère le tirage sans répétition et la présentation ; scenes.html est la galerie ; style.css contient les styles partagés. Les objets et les réponses utilisent les mêmes dessins, afin d’éviter une différence accidentelle entre une illustration et sa copie. Cache dragonne-v36, sans nouveaux fichiers audio ni grosses images à télécharger.

Vérifications : node check-scene-catalog.mjs couvre 36 compositions distinctes, neuf univers, les quatre couleurs de chaque élément principal, 4 320 paires dont les différences rendues correspondent exactement aux cibles, les questions et réponses adaptées, et le parcours des 36 décors avant répétition. Régressions : scènes/chronomètre, récompenses, défi et profils. Contrôle des 36 scènes dans la galerie du navigateur, comparaison dans trois décors successifs sans répétition, mise en page téléphone 360×640 et 740×360, observation puis disparition de la scène et question contextuelle. Aucun point de profil n’a été modifié pendant ces essais.

Limites : les 36 compositions partagent neuf familles de paysages et une disposition lisible des détails ; elles ne sont pas 36 photographies. Les questions restent visuelles avec synthèse vocale française selon les voix installées sur l’appareil. L’historique des décors est propre à la session, pas une donnée sauvegardée du profil.

### 26 octobre 2026 — Deux jeux d’observation et 30 cris d’animaux (v35)

**Le jeu des différences** affiche deux jardins à comparer. L’enfant touche les détails qui changent dans l’une ou l’autre image ; chaque différence trouvée est entourée dans les deux scènes. Facile demande 2 différences sur 6 détails, Moyen 3 sur 8, Difficile 5 sur 10. Les variations concernent les contours, couleurs, quantités ou animaux. Les scènes sont générées à chaque tour, avec des centaines de combinaisons. Une différence déjà trouvée ne rapporte rien de plus ; les points ne sont attribués qu’une fois la scène entièrement résolue. Une erreur compte dans le barème commun 10/5/1.

**Observe bien !** attend le bouton de départ avant de montrer le jardin. L’image reste visible exactement 5 secondes après son chargement et son affichage ; un décompte visuel accompagne l’observation. Elle disparaît complètement avant la question parlée. L’enfant répond avec des images : animal, couleur, nombre de fleurs ou forme du cerf-volant. Facile/Moyen/Difficile proposent 2/3/4 réponses et 6/8/10 détails à observer. Ouvrir le coin parent ou le portrait, changer de jeu ou masquer l’onglet annule le chronomètre ; il faut relancer les cinq secondes. Les points, bonus, pauses, évolutions et sauvegardes sont communs aux autres jeux.

Les deux activités disposent de leur visibilité et de leur difficulté par enfant dans le coin parent. Elles sont exclues du défi de 20 par défaut, mais peuvent y être activées. Les illustrations respectent le papier découpé ; les animaux du jardin utilisent une planche transparente distincte de celle des réponses du jeu des cris. Mise en page vérifiée sur téléphone en portrait 360×640 et paysage 740×360.

**Les cris des animaux** propose désormais exactement 30 animaux : chat, chien, vache, canard, mouton, cheval, cochon, coq, âne, chèvre, oie, dindon, lion, tigre, éléphant, loup, ours, singe, hibou, perroquet, corbeau, paon, grenouille, bourdon, grillon, dauphin, baleine, otarie, serpent à sonnette et renard. Tous sont disponibles aux trois niveaux, avec 2/3/4 images proposées. Un historique de session fait parcourir les 30 cibles avant de recommencer et évite la répétition immédiate à la jonction. Les extraits durent au maximum 7 secondes et peuvent être réécoutés ; les enregistrements complets sont conservés sans modification et disponibles dans la page des sources. Les erreurs retirent le mauvais choix et appliquent les points 10/5/1 habituels.

Fichiers à modifier : scene-games.mjs pour les scènes, différences, questions et chronomètre ; preschool.mjs pour les 30 animaux, leurs fichiers audio et cases illustrées ; app.js pour leur présentation ; activities.mjs, challenge.mjs, index.html, style.css pour les menus et réglages. audio-credits.html mentionne les auteurs, liens Commons et licences des 30 sons. Les métadonnées des 24 nouveaux enregistrements sont dans assets/animal-sources.json. Les nouveaux visuels et prompts ImageGen sont documentés dans assets/nouveaux-visuels.md et assets/animal-prompts.json. Le cache dragonne-v35 précharge toutes les images et tous les sons pour le mode hors connexion.

Vérifications : node check-scene-games.mjs (3 000 scènes/questions, variations exactes, chronomètre 5 000 ms, interruption/reprise, attribution unique des points, réglages et défi) ; node check-preschool.mjs (30 cibles, fichiers et sprites présents, deux cycles complets sans répétition, choix 2/3/4 et récompenses) ; profils, défi/contenus et récompenses. Essais dans le navigateur : erreurs puis réussite à +5 dans les deux nouveaux jeux, passage automatique à la suite, arrêt par le coin parent et restauration des points de test. Les 30 enregistrements sont vérifiés par décodage audio dans le navigateur.

Limites : les questions d’observation utilisent six animaux et cinq familles de questions, avec des scènes renouvelées aléatoirement. La banque des cris comprend aussi des insectes et des animaux sauvages : leur découverte peut nécessiter l’accompagnement d’un adulte. Les nouveaux médias augmentent le premier chargement ; le mode hors connexion nécessite qu’il se termine. Un essai sur téléphone Android physique reste utile.

### 26 octobre 2026 — Ombres sans solution visible (v33)

Le puzzle affiche uniquement l’objet coloré au centre de la cible, sans ombre de référence ni flèche à côté. Les propositions sont choisies pour leurs ressemblances, au lieu d’être tirées parmi tous les objets. La banque contient désormais 20 silhouettes : ajout du bateau à une voile, du parasol, de la montagne, de la maison avec cheminée, du minibus, du poisson rond, du gobelet et de la fusée sans ailerons. Les contours des variantes diffèrent réellement ; chaque bonne ombre reprend exactement le dessin de l’objet demandé.

Pour un bateau à deux voiles, le niveau Difficile propose le bateau à une voile, le parasol et la montagne avec la bonne réponse. Facile conserve 2 choix avec un voisin proche ; Moyen en propose 3 ; Difficile 4. Glisser-déposer, solution par deux touchers, retrait du mauvais choix, points, bonus et sauvegarde restent communs. La configuration des voisins est dans `SHADOW_DISTRACTORS` de `preschool.mjs`, la cible dans `nextPreschool()` de `app.js`. Cache `dragonne-v33`.

Vérifications : `node check-preschool.mjs` couvre les 20 objets, les contours correspondants, les voisins valides, les 2/3/4 choix, l’exemple des deux voiles et l’absence d’ombre de référence dans la cible. `node check-reward-ui.mjs` confirme les récompenses et l’enchaînement. Contrôle visuel sur téléphone dans le navigateur : objet seul, variantes de bateaux et parasol, cibles tactiles conservées. Aucun point ni réglage de profil n’a été modifié par cette évolution.

- Les vingt-deux activités de l’accueil sont jouables : quatre jeux initiaux, six jeux visuels, huit jeux de lecture, deux jeux de mathématiques, la fluence et le défi de 20 exercices, tous activables par profil dans le coin parent.
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
- Un palier par tranche de 300 étoiles, jusqu’à 100 illustrations complètes par dragon : œuf à zéro point, éclosion, bébé, croissance et tenues de plus en plus riches. Les quatre dragons disposent de 400 images distinctes. Animation de transformation avec étoiles et carillon ; toucher pour continuer. Le coin parent donne accès à un album des 100 paliers sans changer les points.
- La fenêtre d’évolution attend à la fois sa durée visuelle minimale (3,4 secondes, ou 1,4 seconde sans animations) et la fin réelle de la phrase, avec 0,35 seconde de respiration. Elle ne coupe plus la voix en démarrant la question suivante. Sans voix disponible ou en cas d’erreur vocale, la durée minimale suffit. Un toucher permet toujours de continuer ; les anciens événements vocaux ne peuvent pas fermer une nouvelle fenêtre.
- Le coin parent affiche les 100 seuils cumulés (0, 300, 600… 29 700 étoiles), le palier actuel et les étoiles restantes avant l’évolution suivante. Depuis zéro, le palier 100 demande 2 546 réponses parfaites avec bonus, 5 940 questions à une faute chacune ou 29 700 à deux fautes ou plus chacune. Le rythme reste un palier tous les 300 points. Les étoiles acquises sont conservées.
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

## Fluence et chiffres en lettres

Deux nouvelles activités, activables par enfant dans le coin parent. Cache PWA v23.

**Fluence** : le bouton lance une minute réelle. À zéro, l’enfant sélectionne son dernier mot puis confirme. Le dernier essai et le meilleur mot sont sauvegardés pour chaque enfant et chaque texte ; le mot record porte un drapeau doré lors des essais suivants. Chaque essai repart du début. Le texte fourni « Les enfants s’amusent dans la cour de l’école… » est installé par défaut (69 mots). Dans le coin parent, le texte est modifiable pour l’enfant sélectionné ; revenir à un ancien texte retrouve son record. Les espaces et variantes d’apostrophe ne créent pas un nouveau record. Apostrophes et traits d’union restent dans un seul mot.

Une minute validée apporte 10 points et participe au bonus habituel ; aucun point par mot. Le résultat est déclaré par l’enfant, sans enregistrement ni analyse de sa lecture. Quitter l’activité annule la minute en cours. Le chrono utilise une échéance absolue pour éviter qu’un onglet ralenti prolonge la minute. Les records restent enregistrés quand les points sont modifiés dans le coin parent. La sauvegarde reste locale à l’appareil.

**Chiffres et lettres** : lire une écriture comme « vingt-et-un » et sélectionner 21. Facile : 0–9 avec trois choix ; Moyen : 0–20 avec quatre choix ; Difficile : 0–100 avec six choix. Réglage propre à l’activité, erreurs avec retrait des choix, points 10/5/1 et passage automatique à la suite. La voix lit uniquement la consigne pour laisser travailler la lecture du nombre.

Fichiers : `fluency.mjs` (texte initial, segmentation, records et horloge), `number-words.mjs` (orthographe et questions), `profiles.mjs` (sauvegarde par enfant), `app.js` et `index.html` (interfaces). `assets/fluence-nombres.png` : atlas créé avec l’outil d’image intégré, style papier découpé crème/sauge/lavande/or ; livre ouvert, chronomètre et marque-page pour la fluence, carte « trois » reliée au chiffre 3 pour les nombres.

Vérifications : horloge à échéance, arrêt et callback tardif, décompte des mots, meilleur et dernier essai distincts, conservation par texte, restauration et indépendance ; 1 500 questions de nombres sur les trois niveaux, orthographe des nombres composés et absence de choix doubles. Toutes les suites de progression, profils, lecture, maths et récompenses passent.
Navigateur localhost : minute complète chronométrée, choix du mot 10, validation +10 points, record retrouvé après rechargement ; texte parent modifié puis texte initial restauré avec son record conservé. Vue 360×640 vérifiée. « vingt » associé à 20 : +10 points et question suivante. Aucun profil public modifié.

## Révision des sons, calculs et nouvelle activité Les pièges (v24)

Les consignes ci-dessous remplacent les comportements antérieurs décrits dans l’historique.

- Je relie : « Écoute les sons et relie-les aux bons mots. » Aucun numéro prononcé après « son ».
- Les sons : la voix prononce uniquement le mot complet. L’enfant retrouve sa première syllabe écrite. Facile : mots en deux morceaux et 3 choix ; Moyen : mots en trois morceaux et 4 choix ; Difficile : mots en quatre morceaux et 6 choix. Une seule syllabe proposée appartient au mot. La banque est `PART_WORDS` dans `reading.mjs`.
- Calculs et multiplications : plus de voix de consigne ni de commentaire de bonne réponse, plus de bouton son. Les carillons et l’annonce exceptionnelle d’évolution restent disponibles.
- Jauge : aucun nombre affiché sur le curseur pendant le placement. Une seule validation termine l’essai, même approximatif. Récompense : position exacte 10 points ; écart jusqu’à 5 % de l’échelle 5 points ; jusqu’à 10 % 1 point ; au-delà 0 point. Seule une position exacte continue la série et permet le bonus. Exemple sur 0–100 : écarts 0 / 1–5 / 6–10 / plus de 10. Sur 0–10, un écart de 1 rapporte 1 point. Après validation, la position choisie, le résultat et l’écart sont affichés, puis le jeu continue. Aucun point déjà gagné n’est retiré.
- Les pièges : mot à écouter et à compléter, deux propositions de lettres/graphies. Facile : b/d et p/q ; Moyen ajoute c/g, c/ss et s/ss ; Difficile ajoute qu/q, c/q et c/k. Les niveaux supérieurs gardent les familles précédentes. Points 10/5/1, sauvegarde, transitions et niveau propre au jeu par enfant. Visibilité réglable dans le coin parent. Le mot parlé précise le mot attendu quand deux complétions pourraient former un mot français. Certaines paires travaillent l’orthographe lexicale et ne se déduisent pas uniquement de la prononciation.

Contenu à enrichir : `traps.mjs`, banque de 24 mots avec découpage, paire et niveau ; la nouvelle carte reprend le visuel de lettres en papier découpé existant. Calcul de précision : `placementReward` dans `maths.mjs`. Le cache inclut le nouveau module.

Tests : 5 760 questions de lecture, 900 tirages des pièges avec contrôle de reconstruction des mots et des niveaux ; toutes les positions et cibles des échelles 0–10, 0–20, 0–100 testées pour les seuils, points et bonus. Régression du gestionnaire réel de récompenses et suites existantes réussies.
Navigateur localhost : bateau complété avec b (+10), syllabes seules dans les choix, calcul et nombre manquant sans bouton son, jauge 0–100 sans valeur de curseur ; position 50 pour résultat 47 : +5 points, série remise à zéro et passage au calcul suivant. Tests effectués sur des profils locaux uniquement.

## Validation de fluence et nombres dans les deux sens (v25)

Fluence : la sélection du dernier mot est confirmée par un bouton vert avec une coche ✓, nommé « Valider le dernier mot lu » pour l’accessibilité. Il apparaît à la fin de la minute et reste désactivé tant qu’aucun mot n’est choisi. L’option secondaire « 0 mot lu » sert à enregistrer un essai sans mot ; elle est volontairement discrète et demande également la coche pour confirmer. Les consignes vocales et écrites indiquent la coche verte. Les records, le chrono et la sauvegarde sont conservés.

Chiffres et lettres : les questions alternent maintenant dans les deux sens. Exemple « quarante-sept » → 47, puis 12 → « douze ». Les limites et nombres de choix restent 0–9/3, 0–20/4, 0–100/6 selon le niveau. La voix lit la consigne adaptée et ne prononce pas la réponse. Les réponses écrites utilisent deux colonnes avec retour à la ligne pour les nombres longs. Points, bonus, retrait d’un mauvais choix et transitions sont inchangés.

Fichiers : `number-words.mjs` pour la génération et l’alternance ; `app.js`, `index.html`, `style.css` pour les consignes, la coche et les réponses écrites. Cache v25. Tests de 1 500 questions couvrant l’alternance, les limites, l’unicité des choix, la présence de la bonne réponse, l’orthographe et l’absence de répétition immédiate du nombre ; tests de lecture et récompenses réussis.
Vérification navigateur sur localhost : quatre-vingt-deux → 82 (+10), question suivante 47 → quarante-sept (+10), réponses longues lisibles en 360×640. Minute complète de fluence : coche absente pendant la lecture, désactivée à zéro sans sélection, puis verte et active après choix du dernier mot ; validation enregistrée. Aucun profil public modifié.

## Défi de 20 exercices, contenus enrichis et réponses proches (v26)

L’accueil propose en première position une grande carte « Mon défi · 20 exercices ». Chaque série tire au hasard parmi les activités choisies pour l’enfant et visibles sur son accueil. Le tirage répartit les familles sélectionnées avant de les réutiliser et évite deux familles identiques de suite si plusieurs sont disponibles. Les questions déjà posées sont évitées tant que la banque le permet. Dans un domaine limité (ex. seulement neuf chiffres), une cible peut forcément revenir ; les choix sont renouvelés. Si aucune activité n’est disponible, un message invite à régler le défi côté parent.

Dans le coin parent, la section « Mon défi · 20 exercices » enregistre les cases pour chaque enfant. Memory, fluence, Je relie et construction sont exclus par défaut car plus longs, mais peuvent être inclus. Une grille entière de memory, une minute de fluence validée, trois associations ou un mot entièrement construit comptent chacun comme une épreuve. Une multiplication du défi utilise une table choisie au hasard de 1 à 10, avec le niveau habituel de l’activité. Les autres niveaux sont également conservés par jeu. Une modification du niveau, de la visibilité ou des points qui relance une activité annule le défi en cours.

Un bandeau indique l’épreuve 1/20 à 20/20. Les points, séries et transformations fonctionnent normalement, sans remise à zéro entre les activités. L’écran final annonce le gain total et permet de relancer un nouveau défi. Quitter, changer d’enfant ou recharger annule la série en cours ; les points déjà gagnés restent sauvegardés. La composition du défi, les niveaux et les points sont conservés dans `dragonne-profiles-v2` ; aucun compte ni serveur ajouté.

### Banques de contenu

Les volumes ci-dessous portent sur les banques complètes ; les niveaux filtrent leur contenu. Les lettres de l’alphabet et les chiffres gardent leurs domaines naturels. Les grilles, quantités, choix de chiffres et calculs sont générés aléatoirement ; la fluence garde le texte personnalisable du parent.

| Activité | Contenu disponible |
| --- | --- |
| J’écoute et je complète | 111 mots avec une lettre manquante, plus les graphèmes aux niveaux supérieurs |
| Les morceaux du mot | 183 mots avec un graphème manquant |
| Trouve la syllabe | 266 mots, avec découpage de deux, trois ou quatre syllabes selon le niveau |
| Le mot en morceaux | 266 mots à construire |
| J’écoute un mot / Je relie | 261 mots ; associations de trois mots mélangés |
| Les pièges | 167 mots différents, 204 exercices mot/paire |

`content.mjs` contient les nouvelles banques. Les syllabes orales sont séparées des e muets : un fragment réduit à un e muet n’est pas une réponse à trouver. La voix des syllabes explique « Trouve une des syllabes du mot suivant : … » puis prononce le mot entier ; la cible peut être une syllabe différente du début, et les distracteurs ne contiennent aucune autre syllabe du même mot.

Chiffres et lettres : Facile garde des choix variés. Moyen propose des voisins plus proches. Difficile associe des nombres voisins, des écritures avec le même début et une même unité dans une autre dizaine. Pour 97, les distracteurs incluent notamment 98, 93 et 87. Les règles s’appliquent dans les deux sens, avec une seule bonne réponse. `numberDistractors` dans `number-words.mjs` est testée sur les bornes 0 et 100 et toutes les cibles.

### Graphismes et fichiers

`assets/pieges-defi.png` est un nouvel atlas de deux pictogrammes produit par le skill imagegen avec l’outil intégré. Prompt : papier découpé texturé ivoire/sauge/lavande/or, miroir avec b/d et loupe pour les pièges ; chemin d’épreuves avec drapeau, cartes A, 3, + et livre pour le défi. Le visuel des pièges est indépendant de J’écoute et je complète. L’original généré est conservé. `challenge.mjs` gère les cases, le tirage et l’évitement des doublons ; `profiles.mjs` migre les cases par enfant ; `app.js` réutilise les exercices et leur récompense. Cache PWA v26 incluant les deux nouveaux modules et l’atlas.

Vérifications : toutes les banques dépassent 100 mots, reconstruction exacte des mots, présence et unicité de la cible de syllabe ; réponses proches et limites ; séries de 20, exclusions et options par enfant, arrêt réel au 20e exercice, memory compté à la fin de la grille et fluence à la validation. Toutes les suites de progression, maths, lecture, profils et récompenses passent.

Navigateur localhost : passage entre deux activités du défi, parcours complet de 20 multiplications toutes différentes, 230 étoiles avec bonus, transformation de palier puis reprise et écran final. Composition limitée à une activité conservée après rechargement ; un autre enfant garde ses onze activités cochées par défaut. Inclusion explicite du memory vérifiée sur téléphone. Consigne de syllabe et nombres proches vérifiés : 55 face à 51/53/56/45/54 ; 26 face à vingt-cinq, vingt-deux, vingt-huit, seize et vingt-sept. Accueil en 360×640 et nouveau visuel vérifiés. Les tests ont uniquement utilisé les profils de localhost.


## Icône dragon, 100 évolutions et suppression de profil (v27)

L’icône d’installation Android, le favicon et l’icône Apple utilisent désormais le portrait de la dragonne en papier découpé. Source générée : assets/dragon-app.png, exports PNG 192 et 512 dans assets/dragon-app-192.png et assets/dragon-app-512.png. Le manifeste conserve son id et son périmètre afin de garder la même application. Les anciens PNG icon-192/icon-512 sont également remplacés pour compatibilité ; le manifeste utilise des noms nouveaux pour renouveler les icônes mises en cache. Le SVG étoile historique n’est plus référencé par la page ou le manifeste. L’apparence du lanceur d’une PWA déjà installée dépend du rafraîchissement effectué par Android/son navigateur ; elle n’a pas été testée sur un lanceur Android réel.

Chaque compagnon possède 100 états visuels : les 15 apparences historiques restent intactes ; viennent ensuite 17 nouvelles tenues, chacune déclinée en cinq équipements (médaillon, bouclier, sceptre, insigne ailé, couronne). Il s’agit de 100 combinaisons visibles, pas de 100 illustrations indépendantes. Les tenues représentent forêts, océans, sommets, glaces, dunes, vents, arc-en-ciel, nuages, lune, étoiles, aurore, jardins, savoirs, cristaux, ciel, aurores boréales et légende. Le personnage change de tenue tous les cinq nouveaux paliers et d’équipement à chaque palier intermédiaire. Les quatre couleurs sont préservées.

Le rythme reste strictement 300 points : 4 200 = palier 15, 4 500 = palier 16, 29 700 = palier 100. Aucun point ni réglage n’est réinitialisé. Un ancien total au-delà de 4 200 donne automatiquement le nouveau palier correspondant. La barre, les noms, le portrait agrandi, les profils, les transformations et le transfert manuel utilisent maintenant la limite 100. Le tableau complet du parent est repliable pour éviter une page trop longue.

Assets de tenues : dragonne-aventures.png, dragon-aventures.png, dragon-braise-aventures.png, dragon-soleil-aventures.png, dans assets/. Chaque atlas comporte 5 colonnes × 4 lignes ; les 17 premières cellules sont utilisées, les 3 dernières réservées. Illustration avec le skill imagegen et l’outil intégré, chaque ancien atlas étant fourni comme référence. Prompt : conserver l’identité et la couleur du dragon chevalier, papier découpé ivoire, vingt tenues thématiques distinctes centrées, sans texte ni numéros, ailes et pieds dans chaque cellule. Les originaux générés sont conservés. Équipements vectoriels superposés et choix de cellule : dragon-evolutions.mjs. Seuils : engine.mjs. Noms : profiles.mjs.

Dans le coin parent, « Supprimer un profil » ouvre une confirmation qui nomme l’enfant et son nombre d’étoiles. Annuler ne change rien. Confirmer supprime localement son prénom, son dragon, ses points, difficultés, activités, composition du défi et records de fluence. Les autres profils sont conservés et l’écran de choix revient. Si c’était le dernier enfant, l’écran propose d’en créer un. La sauvegarde vide ne réimporte pas les anciens profils depuis les formats historiques. Si l’écriture de la sauvegarde échoue, le profil reste intact. Cette suppression ne touche pas les autres appareils.

Vérifications : seuils et limites des 100 rangs, cent signatures visuelles distinctes par dragon, conservation des 15 premières apparences, équipements, 100 noms uniques pour chaque dragon, conservation des anciennes sauvegardes et icônes PNG aux dimensions exactes. Suppression ciblée, dernier profil, données des autres enfants, sauvegarde vide et échec de stockage testés ; la vraie fonction de confirmation est exécutée avec un stockage simulé. Toutes les suites existantes passent. Dans le navigateur localhost : confirmation de suppression nommée puis annulation, passage manuel à 4 500 et 29 700 points, portraits 16/100 et 100/100 en 360×640, tableau de 100 lignes. Le total local de départ est restauré après les essais ; aucun profil réel n’a été supprimé. Cache PWA v27 incluant les nouveaux visuels, équipements et icônes.

## Fluence : texte masqué avant le départ (v28)

Le texte de fluence est masqué tant que l’enfant n’a pas lancé le chrono. Le bouton de départ révèle le texte, le place à l’écran puis démarre la minute. À la fin, le texte reste visible pour choisir le dernier mot et revoir son record. Revenir dans l’activité remet le texte à l’état masqué. Le même comportement s’applique à la fluence incluse dans un défi. Modification centralisée dans renderFluency (app.js), cache PWA v28.

Vérification navigateur localhost : texte invisible avant départ, visible dès le lancement à 1:00, puis de nouveau invisible après retour à l’accueil et réouverture. Aucun point modifié.

## Fluence : aperçu de deux lignes (v29)

Avant le départ, les deux premières lignes sont visibles pour reconnaître le texte ; le reste est masqué. Cet aperçu remplace le masquage intégral de la v28. La limite est visuelle et s’adapte à la largeur de l’écran, à la taille des lettres et aux retours à la ligne du texte personnalisé. Au lancement du chrono, l’aperçu est remplacé par le texte complet avec ses repères de record. La sélection du dernier mot en fin de minute est conservée.

Fichiers : renderFluency dans app.js et classe fluence-preview-lines dans style.css ; cache PWA v29. Vérifications navigateur localhost : aperçu limité à deux lignes en 360×640 et 1024×768, révélation des 69 mots au lancement, retour à l’aperçu après réouverture. Aucun point modifié. Vérification de syntaxe et de diff réussie.

## Chiffres et lettres : variante audio (v30)

Trois variantes alternent : écouter un nombre et retrouver son écriture chiffrée ; lire son écriture en lettres et choisir les chiffres ; voir les chiffres et choisir les lettres. La première question d’une nouvelle session est audio. L’alternance est conservée en mémoire pour chaque enfant pendant la session, y compris entre les passages de cette activité dans le défi.

Dans la variante audio, le titre demande « Quel nombre entends-tu ? », le haut-parleur permet de réécouter et aucun grand nombre ni mot-réponse n’est affiché. La phrase parlée contient le nombre ; la consigne affichée ne le révèle pas. Les difficultés gardent 0–9 avec 3 choix, 0–20 avec 4 choix et 0–100 avec 6 choix proches. Points, bonus, retrait des mauvaises propositions, sauvegarde et passage à la suite sont partagés avec les variantes de lecture. La voix française et le réglage du son restent ceux de l’application.

Fichiers : number-words.mjs (direction, consigne et phrase parlée), app.js (titre, réécoute et alternance par enfant), check-number-words.mjs (1 500 questions sur les trois modes et niveaux). Vérifications : cible présente une seule fois, nombre de propositions, bornes, non-répétition du nombre, cycle audio/lettres/chiffres et absence de réponse écrite dans la présentation audio. Suites de lecture et récompenses réussies. Cache PWA v30.

Navigateur localhost en 360×640 : titre audio, bouton Réécouter le nombre et quatre chiffres sans carte de réponse écrite ; erreurs puis bonne réponse (+1), lecture de « un » vers 1 (+10), lecture de 7 vers « sept » (+10), puis retour automatique à la variante audio. Total local de départ restauré après les essais. La phrase à prononcer est vérifiée par les tests de génération ; la qualité de la voix dépend des voix installées sur l’appareil.



## 26 octobre 2026 — Trois petits jeux pour les plus jeunes (v31)

- **Les formes** : la voix demande le carré, le rond, l’étoile, le triangle, l’ovale ou le losange. Les réponses montrent seulement les dessins. Une couleur commune aux propositions change à chaque question pour ne pas apprendre la réponse par sa couleur.
- **Les cris des animaux** : six vrais enregistrements locaux (chat, chien, vache, canard, mouton, cheval), six illustrations en papier découpé et un gros bouton pour réécouter. Aucun nom d’animal n’est prononcé avant la réponse. Les fichiers audio restent disponibles hors connexion après le chargement complet du cache. Une lecture bloquée par le navigateur invite à toucher le haut-parleur.
- **Le puzzle des ombres** : 12 objets (bateau, sapin, maison, parapluie, poisson, papillon, fleur, fusée, voiture, pomme, tasse, glace). Glisser une silhouette sur l’objet ou toucher une silhouette puis l’objet. Un dépôt hors de la cible ne compte pas comme une faute. Chaque silhouette utilise exactement les mêmes tracés que l’objet coloré, dans la même orientation. L’objet danse une seconde avant la récompense ; les animations peuvent être désactivées.
- **Difficulté par enfant et par jeu** : Facile 2 propositions, Moyen 3, Difficile 4. Les six formes, six animaux et 12 objets sont disponibles dès Facile. Les choix sont distincts, incluent toujours la réponse et la cible ne se répète pas immédiatement dans une activité normale. Les nouvelles activités sont visibles par défaut et peuvent être masquées dans le coin parent.
- **Progression commune** : une erreur retire le mauvais choix sans déplacer les autres. Récompenses 10 / 5 / 1 selon les fautes, +5 toutes les trois réponses parfaites de suite, sauvegarde propre à l’enfant, évolution et transitions habituelles. Un double clic ne rapporte pas deux fois. Les trois jeux sont aussi disponibles dans les réglages du défi de 20 exercices. Les profils et points existants sont conservés.
- **Son et navigation** : arrêt des cris en quittant le jeu, en ouvrant le coin parent, en masquant l’onglet ou en coupant le son. Le haut-parleur permet ensuite de réécouter. Un changement de niveau dans le coin parent ne lance pas de cri derrière la fenêtre.

### Fichiers à modifier

`preschool.mjs` contient les six formes, les six animaux, les 12 objets vectoriels et le générateur 2/3/4 choix. `app.js` gère les consignes, l’audio et les gestes tactiles. `style.css` contient les adaptations portrait et paysage. `activities.mjs` et `challenge.mjs` déclarent les nouveaux jeux. `audio-credits.html`, accessible du coin parent, donne les auteurs, sources et licences de chaque enregistrement et permet de les écouter. Les sons originaux renommés se trouvent dans `assets/audio/` et ne sont pas modifiés. Le cache `dragonne-v31` précharge les nouveaux fichiers.

### Visuels et sources

Deux atlas créés avec le skill imagegen : `assets/animaux-sons.png` (3 colonnes × 2 lignes, chat/chien/vache puis canard/mouton/cheval), `assets/petits-jeux.png` (3 pictogrammes horizontaux formes/animaux/ombres). Direction donnée : papier découpé texturé, fond ivoire, sauge, lavande, jaune doux, animaux expressifs adaptés aux petits, sans texte ; cases séparées et silhouettes entièrement visibles. Originaux conservés : `C:/Users/pc/.codex/generated_images/01a1690e-b2f1-7da1-8299-97315b176fb9/exec-f91fc12c-9f84-4209-a5f9-4a2b6e85a693.png` et `exec-4665afd6-777e-4973-ba9c-78f6516ecdcc.png`. Les formes et objets/ombres sont dessinés dans le code pour garantir leur correspondance. Les licences des enregistrements sont détaillées dans [les crédits](audio-credits.html) : CC BY-SA 3.0 pour chat, chien, vache et canard ; CC0 pour mouton ; domaine public pour cheval.

### Vérifications

`node check-preschool.mjs` : 2 700 questions, couverture des banques, 2/3/4 choix uniques avec bonne réponse, absence de répétition immédiate, identité des tracés objet/ombre, présence et en-tête des fichiers audio, difficulté et visibilité sauvegardées par profil, participation au défi. Exécution des vrais gestionnaires de réponse pour chacun des trois jeux avec 0/1/2 fautes : points 10/5/1, bonus, sauvegarde une seule fois, verrouillage et suite. Régressions : profils, défi/contenus, récompenses et moteur.

Vérifications visuelles dans le navigateur : téléphone 360×640 et paysage 740×360, 2/3/4 choix ; bon dépôt, mauvais choix retiré, solution par deux touchers, gains +10 puis +5, question suivante et réglages après rechargement. Les six fichiers sont décodés par les lecteurs audio du navigateur sans erreur. Les points et niveaux du profil local de test ont été restaurés après les essais. Aucun profil du site public n’a été modifié.

Limites : banque volontairement limitée aux six formes demandées, six cris et 12 objets distincts ; les questions varient les choix et leur ordre. Les consignes parlées des formes et ombres utilisent la voix française de l’appareil ; sa disponibilité hors connexion dépend des voix installées. Les cris enregistrés ne dépendent pas de la synthèse vocale. Le glisser-déposer a été essayé avec les événements de pointeur dans le navigateur ; un essai sur un téléphone Android physique reste utile.


## 26 octobre 2026 — Refonte complète des évolutions (v32)

Remplace le système historique des 15 images puis des petites icônes superposées. Chaque palier possède maintenant son illustration complète, avec les vêtements et accessoires dessinés avec le dragon. **100 images pour chacun des quatre dragons, soit 400 PNG.** Le style conserve les personnages et les textures de papier découpé. Les anciennes planches restent dans le dépôt comme archives, mais ne sont plus utilisées ni préchargées.

- À **0 étoile**, palier 1 : l’œuf dans son nid. Paliers 2–10 : grandes fissures, yeux, sortie de la tête et des pattes, éclosion, premiers pas, cornes et ailes.
- Paliers **11, 21, 31, 41, 51, 61, 71, 81 et 91** : neuf âges, du jeune aventurier au dragon céleste. Les ailes, les cornes, la silhouette et les tenues changent.
- Dans chaque séquence, les neuf paliers suivants enrichissent la tenue et la collection : bottes, ceinture/sacoche, plastron, gantelets, épaulières, cape, bouclier, coiffe et étendard. Thèmes successifs : cuivre, argent, jade, ambre, saphir, améthyste, or, aurore, étoiles. Les tenues sont des illustrations artistiques complètes ; la liste de collection représente les améliorations débloquées, pas des calques ajoutés sur le personnage. Certains accessoires portés peuvent varier avec la tenue.
- **Palier 100** : Légende céleste, tenue étoilée complète. Les points, profils, difficultés et sauvegardes ne changent pas. Toujours 300 étoiles par palier et 29 700 pour le dernier ; aucune remise à zéro. Le niveau affiché reste numéroté 1–100, avec le premier état à zéro point.
- Les portraits de l’accueil, du choix d’enfant, des activités et de la fenêtre d’évolution utilisent la même image. Le choix d’un nouveau dragon montre une tenue représentative (palier 20), puis le profil créé commence dans son œuf. La voix de transformation annonce le nouvel état et conserve l’attente de fin de phrase.
- **Album parent** : lien « Parcourir les 100 évolutions des quatre dragons », page `evolutions.html`. Choix du dragon, grand aperçu, curseur 1–100, précédent/suivant, raccourcis des grandes étapes, seuil de points et cartes des 100 images. Cliquer une carte l’agrandit. L’album n’écrit jamais dans les profils ni dans la sauvegarde. Il est consultable en lecture seule sans données d’enfant.

### Fichiers et contenu graphique

`dragon-growth.mjs` décrit les 100 paliers, leurs noms et leur collection. `dragon-evolutions.mjs` réexporte cette interface pour les imports existants. `app.js` charge directement `assets/evolutions/{id}/stage-{palier}.png`. `profiles.mjs` utilise les nouveaux noms, avec variantes féminines. `evolution-gallery.mjs` pilote l’album. `style.css` affiche les images entières sans masque qui couperait les ailes ou les drapeaux.

Création avec le **skill imagegen**, outil intégré : quatre planches de croissance en référence aux anciens personnages, puis trois planches de 30 tenues par dragon. Deux retouches du dragon azur aux paliers 17 et 18 rétablissent l’armure et la cape. Découpe et centrage de production avec transparence conservée ; aucune pièce d’équipement n’est dessinée par le programme. Les fichiers originaux restent dans generated_images. Consignes exactes, références et chemins : [assets/evolutions/generation-prompts.md](assets/evolutions/generation-prompts.md).

Cache **dragonne-v32** : les 400 images et l’album sont préchargés pour le mode hors connexion. Les anciennes planches des dragons sont exclues du nouveau préchargement. Les nouveaux PNG représentent environ 46 Mo ; la première mise à jour complète peut donc prendre plus longtemps. Une fois le chargement terminé, les paliers restent disponibles hors connexion. Ne pas effacer le stockage du site pour mettre à jour : les profils et les points y sont conservés.

### Vérifications et limites

`node check-dragon-evolutions.mjs` vérifie 400 PNG présents, leurs dimensions, 100 empreintes de fichier distinctes par dragon, correspondance exacte rang/image, absence de calques d’équipement, 100 noms, seuils inchangés, collection conservée et améliorée pièce par pièce, dernières récompenses et compatibilité des sauvegardes. L’empreinte vérifie l’absence de fichiers dupliqués ; la différence artistique est aussi revue sur les planches générées et dans l’album.

Régressions : profils, fenêtre d’évolution et fin de voix, points/récompenses, trois petits jeux et moteur. Vérification des ressources du cache (aucun fichier manquant), des quatre choix de dragon, du passage 99→100 et des premiers paliers dans l’album. Contrôles de l’album et de l’application sur petit écran dans le navigateur. Les illustrations proviennent de planches : leur définition est adaptée aux mascottes et aux cartes de jeu, pas à l’impression en grand format. Le premier téléchargement est plus important ; le mode hors connexion nécessite la fin de ce chargement. Un essai sur Android physique reste utile pour évaluer ce temps de téléchargement selon la connexion.
