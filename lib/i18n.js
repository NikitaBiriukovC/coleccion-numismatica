// ================= IDIOMAS (versión Next.js) =================
// Para añadir un idioma: 1) una línea en IDIOMAS, 2) un bloque en TEXTOS (copia el de 'en'),
// 3) un bloque en CONT. Los nombres de países y divisas salen solos de Intl.DisplayNames.
export const IDIOMAS = {es: 'Español', en: 'English', fr: 'Français', pt: 'Português'};


export const TEXTOS = {
  es: {
    titulo: 'Mi colección', buscar: 'Buscar país… (Enter para ir)', solo: 'Solo los que faltan',
    tema: 'Cambiar tema', exp: '⬇ Exportar', imp: '⬆ Importar', idioma: 'Idioma',
    t_col: 'Colección', t_his: 'Historial', t_log: 'Logros', t_dup: 'Duplicados',
    cargando: 'Cargando mapa…', marcar_todo: 'Marcar todo', monedas: 'Monedas', billetes: 'Billetes',
    paises_n: '{n} países', tot: '{g} de {t} piezas ({p}%)', faltan: 'faltan {n}',
    mon_faltan: 'Monedas que faltan: ', bil_faltan: 'Billetes que faltan: ', completo: '✓ completo', sin_datos: 'Sin datos',
    dia_titulo: '🎲 País del día', dia_llevas: 'Llevas {g}/{t} piezas de este país.',
    dia_ver: 'Ver país', dia_otro: 'Otro país 🎲', dia_aqui: 'Aquí se usa {d} ({c}).',
    logro_ok: '✔ Conseguido', logro_ava: '🏆 Logro desbloqueado: ',
    h_mon: 'Moneda de {d}', h_bil: 'Billete de {d}',
    h_vacio: 'Aún no hay piezas con fecha. Marca alguna y aparecerá aquí.',
    h_sinfecha: '{n} piezas anteriores sin fecha registrada.',
    d_vacio: 'Aún no tienes duplicados. Marca una pieza y pulsa + para anotar una repetida.',
    d_resumen: '{n} repetidas en {r} referencias', d_copiar: '📋 Copiar lista', d_copiada: '📋 Lista copiada',
    d_error: 'No se pudo copiar', d_rep1: '1 repetida', d_repn: '{n} repetidas',
    f_cargando: 'Cargando…', f_mas: 'Leer más en Wikipedia', f_cerrar: 'Cerrar',
    f_nada: 'Todavía no hay información de esta pieza.',
    imp_error: 'El archivo no es una colección válida',
    n_ph: 'Escribe aquí la historia de esta pieza…', n_guardar: 'Guardar', n_borrar: 'Borrar',
    n_cancelar: 'Cancelar', n_add: 'Añadir nota',
    hoy: 'Hoy', imprimir: '🖨 Imprimir', imp_titulo: 'Mi colección: piezas que me faltan',
    mi_nota: 'Mi nota', arriba: 'Volver arriba',
    logros: [['Primera pieza', 'Marca tu primera pieza'], ['Aficionado', 'Consigue 10 piezas'],
      ['Coleccionista', 'Consigue 100 piezas'], ['Experto', 'Consigue 500 piezas'], ['Maestro', 'Consigue 1.000 piezas'],
      ['Primer país', 'Completa un país'], ['Viajero', 'Completa 10 países'],
      ['Medio continente', 'Llega al 50 % en un continente'], ['Eurozona', 'Completa todos los países del euro'],
      ['Papel moneda', 'Consigue 50 billetes'], ['Constante', 'Añade piezas en 7 días distintos']]
  },
  en: {
    titulo: 'My collection', buscar: 'Search country… (Enter to go)', solo: 'Only the ones I’m missing',
    tema: 'Switch theme', exp: '⬇ Export', imp: '⬆ Import', idioma: 'Language',
    t_col: 'Collection', t_his: 'History', t_log: 'Achievements', t_dup: 'Duplicates',
    cargando: 'Loading map…', marcar_todo: 'Mark all', monedas: 'Coins', billetes: 'Banknotes',
    paises_n: '{n} countries', tot: '{g} of {t} items ({p}%)', faltan: '{n} missing',
    mon_faltan: 'Missing coins: ', bil_faltan: 'Missing banknotes: ', completo: '✓ complete', sin_datos: 'No data',
    dia_titulo: '🎲 Country of the day', dia_llevas: 'You have {g}/{t} items from this country.',
    dia_ver: 'View country', dia_otro: 'Another country 🎲', dia_aqui: 'Currency used here: {d} ({c}).',
    logro_ok: '✔ Unlocked', logro_ava: '🏆 Achievement unlocked: ',
    h_mon: 'Coin: {d}', h_bil: 'Banknote: {d}',
    h_vacio: 'No dated items yet. Mark one and it will show up here.',
    h_sinfecha: '{n} earlier items with no recorded date.',
    d_vacio: 'No duplicates yet. Mark an item and press + to record a spare.',
    d_resumen: '{n} spares across {r} items', d_copiar: '📋 Copy list', d_copiada: '📋 List copied',
    d_error: 'Could not copy', d_rep1: '1 spare', d_repn: '{n} spares',
    f_cargando: 'Loading…', f_mas: 'Read more on Wikipedia', f_cerrar: 'Close',
    f_nada: 'No information about this item yet.',
    imp_error: 'The file is not a valid collection',
    n_ph: 'Write the story of this piece here…', n_guardar: 'Save', n_borrar: 'Delete',
    n_cancelar: 'Cancel', n_add: 'Add note',
    hoy: 'Today', imprimir: '🖨 Print', imp_titulo: 'My collection: items I’m missing',
    mi_nota: 'My note', arriba: 'Back to top',
    logros: [['First piece', 'Mark your first piece'], ['Enthusiast', 'Collect 10 pieces'],
      ['Collector', 'Collect 100 pieces'], ['Expert', 'Collect 500 pieces'], ['Master', 'Collect 1,000 pieces'],
      ['First country', 'Complete a country'], ['Traveller', 'Complete 10 countries'],
      ['Half a continent', 'Reach 50% in a continent'], ['Eurozone', 'Complete all euro countries'],
      ['Paper money', 'Collect 50 banknotes'], ['Consistent', 'Add pieces on 7 different days']]
  },
  fr: {
    titulo: 'Ma collection', buscar: 'Rechercher un pays… (Entrée pour y aller)', solo: 'Seulement ce qui me manque',
    tema: 'Changer de thème', exp: '⬇ Exporter', imp: '⬆ Importer', idioma: 'Langue',
    t_col: 'Collection', t_his: 'Historique', t_log: 'Succès', t_dup: 'Doublons',
    cargando: 'Chargement de la carte…', marcar_todo: 'Tout cocher', monedas: 'Pièces', billetes: 'Billets',
    paises_n: '{n} pays', tot: '{g} sur {t} pièces ({p} %)', faltan: 'il en manque {n}',
    mon_faltan: 'Pièces manquantes : ', bil_faltan: 'Billets manquants : ', completo: '✓ complet', sin_datos: 'Pas de données',
    dia_titulo: '🎲 Pays du jour', dia_llevas: 'Vous avez {g}/{t} pièces de ce pays.',
    dia_ver: 'Voir le pays', dia_otro: 'Un autre pays 🎲', dia_aqui: 'Monnaie utilisée ici : {d} ({c}).',
    logro_ok: '✔ Obtenu', logro_ava: '🏆 Succès débloqué : ',
    h_mon: 'Pièce : {d}', h_bil: 'Billet : {d}',
    h_vacio: 'Aucune pièce datée pour l’instant. Cochez-en une et elle apparaîtra ici.',
    h_sinfecha: '{n} pièces antérieures sans date enregistrée.',
    d_vacio: 'Aucun doublon pour l’instant. Cochez une pièce et appuyez sur + pour noter un exemplaire en double.',
    d_resumen: '{n} doublons sur {r} références', d_copiar: '📋 Copier la liste', d_copiada: '📋 Liste copiée',
    d_error: 'Copie impossible', d_rep1: '1 doublon', d_repn: '{n} doublons',
    f_cargando: 'Chargement…', f_mas: 'En savoir plus sur Wikipédia', f_cerrar: 'Fermer',
    f_nada: 'Pas encore d’informations sur cette pièce.',
    imp_error: 'Le fichier n’est pas une collection valide',
    n_ph: 'Écrivez ici l’histoire de cette pièce…', n_guardar: 'Enregistrer', n_borrar: 'Supprimer',
    n_cancelar: 'Annuler', n_add: 'Ajouter une note',
    hoy: 'Aujourd’hui', imprimir: '🖨 Imprimer', imp_titulo: 'Ma collection : pièces qui me manquent',
    mi_nota: 'Ma note', arriba: 'Haut de page',
    logros: [['Première pièce', 'Cochez votre première pièce'], ['Amateur', 'Obtenez 10 pièces'],
      ['Collectionneur', 'Obtenez 100 pièces'], ['Expert', 'Obtenez 500 pièces'], ['Maître', 'Obtenez 1 000 pièces'],
      ['Premier pays', 'Complétez un pays'], ['Voyageur', 'Complétez 10 pays'],
      ['Demi-continent', 'Atteignez 50 % dans un continent'], ['Zone euro', 'Complétez tous les pays de l’euro'],
      ['Papier-monnaie', 'Obtenez 50 billets'], ['Régulier', 'Ajoutez des pièces sur 7 jours différents']]
  },
  pt: {
    titulo: 'Minha coleção', buscar: 'Procurar país… (Enter para ir)', solo: 'Só os que faltam',
    tema: 'Mudar tema', exp: '⬇ Exportar', imp: '⬆ Importar', idioma: 'Idioma',
    t_col: 'Coleção', t_his: 'Histórico', t_log: 'Conquistas', t_dup: 'Duplicados',
    cargando: 'Carregando mapa…', marcar_todo: 'Marcar tudo', monedas: 'Moedas', billetes: 'Cédulas',
    paises_n: '{n} países', tot: '{g} de {t} peças ({p}%)', faltan: 'faltam {n}',
    mon_faltan: 'Moedas faltando: ', bil_faltan: 'Cédulas faltando: ', completo: '✓ completo', sin_datos: 'Sem dados',
    dia_titulo: '🎲 País do dia', dia_llevas: 'Você tem {g}/{t} peças deste país.',
    dia_ver: 'Ver país', dia_otro: 'Outro país 🎲', dia_aqui: 'Aqui se usa {d} ({c}).',
    logro_ok: '✔ Conquistado', logro_ava: '🏆 Conquista desbloqueada: ',
    h_mon: 'Moeda: {d}', h_bil: 'Cédula: {d}',
    h_vacio: 'Ainda não há peças com data. Marque alguma e ela aparecerá aqui.',
    h_sinfecha: '{n} peças anteriores sem data registrada.',
    d_vacio: 'Você ainda não tem duplicados. Marque uma peça e clique em + para anotar uma repetida.',
    d_resumen: '{n} repetidas em {r} referências', d_copiar: '📋 Copiar lista', d_copiada: '📋 Lista copiada',
    d_error: 'Não foi possível copiar', d_rep1: '1 repetida', d_repn: '{n} repetidas',
    f_cargando: 'Carregando…', f_mas: 'Ler mais na Wikipédia', f_cerrar: 'Fechar',
    f_nada: 'Ainda não há informação sobre esta peça.',
    imp_error: 'O arquivo não é uma coleção válida',
    n_ph: 'Escreva aqui a história desta peça…', n_guardar: 'Salvar', n_borrar: 'Apagar',
    n_cancelar: 'Cancelar', n_add: 'Adicionar nota',
    hoy: 'Hoje', imprimir: '🖨 Imprimir', imp_titulo: 'Minha coleção: peças que faltam',
    mi_nota: 'Minha nota', arriba: 'Voltar ao topo',
    logros: [['Primeira peça', 'Marque sua primeira peça'], ['Aficionado', 'Consiga 10 peças'],
      ['Colecionador', 'Consiga 100 peças'], ['Especialista', 'Consiga 500 peças'], ['Mestre', 'Consiga 1.000 peças'],
      ['Primeiro país', 'Complete um país'], ['Viajante', 'Complete 10 países'],
      ['Meio continente', 'Chegue a 50 % em um continente'], ['Zona do euro', 'Complete todos os países do euro'],
      ['Cédulas', 'Consiga 50 cédulas'], ['Constante', 'Adicione peças em 7 dias diferentes']]
  }
};

