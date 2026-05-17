import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookView from './pages/BookView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:slug" element={<BookView />} />
        <Route path="*" element={<div className="p-10 text-center text-gray-500">Página não encontrada.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;