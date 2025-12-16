import { useState, useEffect } from 'react';

export interface Snippet {
  id: string;
  name: string;
  content: string;
  createdAt: number;
}

const STORAGE_KEY = 'copy-snippets';

export function useSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  // Load snippets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSnippets(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse snippets from localStorage');
      }
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (name: string, content: string) => {
    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      name,
      content,
      createdAt: Date.now(),
    };
    setSnippets((prev) => [newSnippet, ...prev]);
    return newSnippet;
  };

  const deleteSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSnippet = (id: string, name: string, content: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name, content } : s))
    );
  };

  return {
    snippets,
    addSnippet,
    deleteSnippet,
    updateSnippet,
  };
}
