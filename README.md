# atlas_geo_-Manel-
# Atlas Géographique (atlas_geo_$Manel$)

Application mobile React Native (Expo + TypeScript) conforme au sujet d’examen « Développement Mobile Cross Plateforme ». Elle présente un atlas interactif avec:
- Écran d’accueil (Welcome) avec AppBar, image, texte et bouton « Explorer ».
- Écran principal (Countries) listant les pays (nom + capitale + drapeau miniature) avec un menu latéral (Drawer).
- Écran de détails (CountryDetail) affichant drapeau en grand, capitale, population, superficie, langue officielle.

## Technologies et librairies utilisées
- Expo SDK 48: outil de démarrage et de bundling.
- React 18 + React Native 0.71.14: framework UI pour mobile.
- TypeScript: typage statique des données et composants.
- React Navigation:
  - `@react-navigation/native`: conteneur de navigation.
  - `@react-navigation/native-stack`: navigation empilée pour liste → détails.
  - `@react-navigation/drawer`: menu latéral (Accueil / À propos / Quitter).
- Gesture/animation (peer deps Expo):
  - `react-native-gesture-handler`, `react-native-reanimated`, `react-native-screens`, `react-native-safe-area-context`.

## Architecture du projet
- `App.tsx`: Point d’entrée et configuration globale de la navigation.
  - `Stack.Navigator` externe: `Welcome` puis `MainDrawer`.
  - `Drawer.Navigator` interne: `HomeStack` (liste + détails) et `About`.
  - `HomeStack`: `Countries` (liste) → `CountryDetail` (détails).
  - `CustomDrawerContent`: en-tête (globe), options: Accueil, À propos, Quitter.
- `src/screens/WelcomePage.tsx`: Écran d’accueil.
  - AppBar « Atlas Géographique », image `assets/globe.png`, texte « Découvrez les pays du monde », bouton « Explorer » → `MainDrawer`.
- `src/screens/CountriesPage.tsx`: Liste des pays.
  - AppBar « Liste des Pays » + bouton hamburger pour ouvrir le Drawer.
  - `FlatList` sur `src/data/pays_info.json`.
  - Miniature du drapeau: images locales dans `assets/flags/` via `src/utils/flagsLocal.ts` (fallback lettre si indisponible).
- `src/screens/CountryDetailPage.tsx`: Détails d’un pays.
  - AppBar retour ←, titre = nom du pays.
  - Drapeau grand (Tunisie: `assets/Tunisia_Big.png`, sinon drapeau miniature ou globe), cartes d’informations (capitale, population, superficie, langue).
- `src/screens/AboutPage.tsx`: Écran « À propos ».
- `src/data/pays_info.json`: Données fournies (nom, capitale, population, superficie, langues).
- `src/utils/flagsLocal.ts`: Résolution des drapeaux depuis `assets/flags/` (png/jpg/webp pris en charge par RN; svg non pris en charge sans lib).
- Config:
  - `app.json`: configuration Expo.
  - `tsconfig.json`: configuration TypeScript (extends `expo/tsconfig.base`).
  - `babel.config.js`: preset Expo + plugin Reanimated.

## Chemins des assets (important)
- Images attendues par le code:
  - `assets/globe.png`
  - `assets/Tunisia_Big.png` (grand format Tunisie)
  - Drapeaux miniatures dans `assets/flags/`:
    - Allemagne: `al.png` (recommandé: `de.png`)
    - Australie: `au.png`
    - Canada: `cn.png` (recommandé: `ca.png`)
    - Espagne: `es.png`
    - France: `fr.webp` (recommandé: `fr.png`)
    - Italie: `it.jpg` (recommandé: `it.png`)
    - Tunisie: `tu.webp` (recommandé: `tn.png`)
    - Afrique du Sud: `za.png`
    - Brésil: convertir `br.svg` → `br.png` (RN ne charge pas SVG par défaut).

› Remarque: Les chemins ont été ajustés pour pointer correctement depuis `src/*` vers `assets/*` via `../../assets/...`.

