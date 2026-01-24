import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useDecks } from "../contexts/decks/hooks/use-decks";

export function Home() {
    const navigate = useNavigate()
    const { decks, createDeck } = useDecks()
    const [newDeckName, setNewDeckName] = useState('')

    function handleCreateDeck() {
        if (!newDeckName.trim()) return
        createDeck(newDeckName)
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
                        className="p-4 bg-card rounded-lg flex items-center justify-between"
                    >
                        {/* Parte clicável - vai pro deck */}
                        <div
                            onClick={() => navigate(`/deck/${deck.id}`)}
                            className="cursor-pointer hover:opacity-70"
                        >
                            <h2 className="font-semibold text-text">{deck.name}</h2>
                            <p className="text-sm text-text-muted">{deck.cards.length} cards</p>
                        </div>

                        {/* Botão estudar - só aparece se tiver cards */}
                        {deck.cards.length > 0 && (
                            <button
                                onClick={() => navigate(`/deck/${deck.id}/study`)}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
                            >
                                Estudar
                            </button>
                        )}
                    </div>

                ))}
            </div>
        </div>
    )
}