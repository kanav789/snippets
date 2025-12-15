import { Snippet } from '../types/snippet';

const STORAGE_KEY = 'copy-snippets';

export const getSnippets = (): Snippet[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
};

export const saveSnippet = (snippet: Omit<Snippet, 'id' | 'createdAt'>): Snippet => {
  const snippets = getSnippets();
  const newSnippet: Snippet = {
    ...snippet,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newSnippet, ...snippets];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newSnippet;
};

export const deleteSnippet = (id: string): void => {
  const snippets = getSnippets();
  const filtered = snippets.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