## Installation et exécution (Windows PowerShell)
Pré-requis:
- Node.js (LTS recommandé)
- Android Studio (pour émulateur)
- Expo local CLI (inclus dans `expo`): utilisez `npx expo ...`.

Installation:
```powershell
cd "C:\Users\DELL\Desktop\dev tp\atlas_geo_$Manel$"
npm install
# Peer deps pour React Navigation (Expo):
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer
# Aligner RN avec Expo SDK 48
npx expo install react-native@0.71.14
```

Démarrer Metro:
```powershell
npx expo start -c
# a: ouvrir Android (émulateur)
# w: ouvrir Web (si deps web installées)
```

Si vous voyez « web dependencies manquantes » et souhaitez utiliser le web:
```powershell
npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
```

## Guide Android (émulateur)
- Android Studio → Tools → Device Manager → Pixel 7/8 Pro.
- Menu → Wipe Data (si stockage insuffisant), puis Start.
- Si Expo Go obsolète, acceptez la mise à jour lors de l’ouverture depuis Expo.
- Sans `adb`, vous pouvez tout faire depuis Device Manager; sinon ajoutez `platform-tools` au PATH.

## Logique et respect des consignes (écran par écran)
- WelcomePage:
  - AppBar « Atlas Géographique ».
  - Image de bienvenue (`globe.png`).
  - Texte: « Découvrez les pays du monde ».
  - Bouton « Explorer »: `navigation.replace('MainDrawer')` pour entrer dans l’application principale.
- CountriesPage:
  - AppBar « Liste des Pays » + hamburger: ouvre le Drawer (`DrawerActions.openDrawer()`).
  - `FlatList` avec éléments cliquables: affiche nom + capitale + miniature de drapeau.
  - Press: `navigation.navigate('CountryDetail', { country: item })`.
  - Drawer latéral:
    - Accueil: `navigation.navigate('HomeStack')`.
    - À propos: `navigation.navigate('About')`.
    - Quitter: `Alert` + `navigation.reset({ routes: [{ name: 'Welcome' }] })`.
- CountryDetailPage:
  - AppBar retour ←, titre = nom du pays.
  - Drapeau en grand (Tunisie: `Tunisia_Big.png`, sinon drapeau miniature si dispo, sinon globe).
  - Cartes: Capitale, Population, Superficie, Langue officielle.

## Données et types
- `src/data/pays_info.json`: tableau d’objets avec clés `nom`, `capitale`, `population`, `superficie`, `langues`.
- `src/types.ts`: interface `Country` définissant la forme des données.

## Navigation et structure technique
- `NavigationContainer` (racine).
- `Stack.Navigator` externe: gérer l’entrée (Welcome) et la zone principale (MainDrawer).
- `Drawer.Navigator` interne: menu latéral, routes principales.
- `Stack.Navigator` interne (`HomeStack`): liste → détails.

## Styling
- Styles RN via `StyleSheet.create`.
- Thème:
  - Welcome: fond sombre (#0f1724), bouton primaire bleu (#1776ff), image centrée.
  - Liste: fond clair, cartes blanches avec ombre légère.
  - Détails: image large arrondie, cartes d’infos avec fond doux.

## Limitations et améliorations possibles
- SVG non supporté nativement: convertir `br.svg` → `br.png`.
- Normalisation des noms de fichiers (ISO codes) recommandée.
- Améliorations:
  - Barre de recherche dans `CountriesPage`.
  - Tri/sorting, favoris (AsyncStorage).
  - Thème sombre/clair.
  - Flags complets grand format par pays.

## Dépannage
- Erreur « Module not found » (images): vérifier les chemins `../../assets/...` et l’existence des fichiers.
- Stockage insuffisant sur émulateur: AVD Manager → Edit → augmenter Internal Storage → Wipe Data.
- Incompatibilités de versions: exécuter `npx expo install` pour aligner avec l’SDK.
- Nettoyer le cache Metro: `npx expo start -c`.

## Licence & crédits
- Projet pédagogique pour examen; assets fournis par l’étudiant.

