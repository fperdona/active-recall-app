import { useParams, Link } from "react-router-dom";

export function Deck() {
    const { id } = useParams()

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link
                to="/"
                className="text-primary hover:underline mb-4 inline-block"
            >
                ← Voltar
            </Link>
            <h1 className="text-2xl font-bold mb-6 text-text">
                Deck {id}
            </h1>
            <p className="text-text-muted">
                Em breve: lista de cards e botão estudar
            </p>
        </div>
    )
}