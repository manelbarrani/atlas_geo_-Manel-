// Local flag asset resolver. Ensure the images exist inside assets/flags/
// Recommended file names (lowercase country code):
// fr.png, tn.png, br.png, it.png, ca.png, au.png, de.png, es.png, za.png
// For a large Tunisia image we already have: tunisia_big.png (can also add others e.g. fr_large.png etc.)

// IMPORTANT:
// Your actual files (seen in assets/flags):
// al.png, au.png, br.svg, cn.png, es.png, fr.webp, it.jpg, tu.webp, za.png
// React Native (without extra libs) supports png/jpg/webp (webp needs platform support). SVG needs react-native-svg + metro config.
// For now we will map what exists; for the SVG (br.svg) we will fallback to globe unless you convert it (recommend br.png).
// Recommended renames for clarity (ISO codes): al.png -> de.png (Allemagne), cn.png -> ca.png (Canada), tu.webp -> tn.png (Tunisie), fr.webp -> fr.png.
// Until you rename, we use current filenames.
const smallFlags: Record<string, any> = {
  France: require('../../assets/flags/fr.webp'),
  Tunisie: require('../../assets/flags/tu.webp'),
  // Brésil has br.svg; cannot require SVG directly here without extra setup -> will be undefined so we fallback.
  Italie: require('../../assets/flags/it.jpg'),
  Canada: require('../../assets/flags/cn.png'),
  Australie: require('../../assets/flags/au.png'),
  Allemagne: require('../../assets/flags/al.png'),
  Espagne: require('../../assets/flags/es.png'),
  'Afrique du Sud': require('../../assets/flags/za.png')
};

// Large variants optional; fallback to small if missing.
const largeFlags: Record<string, any> = {
  Tunisie: require('../../assets/Tunisia_Big.png')
  // Add others like:
  // France: require('../../../assets/flags/fr_large.png')
};

export function getLocalFlagSmall(name: string) {
  // Brésil fallback (svg issue) -> return undefined so caller can show placeholder.
  if (name === 'Brésil') return undefined;
  return smallFlags[name];
}

export function getLocalFlagLarge(name: string) {
  return largeFlags[name] || smallFlags[name];
}
