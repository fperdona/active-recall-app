export type Card = {
    id: string
    question: string
    answer: string
    nextReview: Date
    interval: number
    easeFactor: number
  }
  
  export type Deck = {
    id: string
    name: string
    cards: Card[]
  }
  