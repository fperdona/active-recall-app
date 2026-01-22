import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import type { Deck } from "../types";

const mockDecks: Deck[] = [
    { id: '1', name: 'JavaScript', cards: [] },
    { id: '2', name: 'React', cards: [] }
]

export function Home() {
    const navigate = useNavigate()
    const [decks, setDecks] = useState<Deck[]>(mockDecks)
    const [newDeckName, setNewDeckName] = useState('')

    function handleCreateDeck() {
        if (!newDeckName.trim()) return

        const newDeck: Deck = {
            id: crypto.randomUUID(),
            name: newDeckName,
            cards: []
        }

        setDecks([...decks, newDeck])
        setNewDeckName('')
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-text">Meus Decks</h1>

            {/* Form para criar deck */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Nome do deck..."
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleCreateDeck}
                    className="px-4 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Criar Deck
                </button>
            </div>


            <div className="grid gap-4">
                {decks.map(deck => (
                    <div
                        key={deck.id}
                        onClick={() => navigate(`/deck/${deck.id}`)}
                        className="p-4 bg-card rounded-lg hover:bg-primary-light cursor-pointer transition-colors"
                    >
                        <h2 className="font-semibold text-text">{deck.name}</h2>
                        <p className="text-sm text-text-muted">{deck.cards.length} cards</p>
                    </div>
                ))}
            </div>
        </div>
    )
}