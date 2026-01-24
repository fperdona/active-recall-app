import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/page-home"
import { Deck } from "./pages/page-deck"
import { DecksProvider } from "./contexts/decks/hooks/use-decks"
import { Study } from './pages/page-study'


function App() {
  return (
    <DecksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deck/:id" element={<Deck />} />
          <Route path="/deck/:id/study" element={<Study />} />
        </Routes>
      </BrowserRouter>
    </DecksProvider>
  )
}

export default App
