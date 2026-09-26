# HALO — Habiter la lumière

Une première maquette de site autour d’un luminaire sculptural fictif. Les sections, les médias et les animations peuvent servir de base à d’autres projets : design, mobilier, cosmétique, studio créatif ou produit technologique.

## Lancer le projet

Avec Node.js 20 ou plus récent, dans ce dossier :

```sh
npm run dev
```

Ouvrir `http://127.0.0.1:4173`. Aucun paquet à installer. Le site est statique : le dossier `dist` contient la totalité des fichiers à héberger. Un serveur HTTP est nécessaire pour les modules JavaScript ; ne pas ouvrir le HTML en double-cliquant dessus.

## Réutiliser les sections

| Module dans `dist/index.html` | Fonction | Adaptation principale |
| --- | --- | --- |
| `.hero` | Ouverture avec vidéo silencieuse et parallaxe légère | Titres, vidéo, image de secours |
| `.intro` | Composition éditoriale avec apparition progressive | Texte, couleurs |
| `[data-story]` | Trois scènes liées à la progression du défilement | Chapitres, visuel, rythme |
| `.material` | Détail de matière et accordéons natifs | Image, titres, textes |
| `.marquee` | Bandeau typographique animé | Phrase, couleur, vitesse |
| `.gallery-section` | Galerie avec zoom au survol et agrandissement | Images, légendes, `dist/content.js` |
| `.light-lab` | Ambiance lumineuse réglable au clavier ou au toucher | Visuel, plage de luminosité |

Copier la section voulue avec ses styles dans `dist/styles.css`. Conserver les variables `:root`, les règles globales et les adaptations mobiles. Les comportements de `dist/motion.js` ignorent les sections absentes. Pour la galerie, conserver aussi le dialogue `.lightbox` et le fichier `dist/content.js`. Le réglage de lumière est une simulation visuelle sur l’image.

Les couleurs, les polices, les marges et la courbe d’animation sont définies au début de `dist/styles.css`. Les textes sont éditables directement dans le HTML ; les légendes des vues agrandies se trouvent dans `dist/content.js`.

## Médias

- `dist/assets/hero.webp` : vue du luminaire, 2688 × 1520.
- `dist/assets/detail.webp` : matière et diffuseur, 2336 × 1744.
- `dist/assets/halo-loop.mp4` : vidéo silencieuse de 5 secondes environ, première et dernière images contraintes à la même référence.

Deux images générées avec GPT Image 2.5 et une vidéo Kling 3.0 via Higgsfield. Production du 26 septembre 2026 : **13 crédits**, solde contrôlé ensuite **138,5 crédits**. La boucle est générative et peut présenter une légère variation au raccord. Le site n’effectue aucun nouvel appel de génération et ne consomme aucun crédit en le consultant.

HALO est une étude visuelle fictive, sans catalogue marchand ni caractéristiques techniques commerciales. Les photos représentent un concept généré. Les polices DM Sans et Manrope sont servies par Google Fonts, avec des polices système de secours.

## Accessibilité et mouvement

Le bouton « Pause » désactive la vidéo, les animations de défilement et le bandeau. La préférence système de réduction des mouvements est respectée au chargement. Les trois chapitres deviennent alors une lecture continue. Les accordéons sont natifs, la galerie se ferme avec Échap et rend le focus à sa carte. Le réglage d’intensité fonctionne avec les flèches, Début et Fin. Les images restent visibles quand la vidéo ne peut pas démarrer.

## GitHub

Dépôt du projet : [Poloveni/halo-studio](https://github.com/Poloveni/halo-studio).

Pour récupérer le projet sur un autre ordinateur :

```sh
git clone https://github.com/Poloveni/halo-studio.git
cd halo-studio
npm run dev
```

Le code et les médias sont inclus dans le dépôt. Le dossier `dist` peut être hébergé par tout service de sites statiques. Le fichier `.openai/hosting.json` conserve l’identifiant d’une réservation Sites ; aucune mise en ligne Sites n’a été effectuée. Ne jamais ajouter de jeton GitHub aux fichiers du projet.

## Vérification rapide

```sh
npm run check
```

Vérifier ensuite la lecture sur ordinateur et mobile, les trois étapes du défilement, l’ouverture et la fermeture de la galerie, les accordéons, le réglage d’intensité et le bouton de pause. Après une modification CSS, incrémenter le paramètre `?v=` du lien de feuille de style dans le HTML si un aperçu conserve une ancienne version.
