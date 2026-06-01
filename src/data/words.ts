import type { WordEntry } from '../types'

/**
 * Banco de dados local de palavras secretas.
 * `hint` é a palavra parecida exibida ao impostor no modo avançado.
 */
export const WORDS: WordEntry[] = [
  // 🐾 Animais
  { category: 'Animais', word: 'Elefante', hint: 'Rinoceronte' },
  { category: 'Animais', word: 'Pinguim', hint: 'Tucano' },
  { category: 'Animais', word: 'Golfinho', hint: 'Tubarão' },
  { category: 'Animais', word: 'Leão', hint: 'Tigre' },
  { category: 'Animais', word: 'Cavalo', hint: 'Zebra' },
  { category: 'Animais', word: 'Coruja', hint: 'Morcego' },
  { category: 'Animais', word: 'Polvo', hint: 'Lula' },

  // 🍔 Comidas
  { category: 'Comidas', word: 'Pizza', hint: 'Lasanha' },
  { category: 'Comidas', word: 'Hambúrguer', hint: 'Cachorro-quente' },
  { category: 'Comidas', word: 'Sushi', hint: 'Temaki' },
  { category: 'Comidas', word: 'Brigadeiro', hint: 'Beijinho' },
  { category: 'Comidas', word: 'Feijoada', hint: 'Estrogonofe' },
  { category: 'Comidas', word: 'Sorvete', hint: 'Milk-shake' },
  { category: 'Comidas', word: 'Lasanha', hint: 'Macarronada' },

  // 🌍 Lugares
  { category: 'Lugares', word: 'Praia', hint: 'Piscina' },
  { category: 'Lugares', word: 'Hospital', hint: 'Clínica' },
  { category: 'Lugares', word: 'Escola', hint: 'Faculdade' },
  { category: 'Lugares', word: 'Aeroporto', hint: 'Rodoviária' },
  { category: 'Lugares', word: 'Cinema', hint: 'Teatro' },
  { category: 'Lugares', word: 'Supermercado', hint: 'Padaria' },
  { category: 'Lugares', word: 'Estádio', hint: 'Ginásio' },

  // ⚽ Esportes
  { category: 'Esportes', word: 'Futebol', hint: 'Futsal' },
  { category: 'Esportes', word: 'Basquete', hint: 'Vôlei' },
  { category: 'Esportes', word: 'Natação', hint: 'Mergulho' },
  { category: 'Esportes', word: 'Tênis', hint: 'Pingue-pongue' },
  { category: 'Esportes', word: 'Surfe', hint: 'Skate' },

  // 🎬 Profissões
  { category: 'Profissões', word: 'Médico', hint: 'Enfermeiro' },
  { category: 'Profissões', word: 'Professor', hint: 'Diretor' },
  { category: 'Profissões', word: 'Bombeiro', hint: 'Policial' },
  { category: 'Profissões', word: 'Cozinheiro', hint: 'Garçom' },
  { category: 'Profissões', word: 'Piloto', hint: 'Comissário' },

  // 🎒 Objetos
  { category: 'Objetos', word: 'Guarda-chuva', hint: 'Capa de chuva' },
  { category: 'Objetos', word: 'Relógio', hint: 'Despertador' },
  { category: 'Objetos', word: 'Violão', hint: 'Ukulele' },
  { category: 'Objetos', word: 'Geladeira', hint: 'Freezer' },
  { category: 'Objetos', word: 'Celular', hint: 'Tablet' },
]

export function pickRandomWord(): WordEntry {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

/** Emoji ilustrativo por categoria, usado no card de revelação dos Civis. */
const CATEGORY_EMOJI: Record<string, string> = {
  Animais: '🐾',
  Comidas: '🍔',
  Lugares: '🌍',
  Esportes: '⚽',
  Profissões: '👔',
  Objetos: '🎒',
}

export function emojiForCategory(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🗂️'
}
