import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { business, whatsappLink } from './data/business';
import {
  classifications,
  filterFragrances,
  fragrances,
  groups,
  type Fragrance,
  type ScentClassification,
  type ScentGroup,
} from './data/fragrances';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function inquiryMessage(fragrance?: Fragrance, size?: string): string {
  if (!fragrance) return `Hola, me gustaría conocer más sobre las fragancias y presentaciones de ${business.name}.`;
  const sizes = fragrance.availableSizes ?? business.sizes;
  const inspiration = fragrance.house ? ` (inspirada en ${fragrance.house} ${fragrance.name})` : '';
  const presentation = size ?? (sizes.length ? sizes.join(' o ') : 'la presentación disponible');
  return `Hola, me interesa la fragancia ${fragrance.aliases?.[0] ?? fragrance.name}${inspiration} en presentación de ${presentation}. ¿Podrían darme más información?`;
}

function App() {
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<ScentGroup | 'Todas'>('Todas');
  const [classificationFilter, setClassificationFilter] = useState<ScentClassification | 'Todas'>('Todas');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFragrance, setActiveFragrance] = useState<Fragrance | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => {
    return filterFragrances(fragrances, {
      query,
      group: groupFilter,
      classification: classificationFilter,
      alphabetical: sortAlphabetically,
    });
  }, [query, groupFilter, classificationFilter, sortAlphabetically]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return filterFragrances(fragrances, { query }).slice(0, 5);
  }, [query]);

  const counts = useMemo(() => ({
    groups: Object.fromEntries(groups.map((group) => [group, fragrances.filter((item) => item.group === group).length])) as Record<ScentGroup, number>,
    classifications: Object.fromEntries(classifications.map((classification) => [classification, fragrances.filter((item) => item.classifications.includes(classification)).length])) as Record<ScentClassification, number>,
  }), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeFragrance && !dialog.open) dialog.showModal();
    if (!activeFragrance && dialog.open) dialog.close();
  }, [activeFragrance]);

  function selectSuggestion(item: Fragrance) {
    setQuery(item.aliases?.[0] ?? item.name);
    setSuggestionsOpen(false);
    setGroupFilter('Todas');
    setClassificationFilter('Todas');
  }

  function selectClass(classification: ScentClassification) {
    setClassificationFilter((current) => current === classification ? 'Todas' : classification);
    setGroupFilter('Todas');
    document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuggestionsOpen(false);
    document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="brand-lockup" href="#inicio" aria-label="NOVA SCENTS, inicio" onClick={closeMenu}>
          <img src={asset('images/nova-scents-logo.webp')} alt="NOVA SCENTS — Deja huella, deja esencia" width="104" height="68" />
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#catalogo" onClick={closeMenu}>Catálogo</a>
          <button type="button" onClick={() => { setGroupFilter('Hombre'); setClassificationFilter('Todas'); closeMenu(); document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' }); }}>Hombre</button>
          <button type="button" onClick={() => { setGroupFilter('Mujer'); setClassificationFilter('Todas'); closeMenu(); document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' }); }}>Mujer</button>
          <button type="button" onClick={() => { setGroupFilter('Unisex'); setClassificationFilter('Todas'); closeMenu(); document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' }); }}>Unisex</button>
          <button type="button" onClick={() => { selectClass('Nicho'); closeMenu(); }}>Nicho</button>
          <button type="button" onClick={() => { selectClass('Diseñador'); closeMenu(); }}>Diseñador</button>
          <a className="nav-contact" href="#contacto" onClick={closeMenu}>Contacto <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src={asset('images/hero-campaign.webp')} alt="Frasco de perfume de vidrio ámbar sobre piedra, en una escena de luz cálida" width="1600" height="1067" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> Perfumería de inspiración</p>
            <p className="hero-brand">NOVA SCENTS</p>
            <h1 id="hero-title">Deja huella.<br /><em>Deja esencia.</em></h1>
            <p className="hero-description">Descubre aromas que hablan de ti, incluso antes de que digas una palabra.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#catalogo">Explorar fragancias <ArrowRight size={16} /></a>
              <a className="text-link light-link" href="#marca">Conoce la esencia <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <div className="hero-note"><span>01</span><span className="hero-note-rule" /><span>Una firma, muchas formas de sentir</span></div>
          <a className="hero-scroll" href="#marca" aria-label="Desplazarse a la sección de marca"><ChevronDown size={18} /></a>
        </section>

        <section className="brand-story section-pad" id="marca">
          <div className="story-heading">
            <p className="eyebrow"><span /> El arte de elegir</p>
            <h2>Tu aroma también<br /><em>cuenta tu historia.</em></h2>
          </div>
          <div className="story-copy">
            <p className="story-lede">Un perfume no completa un look.<br />Completa la sensación.</p>
            <p>Una selección de fragancias de inspiración para acompañarte a tu manera: notas luminosas para el día, esencias profundas para la noche y hallazgos para cualquier momento.</p>
            <a className="text-link" href="#catalogo">Encuentra tu siguiente aroma <ArrowRight size={16} /></a>
          </div>
          <div className="story-stats" aria-label="Características de la colección">
            <div><strong>98<span>%</span></strong><span>equivalencia anunciada*</span></div>
            <div><strong>30 <i>/</i> 60</strong><span>mililitros</span></div>
            <div><strong>65</strong><span>referencias únicas</span></div>
          </div>
          <p className="claim-note">*Porcentaje comunicado por NOVA SCENTS. Las referencias se presentan únicamente como inspiración olfativa; NOVA SCENTS no está afiliada a las casas mencionadas.</p>
        </section>

        <section className="collections section-pad" aria-labelledby="collections-title">
          <div className="section-heading split-heading">
            <div><p className="eyebrow"><span /> Encuentra tu acorde</p><h2 id="collections-title">A cada quien,<br /><em>su esencia.</em></h2></div>
            <p>Déjate guiar por tu intuición. El catálogo reúne referencias masculinas, femeninas y unisex, listas para explorar.</p>
          </div>
          <div className="collection-grid">
            {groups.map((group, index) => (
              <button className={`collection-card collection-${index + 1}`} type="button" key={group} onClick={() => { setGroupFilter(group); setClassificationFilter('Todas'); document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <img className="collection-photo" src={asset(`images/collection-${index + 1}.webp`)} alt="" width="900" height="900" loading="lazy" />
                <span className="collection-index">0{index + 1} / {String(counts.groups[group]).padStart(2, '0')} FRAGANCIAS</span>
                <span className="collection-mark" aria-hidden="true">{index === 0 ? 'M' : index === 1 ? 'F' : 'U'}</span>
                <span className="collection-bottom"><span><strong>{group === 'Hombre' ? 'Masculinas' : group === 'Mujer' ? 'Femeninas' : 'Unisex'}</strong><small>Descubre la selección</small></span><ArrowUpRightIcon /></span>
              </button>
            ))}
          </div>
          <div className="collection-footnote"><span>Un aroma para cada capítulo.</span><a className="text-link" href="#catalogo">65 fragancias y 3 productos de feromonas <ArrowRight size={16} /></a></div>
        </section>

        <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
          <div className="section-pad catalog-inner">
            <div className="catalog-heading">
              <div><p className="eyebrow"><span /> El catálogo</p><h2 id="catalog-title">Encuentra tu <em>fragancia.</em></h2></div>
              <p>Busca por nombre o casa de inspiración.<br />Tu siguiente favorito puede estar a un acorde de distancia.</p>
            </div>

            <div className="catalog-controls">
              <form className="search-form" onSubmit={handleSearchSubmit} role="search">
                <Search size={20} aria-hidden="true" />
                <label className="sr-only" htmlFor="fragrance-search">Buscar fragancia o casa de inspiración</label>
                <input
                  ref={searchRef}
                  id="fragrance-search"
                  type="search"
                  placeholder="¿Qué aroma buscas?"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setSuggestionsOpen(true); }}
                  onFocus={() => setSuggestionsOpen(true)}
                  onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 150)}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={suggestionsOpen && suggestions.length > 0}
                  aria-controls="search-suggestions"
                />
                {query && <button className="clear-search" type="button" aria-label="Limpiar búsqueda" onClick={() => { setQuery(''); setSuggestionsOpen(false); searchRef.current?.focus(); }}><X size={17} /></button>}
                <button className="search-submit" type="submit" aria-label="Buscar"><ArrowRight size={18} /></button>
                {suggestionsOpen && suggestions.length > 0 && (
                  <div className="suggestion-list" id="search-suggestions" role="listbox" aria-label="Sugerencias de fragancias">
                    {suggestions.map((item) => <button key={item.id} type="button" role="option" aria-selected="false" onMouseDown={(event) => event.preventDefault()} onClick={() => selectSuggestion(item)}><span>{item.aliases?.[0] ?? item.name}</span><small>{item.house} · {item.group}</small></button>)}
                  </div>
                )}
              </form>
              <label className="sort-control"><span>Ordenar:</span><select value={sortAlphabetically ? 'az' : 'catalogo'} onChange={(event) => setSortAlphabetically(event.target.value === 'az')}><option value="catalogo">Catálogo</option><option value="az">A–Z</option></select></label>
            </div>

            <div className="filter-area">
              <div className="filter-row" aria-label="Filtrar por colección">
                <span className="filter-label">Colección</span>
                <button className={`filter-chip ${groupFilter === 'Todas' ? 'selected' : ''}`} type="button" aria-pressed={groupFilter === 'Todas'} onClick={() => setGroupFilter('Todas')}>Todas <span>{fragrances.length}</span></button>
                {groups.map((group) => <button className={`filter-chip ${groupFilter === group ? 'selected' : ''}`} type="button" key={group} aria-pressed={groupFilter === group} onClick={() => setGroupFilter((current) => current === group ? 'Todas' : group)}>{group} <span>{counts.groups[group]}</span></button>)}
              </div>
              <div className="filter-row classifications" aria-label="Filtrar por clasificación">
                <span className="filter-label">Estilo</span>
                {classifications.map((classification) => <button className={`filter-chip ${classificationFilter === classification ? 'selected' : ''} ${counts.classifications[classification] === 0 ? 'no-data' : ''}`} type="button" key={classification} aria-pressed={classificationFilter === classification} onClick={() => setClassificationFilter((current) => current === classification ? 'Todas' : classification)}>{classification} <span>{counts.classifications[classification]}</span></button>)}
              </div>
            </div>

            <div className="results-meta" aria-live="polite"><span>{filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}</span><span className="results-rule" /><span>{query ? `Resultados para “${query}”` : 'Una selección para descubrir'}</span></div>
            {filtered.length ? (
              <div className="product-grid">
                {filtered.map((item, index) => <ProductCard item={item} index={index} key={item.id} onOpen={() => setActiveFragrance(item)} />)}
              </div>
            ) : (
              <div className="empty-state"><Sparkles size={26} strokeWidth={1.25} /><h3>{classificationFilter !== 'Todas' ? `Aún no hay referencias clasificadas como ${classificationFilter.toLowerCase()}.` : 'No encontramos ese aroma.'}</h3><p>{classificationFilter !== 'Todas' ? 'Las fichas disponibles no indican esta clasificación. Puedes quitar el filtro o consultar al equipo.' : 'Prueba con otro nombre, una casa de inspiración o una búsqueda más corta.'}</p><button className="button button-dark" type="button" onClick={() => { setQuery(''); setGroupFilter('Todas'); setClassificationFilter('Todas'); }}>Ver todo el catálogo <ArrowRight size={16} /></button></div>
            )}
            <p className="catalog-disclaimer">Los nombres de casas y fragancias se muestran solo como referencias de inspiración olfativa. No representan productos originales ni una afiliación comercial.</p>
          </div>
        </section>

        <section className="sizes-section section-pad" id="presentaciones">
          <div className="sizes-intro"><p className="eyebrow"><span /> Hecho para llevar contigo</p><h2>Tu aroma,<br /><em>a tu manera.</em></h2><p>Elige el formato que acompaña tu ritmo: una presencia discreta para todos los días o tu esencial de cabecera.</p><a className="text-link" href="#contacto">Pregunta por disponibilidad <ArrowRight size={16} /></a></div>
          <div className="size-feature size-30"><img src={asset('images/presentation-30ml.webp')} alt="Frasco NOVA SCENTS de formato compacto" width="720" height="1280" loading="lazy" /><div><span>01 / PARA LLEVAR</span><strong>30 ml</strong></div></div>
          <div className="size-feature size-60"><img src={asset('images/presentation-60ml.webp')} alt="Etiqueta de una fragancia NOVA SCENTS en presentación de 60 mililitros" width="720" height="720" loading="lazy" /><div><span>02 / TU ESENCIAL</span><strong>60 ml</strong></div></div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-image-wrap"><img src={asset('images/packaging.webp')} alt="Empaque de NOVA SCENTS" width="720" height="1280" loading="lazy" /></div>
          <div className="contact-copy"><p className="eyebrow"><span /> Estamos para ayudarte</p><h2>¿Buscas una<br /><em>fragancia especial?</em></h2><p>Cuéntanos qué aroma tienes en mente. Te ayudamos a encontrarlo en el catálogo y a conocer las presentaciones disponibles.</p><a className="button button-gold" href={whatsappLink(inquiryMessage())} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Escríbenos por WhatsApp <ArrowRight size={16} /></a><span className="contact-number">{business.phoneDisplay}</span></div>
          <div className="contact-mark" aria-hidden="true">NS</div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-logo" href="#inicio"><img src={asset('images/nova-scents-logo.webp')} alt="NOVA SCENTS" width="104" height="68" loading="lazy" /></a>
        <p className="footer-tagline">Deja huella.<br /><em>Deja esencia.</em></p>
        <nav className="footer-links" aria-label="Enlaces del pie de página"><a href="#inicio">Inicio</a><a href="#catalogo">Catálogo</a><a href="#presentaciones">Presentaciones</a><a href="#contacto">Contacto</a></nav>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} NOVA SCENTS</span><span>Fragancias de inspiración · 30 ml / 60 ml</span><span className="footer-disclaimer">Las marcas mencionadas pertenecen a sus respectivos titulares.</span></div>
      </footer>

      <a className="whatsapp-float" href={whatsappLink(inquiryMessage())} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></a>

      <dialog ref={dialogRef} className="fragrance-dialog" aria-labelledby="dialog-title" onClose={() => setActiveFragrance(null)} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
        {activeFragrance && <FragranceDetails item={activeFragrance} onClose={() => dialogRef.current?.close()} />}
      </dialog>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: business.name,
        description: 'Perfumería especializada en fragancias de inspiración con presentaciones de 30 ml y 60 ml.',
        telephone: `+${business.whatsappNumber}`,
        url: window.location.href,
        image: new URL(asset('images/hero-campaign.webp'), window.location.href).href,
      }) }} />
    </>
  );
}

