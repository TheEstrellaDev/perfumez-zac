export type ScentGroup = 'Hombre' | 'Mujer' | 'Unisex';
export type ScentClassification = 'Diseñador' | 'Nicho' | 'Artistas' | 'Feromonas';

export interface Fragrance {
  id: string;
  name: string;
  house: string;
  group: ScentGroup | null;
  classifications: ScentClassification[];
  catalogCode?: string;
  sourceFile: string;
  sourcePage: number;
  aliases?: string[];
  availableSizes?: string[];
}

type Entry = [id: string, code: string, name: string, house: string, page: number, alias?: string];

const make = (group: ScentGroup, sourceFile: string, entries: Entry[]): Fragrance[] =>
  entries.map(([id, catalogCode, name, house, sourcePage, alias]) => ({
    id,
    catalogCode,
    name,
    house,
    group,
    classifications: ['Diseñador'],
    sourceFile,
    sourcePage,
    ...(alias ? { aliases: [alias] } : {}),
  }));

const menFile = 'Catálogo fragancia Man _20260618_121231_0000.pdf';
const womenFile = 'Catálogo fragancia woman _20260618_121312_0000.pdf';
const unisexFile = 'Catálogo fragancia unisex _20260618_121407_0000.pdf';

export const fragrances: Fragrance[] = [
  ...make('Hombre', menFile, [
    ['h-01', '01', 'Scandal Pour Homme', 'Jean Paul Gaultier', 2],
    ['h-02', '02', 'Ultra Male', 'Jean Paul Gaultier', 3],
    ['h-03', '03', 'Valentino Uomo', 'Valentino', 4],
    ['h-04', '04', 'Happy for Men', 'Clinique', 5],
    ['h-05', '05', 'Voyage', 'Nautica', 6],
    ['h-06', '06', 'Wanted by Night', 'Azzaro', 7],
    ['h-07', '07', 'Dior Homme', 'Dior', 8, 'NOX Élite'],
    ['h-09', '09', 'Bright Leather', 'Salvatore Ferragamo', 10],
    ['h-10', '10', 'Perry 18', 'Perry Ellis', 11],
    ['h-11', '11', 'Pour Homme', 'Versace', 12],
    ['h-12', '12', 'Phantom', 'Paco Rabanne', 13],
    ['h-13', '13', 'Black XS', 'Paco Rabanne', 14],
    ['h-14', '14', 'The One Masculino', 'Dolce & Gabbana', 15],
    ['h-15', '15', 'One Million', 'Paco Rabanne', 16],
    ['h-16', '16', 'L.12.12 Noir (Black)', 'Lacoste', 17],
    ['h-17', '17', 'Wood Essence', 'Bvlgari', 18],
    ['h-18', '18', 'Spicebomb', 'Viktor & Rolf', 19],
    ['h-19', '19', 'Invictus Victory Elixir', 'Paco Rabanne', 20],
    ['h-20', '20', '212 Heroes Forever Young', 'Carolina Herrera', 21, 'NOX Young'],
    ['h-21', '21', 'The Scent Le Parfum', 'Hugo Boss', 22],
    ['h-22', '22', 'Polo Red', 'Ralph Lauren', 23],
  ]),
  ...make('Mujer', womenFile, [
    ['m-01', '01', 'Paris Hilton', 'Paris Hilton', 2],
    ['m-11', '11', 'Sì Passione', 'Giorgio Armani', 3],
    ['m-24', '24', '360° for Women', 'Perry Ellis', 4],
    ['m-26', '26', 'First Instinct Blue for Her', 'Abercrombie & Fitch', 5, 'NOX Instinct'],
    ['m-02', '02', 'Halloween', 'Jesús del Pozo', 6],
    ['m-03', '03', 'Good Girl', 'Carolina Herrera', 7, 'NOX Queen'],
    ['m-05', '05', 'CK One Shock for Her', 'Calvin Klein', 8],
    ['m-06', '06', 'Call Me Darling', 'Carolina Herrera', 9],
    ['m-23', '23', 'CH', 'Carolina Herrera', 10, 'NOX Chick'],
    ['m-04', '04', 'Loverdose', 'Diesel', 11],
    ['m-08', '08', 'Cool Water Reborn Women', 'Davidoff', 12],
    ['m-09', '09', 'Under the Sea', 'Carolina Herrera', 13],
    ['m-07', '07', 'Coco Mademoiselle', 'Chanel', 14],
    ['m-10', '10', 'Fantasy Naked', 'Britney Spears', 15],
    ['m-12', '12', 'Yellow Diamond', 'Versace', 16, 'NOX Diamond'],
    ['m-13', '13', 'Very Purple', 'Perry Ellis', 17],
    ['m-14', '14', 'Selena Gomez', 'Selena Gomez', 18],
    ['m-15', '15', 'Ruby Rush', 'Paris Hilton', 19, 'NOX Ruby'],
    ['m-16', '16', 'Happy', 'Clinique', 20],
    ['m-17', '17', 'Fame', 'Paco Rabanne', 21],
    ['m-18', '18', 'Dylan Blue Pour Femme', 'Versace', 22, 'NOX Sapphire'],
    ['m-19', '19', 'The Scent for Her', 'Hugo Boss', 23],
    ['m-20', '20', 'Wild Rose Eau de Parfum', 'Coach', 24],
    ['m-21', '21', 'Fresh Couture', 'Moschino', 25],
    ['m-22', '22', 'Good Girl Blush', 'Carolina Herrera', 26],
    ['m-25', '25', 'Joy by Dior', 'Dior', 27, 'NOX Bliss'],
    ['m-27', '27', 'Lipstick On', 'Maison Margiela', 29, 'NOX Satin'],
  ]),
  ...make('Unisex', unisexFile, [
    ['u-01', '01', 'City of Stars', 'Louis Vuitton', 2],
    ['u-02', '02', 'Layton', 'Parfums de Marly', 3],
    ['u-03', '03', 'Armani Code Parfum', 'Giorgio Armani', 4],
    ['u-04', '04', 'Habdan', 'Parfums de Marly', 5, 'NOX Sultan'],
    ['u-05', '05', 'CK One Gold', 'Calvin Klein', 6, 'NOX Aurum'],
    ['u-06', '06', 'Herod', 'Parfums de Marly', 7, 'NOX Emperor'],
    ['u-07', '07', 'Lost Cherry', 'Tom Ford', 8, 'NOX Cherry'],
    ['u-08', '08', 'Oud Saffron', 'Orientica', 9, 'NOX Saffron Eclipse'],
    ['u-09', '09', '724', 'Maison Francis Kurkdjian', 10, 'NOX 724 Skyline'],
    ['u-10', '10', 'California Dream', 'Calvin Klein', 11, 'NOX Pacific Dream Mirage'],
    ['u-11', '11', 'À la Rose', 'Maison Francis Kurkdjian', 12],
    ['u-12', '12', 'Delina', 'Parfums de Marly', 13],
    ['u-13', '13', "Angel's Share", 'Kilian Paris', 14],
    ['u-14', '14', 'Splendid Vanilla', 'Roberto Cavalli', 15],
    ['u-15', '15', 'Sorrel & Lemon Thyme', 'Jo Malone London', 16],
    ['u-16', '16', 'CK One', 'Calvin Klein', 17, 'NOX One Essence'],
    ['u-17', '17', 'Ombre Leather', 'Tom Ford', 18],
  ]),
  {
    id: 'f-caballero', name: 'Feromonas Caballero', house: '', group: 'Hombre',
    classifications: ['Feromonas'], sourceFile: menFile, sourcePage: 24, availableSizes: [],
  },
  {
    id: 'f-dama', name: 'Feromonas Dama', house: '', group: 'Mujer',
    classifications: ['Feromonas'], sourceFile: womenFile, sourcePage: 30, availableSizes: [],
  },
  {
    id: 'f-perfume', name: 'Perfume con feromonas', house: '', group: null,
    classifications: ['Feromonas'], sourceFile: menFile, sourcePage: 26, availableSizes: [],
  },
];

export const groups: ScentGroup[] = ['Hombre', 'Mujer', 'Unisex'];
export const classifications: ScentClassification[] = ['Diseñador', 'Nicho', 'Artistas', 'Feromonas'];

export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function searchText(item: Fragrance): string {
  return normalize([item.name, item.house, item.group, item.catalogCode, ...(item.aliases ?? [])].join(' '));
}

export interface FragranceFilters {
  query?: string;
  group?: ScentGroup | 'Todas';
  classification?: ScentClassification | 'Todas';
  alphabetical?: boolean;
}

export function filterFragrances(items: Fragrance[], filters: FragranceFilters = {}): Fragrance[] {
  const query = normalize(filters.query?.trim() ?? '');
  const results = items.filter((item) => {
    const matchesQuery = !query || searchText(item).includes(query);
    const matchesGroup = !filters.group || filters.group === 'Todas' || item.group === filters.group;
    const matchesClassification = !filters.classification || filters.classification === 'Todas' || item.classifications.includes(filters.classification);
    return matchesQuery && matchesGroup && matchesClassification;
  });
  return filters.alphabetical ? [...results].sort((a, b) => a.name.localeCompare(b.name, 'es')) : results;
}
