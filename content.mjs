// Contenus français : lettres manquantes, graphèmes et mots découpés.
const letterList=`bateau ballon banane bouche robe cube arbre robot domino dame dent cadeau salade radis papa poule pomme lapin tapis pirate quatre quille équipe coq bébé biberon bijou bocal bonnet bouchon bouton bureau cabane bague barque barbe brosse brique brebis bison bassin biscuit bouteille bonbon bouche bougie bulle balcon bœuf baleine bêche bordure banquise banque début décor danse dragon drapeau doigt douze douche dé domino doudou dentiste diamant disque dimanche dinde dos duvet dauphin dromadaire jardin médaille corde rideau pédale pommier panier poisson pont pantalon panda parapluie poupée poussin peluche plume pigeon poulet patin planète porte poire poche prairie peinture pouce papillon prison requin masque brique musique paquet quatorze quartier pourquoi presque qui quand liquide`.split(/\s+/);
export const EXTRA_LETTER_WORDS=[...new Set(letterList)].map(word=>{const i=word.search(/[bdpq]/);return {word,before:word.slice(0,i),target:word[i],after:word.slice(i+1),level:1};});
const graphs=`
bateau|eau chapeau|eau cadeau|eau château|eau râteau|eau rideau|eau drapeau|eau gâteau|eau plateau|eau marteau|eau pinceau|eau tableau|eau manteau|eau bureau|eau oiseau|eau
chaud|au jaune|au aussi|au autour|au faute|au pauvre|au gauche|au sauge|au taupe|au dauphin|au
neige|ei reine|ei peine|ei veine|ei seize|ei treize|ei baleine|ei peigne|ei beige|ei freiner|ei
roi|oi poire|oi voiture|oi étoile|oi boîte|oî boire|oi voile|oi armoire|oi noix|oi soir|oi trois|oi tiroir|oi poisson|oi
poule|ou roue|ou mouton|ou loupe|ou soupe|ou rouge|ou bouche|ou douche|ou mouche|ou souris|ou jouet|ou genou|ou hibou|ou chou|ou caillou|ou
lapin|in sapin|in jardin|in matin|in moulin|in chemin|in coussin|in patin|in poussin|in requin|in
ballon|on bouton|on maison|on bonbon|on camion|on cochon|on pont|on lion|on citron|on dragon|on pantalon|on chanson|on
manteau|an enfant|en dent|en plante|an branche|an orange|an panda|an ruban|an maman|an grand|an dimanche|an
coin|oin point|oin soin|oin foin|oin besoin|oin témoin|oin joint|oin moins|oin nuit|ui pluie|ui huile|ui fruit|ui cuisine|ui huit|ui
chat|ch cheval|ch chemise|ch chocolat|ch chameau|ch chouette|ch photo|ph éléphant|ph téléphone|ph phare|ph dauphin|ph
montagne|gn campagne|gn araignée|gn ligne|gn poignée|gn peigne|gn guitare|gu bague|gu vague|gu guêpe|gu pigeon|ge orangeade|ge
travail|ail paille|aille portail|ail bataille|aille soleil|eil abeille|eille bouteille|eille oreille|eille feuille|euille écureuil|euil
bille|ille cahier|ier panier|ier pompier|ier escalier|ier bleu|eu fleur|eu peur|eu nœud|œu cœur|œu sœur|œu
maison|ai fraise|ai chaise|ai lait|ai balai|ai palais|ai chambre|am tambour|am lampe|am jambe|am champ|am temps|em ensemble|em tempête|em
ombre|om nombre|om concombre|om timbre|im simple|im train|ain pain|ain main|ain bain|ain copain|ain demain|ain faim|aim plein|ein peinture|ein brun|un parfum|um
`;
export const EXTRA_GRAPH_WORDS=graphs.trim().split(/\s+/).map(s=>{const [word,target]=s.split('|'),i=word.indexOf(target);if(i<0)throw new Error(s);return {word,before:word.slice(0,i),target,after:word.slice(i+target.length),level:['gn','ph','gu','ge','ail','aille','eil','eille','euille','euil','œu','am','em','om','im','ain','aim','ein','un','um','ui','oin'].includes(target)?2:1};});
// Banque orale distincte : les e muets ne deviennent pas une syllabe à trouver.
const spoken=`cha-peau ba-teau ca-deau la-pin sa-pin mou-ton mai-son ro-bot ta-pis jar-din ma-man pa-pa bé-bé dé-fi dé-but dé-cor dé-gât dé-pôt dé-tour do-ré du-vet
bo-bine bo-nnet bou-ton bou-chon ba-lai bu-reau bi-jou bo-cal ber-ceau bi-don ba-ron bâ-ton
ca-nard ca-mion co-chon ci-tron co-ton cou-sin co-quin ca-fé ca-rotte ca-bane ca-rafe
ce-rise che-min che-val che-nille cha-let cha-meau cha-grin cha-ton châ-teau chi-gnon
dra-gon dra-peau dan-seur dou-ceur dau-phin de-main des-sin di-manche dé-sert dî-ner
fa-rine fa-got fa-çon fu-mée fe-nêtre fou-lard four-mi fi-let fa-mille fro-mage
gâ-teau gui-tare ga-let ga-zon gen-darme gi-rafe gla-çon gra-vier gre-nouille gui-don gui-mauve
ha-mac hi-bou hi-ver hu-main hu-meur jou-jou jour-nal ju-ment la-ma la-vage
li-las lu-tin lé-zard lé-gume ma-tin ma-rin mou-lin mo-teur mon-tagne mou-choir mou-stache
no-ël nou-gat nou-veau ni-veau o-rage oi-seau pan-da pa-tin pa-vé pa-quet pa-pier pé-pin pi-geon pi-quet pi-lote po-ney po-tage pou-let
ra-dis ra-deau râ-teau re-nard re-pas ri-deau ri-vage ro-cher rou-leau ru-ban sa-bot sa-chet sa-von se-cret si-rop so-leil sou-ris ta-lon ta-bleau tam-bour tor-tue tou-pie tré-sor tri-cot tu-lipe wa-gon va-lise ve-lours vé-lo vi-sage voi-ture
sa-lade ba-nane to-mate pi-rate do-mi-no cho-co-lat pa-ra-pluie a-ni-mal ci-né-ma ca-mé-ra ca-na-pé
ab-ri-cot a-na-nas a-ra-chide a-ra-ignée ar-ti-chaut a-vo-cat bi-cy-clette ca-ra-mel ca-ra-vane ca-ta-logue cé-ré-ale cham-pi-gnon che-mi-née co-li-bri co-mé-die co-quil-lage cro-co-dile dé-ci-mal dé-co-rer dé-li-cat dé-mar-rer dé-po-ser dé-rou-ler
é-cri-ture é-lé-phant é-le-vage é-mo-tion es-ca-lier es-car-got é-ta-gère fa-bri-quer fa-vo-ri fo-res-tier fro-ma-ger ga-lo-per ga-ra-giste gé-o-graphe li-bé-rer li-mi-ter li-mo-nade ma-ga-sin ma-la-die ma-ri-nade mé-de-cin mi-né-ral mo-ni-teur na-vi-guer né-nu-phar nu-mé-ro o-pé-ra pa-ra-sol pa-ti-ner pé-li-can pi-a-no po-ta-ger pro-me-nade py-ja-ma ra-con-ter ra-mas-ser ré-ci-ter ré-ga-ler ré-pa-rer ré-u-nir ri-go-ler sa-la-mandre sa-me-di sou-ve-nir ta-bou-ret té-lé-phone to-bog-gan u-ni-vers vé-ri-té vi-si-ter
lo-co-mo-tive té-lé-vi-sion rhi-no-cé-ros hé-li-cop-tère or-di-na-teur o-ca-ri-na hi-ppo-po-tame ap-pa-ri-tion in-for-ma-tion dé-co-ra-tion li-bé-ra-tion a-ni-ma-tion pré-pa-ra-tion ré-pé-ti-tion é-du-ca-tion ré-pa-ra-tion gé-o-gra-phie gé-o-mé-trie é-co-no-mie é-co-lo-gie pho-to-gra-phie ma-thé-ma-tique mé-di-ca-ment tem-pé-ra-ture mul-ti-co-lore mé-té-o-rite sa-tis-fac-tion`;
export const SYLLABLE_WORDS=spoken.trim().split(/\s+/).map(s=>{const parts=s.split('-');return {word:parts.join(''),parts,level:parts.length-1};});