// Los nombres de continente son las claves de PAISES (en español)
export const CONT = {
  en: {'Europa': 'Europe', 'Asia': 'Asia', 'África': 'Africa', 'América del Norte y Central': 'North & Central America', 'América del Sur': 'South America', 'Oceanía': 'Oceania'},
  fr: {'Europa': 'Europe', 'Asia': 'Asie', 'África': 'Afrique', 'América del Norte y Central': 'Amérique du Nord et centrale', 'América del Sur': 'Amérique du Sud', 'Oceanía': 'Océanie'},
  pt: {'Europa': 'Europa', 'Asia': 'Ásia', 'África': 'África', 'América del Norte y Central': 'América do Norte e Central', 'América del Sur': 'América do Sul', 'Oceanía': 'Oceania'}
};

// Código ISO numérico (el de data.js) -> ISO alfa-2, que es lo que entiende Intl.DisplayNames
const ISO2 = Object.fromEntries((
  '8:AL,276:DE,20:AD,40:AT,112:BY,56:BE,70:BA,100:BG,191:HR,196:CY,208:DK,703:SK,705:SI,724:ES,233:EE,246:FI,250:FR,300:GR,' +
  '348:HU,372:IE,352:IS,380:IT,428:LV,438:LI,440:LT,442:LU,470:MT,498:MD,492:MC,499:ME,807:MK,578:NO,528:NL,616:PL,620:PT,' +
  '826:GB,203:CZ,642:RO,643:RU,674:SM,688:RS,752:SE,756:CH,804:UA,336:VA,' +
  '4:AF,682:SA,51:AM,31:AZ,48:BH,50:BD,64:BT,104:MM,96:BN,116:KH,634:QA,156:CN,408:KP,410:KR,784:AE,608:PH,268:GE,356:IN,' +
  '360:ID,368:IQ,364:IR,376:IL,392:JP,400:JO,398:KZ,417:KG,414:KW,418:LA,422:LB,458:MY,462:MV,496:MN,524:NP,512:OM,586:PK,' +
  '275:PS,702:SG,760:SY,144:LK,764:TH,158:TW,762:TJ,626:TL,795:TM,792:TR,860:UZ,704:VN,887:YE,' +
  '24:AO,12:DZ,204:BJ,72:BW,854:BF,108:BI,132:CV,120:CM,148:TD,174:KM,178:CG,180:CD,384:CI,818:EG,232:ER,748:SZ,231:ET,' +
  '266:GA,270:GM,288:GH,324:GN,624:GW,226:GQ,404:KE,426:LS,430:LR,434:LY,450:MG,454:MW,466:ML,504:MA,480:MU,478:MR,508:MZ,' +
  '516:NA,562:NE,566:NG,140:CF,646:RW,678:ST,686:SN,690:SC,694:SL,706:SO,710:ZA,729:SD,728:SS,834:TZ,768:TG,788:TN,800:UG,' +
  '262:DJ,894:ZM,716:ZW,' +
  '28:AG,44:BS,52:BB,84:BZ,124:CA,188:CR,192:CU,212:DM,222:SV,840:US,308:GD,320:GT,332:HT,340:HN,388:JM,484:MX,558:NI,' +
  '591:PA,214:DO,659:KN,662:LC,670:VC,780:TT,' +
  '32:AR,68:BO,76:BR,152:CL,170:CO,218:EC,328:GY,600:PY,604:PE,740:SR,858:UY,862:VE,' +
  '36:AU,242:FJ,584:MH,90:SB,296:KI,583:FM,520:NR,554:NZ,585:PW,598:PG,882:WS,776:TO,798:TV,548:VU'
).split(',').map(s => s.split(':')));

