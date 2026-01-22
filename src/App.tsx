import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { DeckPage } from "./pages/page-deck"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck/:id" element={<DeckPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
