import { describe, expect, it } from 'vitest';
import { CATEGORIES, emojiForCategory, pickRandomWord } from '../words';

describe('words', () => {
  it('deve retornar uma palavra aleatória', () => {
    const word = pickRandomWord();
    expect(word).toMatchObject({
      category: expect.any(String),
      word: expect.any(String),
      emoji: expect.any(String),
      hint: expect.any(String),
    });
  });

  it('deve retornar uma palavra da categoria especificada', () => {
    const word = pickRandomWord(['Transporte']);
    expect(word.category).toBe('Transporte');
  });

  it('deve retornar uma palavra de qualquer categoria se a categoria especificada não existir', () => {
    const word = pickRandomWord(['CategoriaInexistente']);
    expect(word).toBeDefined();
  });

  it('deve ter emoji para cada categoria', () => {
    CATEGORIES.forEach((category) => {
      const emoji = emojiForCategory(category);
      expect(emoji).toBeDefined();
    });
  });
});
