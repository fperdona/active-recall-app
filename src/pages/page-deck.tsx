import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { useDecks } from "../contexts/decks/hooks/use-decks"

export function Deck() {
    const { id } = useParams()
    const { getDeck, addCard } = useDecks()
    const deck = getDeck(id!)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    if (!deck) {
        return (
            <div className="p-8">
                <p className="text-error">Deck não encontrado</p>
                <Link to="/" className="text-primary hover:underline">Voltar</Link>
            </div>
        )
    }

    function handleAddCard() {
        if (!question.trim() || !answer.trim()) return
        addCard(id!, question, answer)
        setQuestion('')
        setAnswer('')
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link to="/" className="text-primary hover:underline mb-4 inline-block">
                ← Voltar
            </Link>

            <h1 className="text-2xl font-bold mb-6 text-text">{deck.name}</h1>

            {/* Form para criar card */}
            <div className="bg-card p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-3 text-text">Novo Card</h2>
                <input
                    type="text"
                    placeholder="Pergunta..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    type="text"
                    placeholder="Resposta..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleAddCard}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
                >
                    Adicionar Card
                </button>
            </div>

            {/* Lista de cards */}
            <div className="grid gap-3">
                {deck.cards.length === 0 ? (
                    <p className="text-text-muted">Nenhum card ainda. Crie o primeiro!</p>
                ) : (
                    deck.cards.map(card => (
                        <div key={card.id} className="bg-card p-4 rounded-lg">
                            <p className="font-medium text-text">{card.question}</p>
                            <p className="text-text-muted text-sm mt-1">{card.answer}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