// ================= FUNCIONES (puras: reciben el idioma como primer argumento) =================
// Texto traducido. Si falta en el idioma activo, usa el español.
export function tr(idioma, k, v = {}) {
  const s = (TEXTOS[idioma] && TEXTOS[idioma][k]) ?? TEXTOS.es[k] ?? k;
  return s.replace(/\{(\w+)\}/g, (_, x) => v[x] ?? '');
}

// Logro número i: [nombre, descripción]
export const lg = (idioma, i) =>
  ((TEXTOS[idioma] && TEXTOS[idioma].logros) || TEXTOS.es.logros)[i];

const _dn = {};
const dnames = (idioma, tipo) => (_dn[idioma + tipo] ||= new Intl.DisplayNames([idioma], { type: tipo }));

export function nombrePais(idioma, p) {
  if (idioma === 'es') return p.nombre;
  try { return dnames(idioma, 'region').of(p.iso ? ISO2[p.iso] : 'XK') || p.nombre; } catch { return p.nombre; }
}
export function nombreDivisa(idioma, p) {
  if (idioma === 'es') return p.dn;
  try { return dnames(idioma, 'currency').of(p.cur) || p.dn; } catch { return p.dn; }
}
export const nombreCont = (idioma, c) => (CONT[idioma] && CONT[idioma][c]) || c;
