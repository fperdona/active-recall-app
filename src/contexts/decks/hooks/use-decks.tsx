import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Deck, Card } from '../models/deck'

const mockDecks: Deck[] = [
  { id: '1', name: 'JavaScript', cards: [] },
  { id: '2', name: 'React', cards: [] }
]

type DecksContextType = {
  decks: Deck[]
  createDeck: (name: string) => void
  getDeck: (id: string) => Deck | undefined
  addCard: (deckId: string, question: string, answer: string) => void
}

const DecksContext = createContext<DecksContextType | null>(null)

export function DecksProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>(mockDecks)

  function createDeck(name: string) {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name,
      cards: []
    }
    setDecks([...decks, newDeck])
  }

  function getDeck(id: string) {
    return decks.find(deck => deck.id === id)
  }

  function addCard(deckId: string, question: string, answer: string) {
    const newCard: Card = {
      id: crypto.randomUUID(),
      question,
      answer,
      nextReview: new Date(),
      interval: 1,
      easeFactor: 2.5
    }

    setDecks(decks.map(deck =>
      deck.id === deckId
        ? { ...deck, cards: [...deck.cards, newCard] }
        : deck
    ))
  }

  return (
    <DecksContext.Provider value={{ decks, createDeck, getDeck, addCard }}>
      {children}
    </DecksContext.Provider>
  )
}

export function useDecks() {
  const context = useContext(DecksContext)
  if (!context) {
    throw new Error('useDecks deve ser usado dentro de DecksProvider')
  }
  return context
}
