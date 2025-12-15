import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateSnippet from './pages/CreateSnippet';
import SnippetsList from './pages/SnippetsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/snippets" replace />} />
        <Route path="/create-snippet" element={<CreateSnippet />} />
        <Route path="/snippets" element={<SnippetsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
