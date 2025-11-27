export const countryCodeMap: Record<string, string> = {
  'France': 'fr',
  'Tunisie': 'tn',
  'Brésil': 'br',
  'Italie': 'it',
  'Canada': 'ca',
  'Australie': 'au',
  'Allemagne': 'de',
  'Espagne': 'es',
  'Afrique du Sud': 'za'
};

export function getFlagSmall(name: string) {
  const code = countryCodeMap[name];
  return code ? `https://flagcdn.com/w40/${code}.png` : undefined;
}

export function getFlagLarge(name: string) {
  const code = countryCodeMap[name];
  return code ? `https://flagcdn.com/w320/${code}.png` : undefined;
}