function ArrowUpRightIcon() {
  return <span className="collection-arrow" aria-hidden="true"><ArrowRight size={18} /></span>;
}

function ProductCard({ item, index, onOpen }: { item: Fragrance; index: number; onOpen: () => void }) {
  const title = item.aliases?.[0] ?? item.name;
  return (
    <article className={`product-card product-tone-${index % 4}`}>
      <button className="product-open" type="button" onClick={onOpen} aria-label={`Ver detalles de ${title}`}>
        <span className="product-art" aria-hidden="true"><span className="art-glow" /><span className="art-bottle"><span className="bottle-cap" /><span className="bottle-label">NS</span></span><span className="art-number">{item.catalogCode}</span><span className="art-wordmark">NOVA<br />SCENTS</span></span>
        <span className="product-info"><span className="product-overline">{item.group ?? 'Feromonas'} <i>·</i> {item.catalogCode ? `No. ${item.catalogCode}` : 'Sin código'}</span><strong>{title}</strong><span className="product-house">{item.house ? `Inspirada en ${item.house} · ${item.name}` : 'Línea de feromonas'}</span><span className="product-sizes">{(item.availableSizes ?? business.sizes).length ? (item.availableSizes ?? business.sizes).join(' · ') : 'Consulta presentaciones'}</span></span>
      </button>
      <a className="product-quick-link" href={whatsappLink(inquiryMessage(item))} target="_blank" rel="noreferrer" aria-label={`Consultar ${title} por WhatsApp`}><MessageCircle size={16} /><span>Consultar</span><ArrowRight size={15} /></a>
    </article>
  );
}

