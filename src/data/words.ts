import type { WordEntry } from '../types'

/**
 * Banco de palavras secretas.
 * `emoji` ilustra a palavra no card dos Civis; `hint` é a palavra parecida
 * exibida ao X9 no modo avançado.
 */
export const WORDS: WordEntry[] = [
  // 🐾 Animais
  { category: 'Animais', word: 'Elefante', emoji: '🐘', hint: 'Rinoceronte' },
  { category: 'Animais', word: 'Pinguim', emoji: '🐧', hint: 'Tucano' },
  { category: 'Animais', word: 'Golfinho', emoji: '🐬', hint: 'Tubarão' },
  { category: 'Animais', word: 'Leão', emoji: '🦁', hint: 'Tigre' },
  { category: 'Animais', word: 'Cavalo', emoji: '🐴', hint: 'Zebra' },
  { category: 'Animais', word: 'Coruja', emoji: '🦉', hint: 'Morcego' },
  { category: 'Animais', word: 'Polvo', emoji: '🐙', hint: 'Lula' },
  { category: 'Animais', word: 'Macaco', emoji: '🐒', hint: 'Gorila' },
  { category: 'Animais', word: 'Sapo', emoji: '🐸', hint: 'Lagarto' },
  { category: 'Animais', word: 'Abelha', emoji: '🐝', hint: 'Vespa' },

  // 🍔 Comidas
  { category: 'Comidas', word: 'Pizza', emoji: '🍕', hint: 'Lasanha' },
  { category: 'Comidas', word: 'Hambúrguer', emoji: '🍔', hint: 'Cachorro-quente' },
  { category: 'Comidas', word: 'Sushi', emoji: '🍣', hint: 'Temaki' },
  { category: 'Comidas', word: 'Brigadeiro', emoji: '🍫', hint: 'Beijinho' },
  { category: 'Comidas', word: 'Feijoada', emoji: '🍲', hint: 'Estrogonofe' },
  { category: 'Comidas', word: 'Sorvete', emoji: '🍦', hint: 'Milk-shake' },
  { category: 'Comidas', word: 'Lasanha', emoji: '🍝', hint: 'Macarronada' },
  { category: 'Comidas', word: 'Taco', emoji: '🌮', hint: 'Burrito' },
  { category: 'Comidas', word: 'Pipoca', emoji: '🍿', hint: 'Batata frita' },
  { category: 'Comidas', word: 'Bolo', emoji: '🎂', hint: 'Torta' },

  // 🌍 Lugares
  { category: 'Lugares', word: 'Praia', emoji: '🏖️', hint: 'Piscina' },
  { category: 'Lugares', word: 'Hospital', emoji: '🏥', hint: 'Clínica' },
  { category: 'Lugares', word: 'Escola', emoji: '🏫', hint: 'Faculdade' },
  { category: 'Lugares', word: 'Aeroporto', emoji: '✈️', hint: 'Rodoviária' },
  { category: 'Lugares', word: 'Cinema', emoji: '🎬', hint: 'Teatro' },
  { category: 'Lugares', word: 'Supermercado', emoji: '🛒', hint: 'Padaria' },
  { category: 'Lugares', word: 'Estádio', emoji: '🏟️', hint: 'Ginásio' },
  { category: 'Lugares', word: 'Castelo', emoji: '🏰', hint: 'Fortaleza' },
  { category: 'Lugares', word: 'Floresta', emoji: '🌲', hint: 'Parque' },
  { category: 'Lugares', word: 'Deserto', emoji: '🏜️', hint: 'Savana' },

  // ⚽ Esportes
  { category: 'Esportes', word: 'Futebol', emoji: '⚽', hint: 'Futsal' },
  { category: 'Esportes', word: 'Basquete', emoji: '🏀', hint: 'Vôlei' },
  { category: 'Esportes', word: 'Natação', emoji: '🏊', hint: 'Mergulho' },
  { category: 'Esportes', word: 'Tênis', emoji: '🎾', hint: 'Pingue-pongue' },
  { category: 'Esportes', word: 'Surfe', emoji: '🏄', hint: 'Skate' },
  { category: 'Esportes', word: 'Boxe', emoji: '🥊', hint: 'Judô' },
  { category: 'Esportes', word: 'Ciclismo', emoji: '🚴', hint: 'Corrida' },
  { category: 'Esportes', word: 'Golfe', emoji: '⛳', hint: 'Sinuca' },

  // 👔 Profissões
  { category: 'Profissões', word: 'Médico', emoji: '👨‍⚕️', hint: 'Enfermeiro' },
  { category: 'Profissões', word: 'Professor', emoji: '👨‍🏫', hint: 'Diretor' },
  { category: 'Profissões', word: 'Bombeiro', emoji: '🧑‍🚒', hint: 'Policial' },
  { category: 'Profissões', word: 'Cozinheiro', emoji: '👨‍🍳', hint: 'Garçom' },
  { category: 'Profissões', word: 'Piloto', emoji: '👨‍✈️', hint: 'Comissário' },
  { category: 'Profissões', word: 'Astronauta', emoji: '👨‍🚀', hint: 'Cientista' },
  { category: 'Profissões', word: 'Detetive', emoji: '🕵️', hint: 'Advogado' },
  { category: 'Profissões', word: 'Cantor', emoji: '🎤', hint: 'Ator' },

  // 🎒 Objetos
  { category: 'Objetos', word: 'Guarda-chuva', emoji: '☂️', hint: 'Capa de chuva' },
  { category: 'Objetos', word: 'Relógio', emoji: '⌚', hint: 'Despertador' },
  { category: 'Objetos', word: 'Violão', emoji: '🎸', hint: 'Ukulele' },
  { category: 'Objetos', word: 'Geladeira', emoji: '🧊', hint: 'Freezer' },
  { category: 'Objetos', word: 'Celular', emoji: '📱', hint: 'Tablet' },
  { category: 'Objetos', word: 'Câmera', emoji: '📷', hint: 'Filmadora' },
  { category: 'Objetos', word: 'Chave', emoji: '🔑', hint: 'Cadeado' },
  { category: 'Objetos', word: 'Vassoura', emoji: '🧹', hint: 'Rodo' },

  // 🍓 Frutas
  { category: 'Frutas', word: 'Morango', emoji: '🍓', hint: 'Cereja' },
  { category: 'Frutas', word: 'Banana', emoji: '🍌', hint: 'Manga' },
  { category: 'Frutas', word: 'Abacaxi', emoji: '🍍', hint: 'Melão' },
  { category: 'Frutas', word: 'Melancia', emoji: '🍉', hint: 'Melão' },
  { category: 'Frutas', word: 'Uva', emoji: '🍇', hint: 'Jabuticaba' },
  { category: 'Frutas', word: 'Maçã', emoji: '🍎', hint: 'Pêra' },
  { category: 'Frutas', word: 'Laranja', emoji: '🍊', hint: 'Tangerina' },
  { category: 'Frutas', word: 'Coco', emoji: '🥥', hint: 'Castanha' },

  // 🎵 Música
  { category: 'Música', word: 'Piano', emoji: '🎹', hint: 'Teclado' },
  { category: 'Música', word: 'Bateria', emoji: '🥁', hint: 'Cajón' },
  { category: 'Música', word: 'Microfone', emoji: '🎤', hint: 'Megafone' },
  { category: 'Música', word: 'Fone', emoji: '🎧', hint: 'Caixa de som' },
  { category: 'Música', word: 'Saxofone', emoji: '🎷', hint: 'Trompete' },
  { category: 'Música', word: 'Sanfona', emoji: '🪗', hint: 'Gaita' },
  { category: 'Música', word: 'Pandeiro', emoji: '🪘', hint: 'Tamborim' },

  // 🌿 Natureza
  { category: 'Natureza', word: 'Vulcão', emoji: '🌋', hint: 'Montanha' },
  { category: 'Natureza', word: 'Arco-íris', emoji: '🌈', hint: 'Aurora' },
  { category: 'Natureza', word: 'Cachoeira', emoji: '⛰️', hint: 'Rio' },
  { category: 'Natureza', word: 'Tempestade', emoji: '⛈️', hint: 'Furacão' },
  { category: 'Natureza', word: 'Neve', emoji: '❄️', hint: 'Granizo' },
  { category: 'Natureza', word: 'Cacto', emoji: '🌵', hint: 'Samambaia' },
  { category: 'Natureza', word: 'Lua', emoji: '🌙', hint: 'Estrela' },

  // 🚗 Transporte
  { category: 'Transporte', word: 'Avião', emoji: '✈️', hint: 'Helicóptero' },
  { category: 'Transporte', word: 'Trem', emoji: '🚆', hint: 'Metrô' },
  { category: 'Transporte', word: 'Bicicleta', emoji: '🚲', hint: 'Patinete' },
  { category: 'Transporte', word: 'Navio', emoji: '🚢', hint: 'Barco' },
  { category: 'Transporte', word: 'Foguete', emoji: '🚀', hint: 'Ônibus espacial' },
  { category: 'Transporte', word: 'Moto', emoji: '🏍️', hint: 'Lambreta' },
  { category: 'Transporte', word: 'Ônibus', emoji: '🚌', hint: 'Van' },
  { category: 'Transporte', word: 'Caminhão', emoji: '🚚', hint: 'Trator' },
]

/** Todas as categorias disponíveis, na ordem do banco. */
export const CATEGORIES: string[] = [...new Set(WORDS.map((w) => w.category))]

/**
 * Sorteia uma palavra, restrita às categorias pedidas.
 * `categories` vazio (ou sem correspondência) = todas as categorias.
 */
export function pickRandomWord(categories: string[] = []): WordEntry {
  const pool = categories.length
    ? WORDS.filter((w) => categories.includes(w.category))
    : WORDS
  const list = pool.length ? pool : WORDS
  return list[Math.floor(Math.random() * list.length)]
}

/** Emoji ilustrativo por categoria, usado nos chips de seleção. */
const CATEGORY_EMOJI: Record<string, string> = {
  Animais: '🐾',
  Comidas: '🍔',
  Lugares: '🌍',
  Esportes: '⚽',
  Profissões: '👔',
  Objetos: '🎒',
  Frutas: '🍓',
  Música: '🎵',
  Natureza: '🌿',
  Transporte: '🚗',
}

export function emojiForCategory(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🗂️'
}
