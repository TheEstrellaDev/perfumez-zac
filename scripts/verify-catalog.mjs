import assert from 'node:assert/strict';
import { business, whatsappLink } from '../src/data/business.ts';
import { filterFragrances, fragrances } from '../src/data/fragrances.ts';

assert.equal(fragrances.length, 68, 'El catálogo debe contener 65 fragancias y tres productos de feromonas.');
assert.equal(new Set(fragrances.map(({ id }) => id)).size, fragrances.length, 'Los ids deben ser únicos.');
assert.equal(fragrances.filter(({ classifications }) => classifications.includes('Diseñador')).length, 65);
assert.equal(fragrances.filter(({ classifications }) => classifications.includes('Feromonas')).length, 3);

const sourceCodes = fragrances.filter(({ catalogCode }) => catalogCode).map(({ sourceFile, catalogCode }) => `${sourceFile}:${catalogCode}`);
assert.equal(new Set(sourceCodes).size, sourceCodes.length, 'No debe repetirse un código dentro del mismo PDF.');

assert.equal(filterFragrances(fragrances, { query: 'a la rose' })[0]?.name, 'À la Rose', 'La búsqueda debe ignorar acentos.');
assert.equal(filterFragrances(fragrances, { query: 'sCANdal pour hOMme' })[0]?.name, 'Scandal Pour Homme', 'La búsqueda debe ignorar mayúsculas.');
assert.equal(filterFragrances(fragrances, { query: 'cherr' })[0]?.name, 'Lost Cherry', 'La búsqueda debe aceptar coincidencias parciales.');
assert.equal(filterFragrances(fragrances, { query: 'young' })[0]?.aliases?.[0], 'NOX Young', 'La búsqueda debe incluir nombres de equivalencia.');

const unisexDesigner = filterFragrances(fragrances, { group: 'Unisex', classification: 'Diseñador' });
assert.equal(unisexDesigner.length, 17, 'Los filtros de grupo y estilo deben poder combinarse.');
assert.equal(filterFragrances(fragrances, { group: 'Unisex', query: 'tom ford' }).length, 2, 'La búsqueda debe encontrar la casa dentro de una colección filtrada.');
assert.equal(filterFragrances(fragrances, { classification: 'Nicho' }).length, 0, 'Las clasificaciones no documentadas no deben inventar resultados.');
assert.equal(filterFragrances(fragrances, { classification: 'Feromonas' }).length, 3, 'La línea documentada debe aparecer en el filtro correspondiente.');

const url = new URL(whatsappLink('Hola, me interesa Scandal Pour Homme en 30 ml.'));
assert.equal(url.hostname, 'wa.me');
assert.equal(url.pathname, `/${business.whatsappNumber}`);
assert.match(url.searchParams.get('text') ?? '', /30 ml/);
assert.deepEqual(business.sizes, ['30 ml', '60 ml']);

console.log('Verificación correcta: 65 referencias únicas, tres productos de feromonas, búsqueda, filtros combinados y enlace de WhatsApp.');