function FragranceDetails({ item, onClose }: { item: Fragrance; onClose: () => void }) {
  const title = item.aliases?.[0] ?? item.name;
  return (
    <div className="dialog-content">
      <button className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar detalles"><X size={20} /></button>
      <div className="dialog-art"><span className="dialog-monogram">NS</span><span className="dialog-ref">{item.group} · No. {item.catalogCode}</span></div>
      <div className="dialog-copy"><p className="eyebrow"><span /> {item.house ? 'Fragancia de inspiración' : 'Línea NOVA SCENTS'}</p><h2 id="dialog-title">{title}</h2><p className="dialog-inspiration">{item.house ? <>Referencia: <strong>{item.house} · {item.name}</strong></> : 'Consulta los detalles y presentaciones de esta línea directamente con el equipo.'}</p><div className="dialog-details"><div><span>Colección</span><strong>{item.group ?? 'Feromonas'}</strong></div><div><span>Clasificación</span><strong>{item.classifications.join(', ')}</strong></div><div><span>Presentaciones</span><strong>{(item.availableSizes ?? business.sizes).join(' · ') || 'Por confirmar'}</strong></div></div><p className="dialog-note">La disponibilidad puede variar. Consulta con NOVA SCENTS antes de realizar tu pedido.</p><div className="dialog-actions">{(item.availableSizes ?? business.sizes).length ? (item.availableSizes ?? business.sizes).map((size) => <a className="button button-dark" href={whatsappLink(inquiryMessage(item, size))} target="_blank" rel="noreferrer" key={size}><MessageCircle size={16} /> Consultar {size}</a>) : <a className="button button-dark" href={whatsappLink(inquiryMessage(item))} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Consultar disponibilidad</a>}</div><button className="dialog-back" type="button" onClick={onClose}><ChevronLeft size={16} /> Volver al catálogo</button></div>
    </div>
  );
}

export default App;
