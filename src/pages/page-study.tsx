// === IMPORTS ===
// useParams: pega o :id da URL (ex: /deck/abc123/study → id = "abc123")
// Link: cria links de navegação (como <a> mas sem recarregar a página)
// useNavigate: permite navegar por código (ex: navigate('/home'))
import { useParams, Link, useNavigate } from "react-router-dom"
// useState: cria variáveis que, quando mudam, atualizam a tela
import { useState } from "react"
// useDecks: nosso hook que acessa os decks do Context
import { useDecks } from "../contexts/decks/hooks/use-decks"

// === COMPONENTE ===
export function Study() {
    // Pega o ID do deck da URL
    // Se a URL é /deck/abc123/study, então id = "abc123"
    const { id } = useParams()
    // Função para navegar para outra página por código
    const navigate = useNavigate()
    // Pega a função getDeck do nosso Context
    const { getDeck } = useDecks()
    // Busca o deck pelo ID
    // O ! diz pro TypeScript "confia, o id existe"
    const deck = getDeck(id!)

    // === ESTADOS ===
    // currentIndex: qual card estamos mostrando (0 = primeiro, 1 = segundo, etc)
    const [currentIndex, setCurrentIndex] = useState(0)
    // showAnswer: a resposta está visível? (começa escondida)
    const [showAnswer, setShowAnswer] = useState(false)

    // === VERIFICAÇÕES ===
    // Se o deck não existe, mostra erro
    if (!deck) {
        return (
            <div className="p-8">
                <p className="text-error">Deck não encontrado</p>
                <Link to="/" className="text-primary hover:underline">Voltar</Link>
            </div>
        )
    }

    // Se o deck não tem cards, avisa o usuário
    if (deck.cards.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-text-muted mb-4">Nenhum card para estudar</p>
                <Link to={`/deck/${id}`} className="text-primary hover:underline">
                    Voltar e adicionar cards
                </Link>
            </div>
        )
    }

    // === VARIÁVEIS CALCULADAS ===
    // Pega o card atual baseado no índice
    // Se currentIndex = 0, pega deck.cards[0] (primeiro card)
    const currentCard = deck.cards[currentIndex]
    // Verifica se é o último card
    // Ex: se tem 3 cards (índices 0, 1, 2) e currentIndex é 2, é o último
    const isLastCard = currentIndex === deck.cards.length - 1

    // === FUNÇÕES ===
    // Chamada quando clica em Errei/Difícil/Fácil
    function handleNext() {
        if (isLastCard) {
            // Se é o último card, volta pra página do deck
            navigate(`/deck/${id}`)
        } else {
            // Senão, vai pro próximo card
            setCurrentIndex(currentIndex + 1)
            // E esconde a resposta de novo
            setShowAnswer(false)
        }
    }

    // === RETORNO (HTML) ===
    return (
        <div className="p-8 max-w-2xl mx-auto">

            {/* CABEÇALHO: botão sair + contador */}
            <div className="flex justify-between items-center mb-6">
                {/* Link pra sair do modo estudo */}
                <Link to={`/deck/${id}`} className="text-primary hover:underline">
                    ← Sair
                </Link>
                {/* Mostra "1 / 5" por exemplo (card atual / total) */}
                <span className="text-text-muted">
                    {currentIndex + 1} / {deck.cards.length}
                </span>
            </div>

            {/* CARD PRINCIPAL */}
            {/* Quando clica, inverte showAnswer (true→false ou false→true) */}
            <div
                onClick={() => setShowAnswer(!showAnswer)}
                className="bg-card p-8 rounded-xl min-h-[200px] flex items-center justify-center cursor-pointer hover:bg-primary-light transition-colors"
            >
                {/* Se showAnswer é true, mostra resposta. Senão, mostra pergunta */}
                <p className="text-xl text-center text-text">
                    {showAnswer ? currentCard.answer : currentCard.question}
                </p>
            </div>

            {/* DICA: mostra "Clique para revelar" ou "Resposta" */}
            <p className="text-center text-text-muted text-sm mt-2">
                {showAnswer ? "Resposta" : "Clique para revelar"}
            </p>

            {/* BOTÕES DE AVALIAÇÃO */}
            {/* Só aparecem quando a resposta está visível */}
            {showAnswer && (
                <div className="flex gap-3 mt-6 justify-center">
                    {/* Todos chamam handleNext por enquanto */}
                    {/* Depois vamos fazer cada um atualizar o intervalo diferente */}
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-error text-white rounded-lg hover:opacity-90 cursor-pointer"
                    >
                        Errei
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-warning text-white rounded-lg hover:opacity-90 cursor-pointer"
                    >
                        Difícil
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-success text-white rounded-lg hover:opacity-90 cursor-pointer"
                    >
                        Fácil
                    </button>
                </div>
            )}
        </div>
    )
}