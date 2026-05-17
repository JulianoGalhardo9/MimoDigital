import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookView from './pages/BookView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book/:slug" element={<BookView />} />
        <Route path="*" element={<div className="p-10 text-center text-gray-500">Use o link recebido para ver o talão de cupons.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;