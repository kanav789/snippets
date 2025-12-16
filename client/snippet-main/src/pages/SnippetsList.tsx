import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Terminal, Database } from 'lucide-react';
import { useSnippets } from '@/hooks/useSnippets';
import { SnippetCard } from '@/components/SnippetCard';

export default function SnippetsList() {
  const { snippets, deleteSnippet } = useSnippets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim()) return snippets;
    const query = searchQuery.toLowerCase();
    return snippets.filter((snippet) =>
      snippet.name.toLowerCase().includes(query)
    );
  }, [snippets, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Terminal Window */}
        <div className="terminal-window mb-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="terminal-header">
            <div className="terminal-dot bg-destructive" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-primary" />
            <span className="terminal-title">~/snippets</span>
          </div>

          <div className="terminal-body">
            {/* Command prompt */}
            <div className="command-line glow-text mb-2">
              <span>./list_snippets --all</span>
            </div>

            <div className="output-text mb-4">
              <p className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>[INFO] Found {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} in vault</span>
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-border bg-secondary/30 px-3 py-2 opacity-0 animate-slide-up stagger-1" style={{ animationFillMode: 'forwards' }}>
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">grep</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search_pattern"
                className="terminal-input flex-1"
              />
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredSnippets.map((snippet, index) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onDelete={deleteSnippet}
                index={index}
              />
            ))}
          </div>
        ) : snippets.length > 0 ? (
          /* No search results */
          <div className="terminal-window opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="terminal-body text-center py-8">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-mono text-sm">
                [ERROR] No matches found for "{searchQuery}"
              </p>
              <p className="text-muted-foreground font-mono text-xs mt-2">
                Try a different search pattern
              </p>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="terminal-window opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="terminal-body text-center py-12">
              <Terminal className="w-12 h-12 text-primary mx-auto mb-4 glow-text" />
              <div className="font-mono space-y-2 mb-6">
                <p className="text-foreground glow-text">vault.isEmpty() == true</p>
                <p className="text-muted-foreground text-sm">[INFO] No snippets stored yet.</p>
                <p className="text-muted-foreground text-sm">[INFO] Run ./create_snippet to get started.</p>
              </div>
              <Link to="/create-snippet" className="terminal-btn inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                ./create_snippet
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <span>MODE: NORMAL</span>
        <span className="hidden sm:inline">
          {searchQuery ? `filter: "${searchQuery}"` : 'no filter'}
        </span>
        <span>total: {snippets.length}</span>
      </div>
    </div>
  );
}