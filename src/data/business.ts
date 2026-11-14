export const business = {
  name: 'NOVA SCENTS',
  tagline: 'Deja huella, deja esencia.',
  whatsappNumber: '524923306616',
  phoneDisplay: '+52 492 330 6616',
  instagramUrl: '',
  facebookUrl: '',
  sizes: ['30 ml', '60 ml'] as const,
  equivalenceClaim: '98%',
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
