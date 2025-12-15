import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSnippets, deleteSnippet } from '../utils/storage';
import { Snippet } from '../types/snippet';
import { Search, Copy, CheckCircle2, Plus, Code2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function SnippetsList() {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = () => {
    setSnippets(getSnippets());
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (snippet: Snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopiedId(snippet.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(id);
      loadSnippets();
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-green-400 font-mono overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-500 animate-pulse text-xl">▌</span>
              <h1 className="text-3xl font-bold text-green-400">$ ls --snippets</h1>
            </div>
            <p className="text-cyan-400 ml-6 text-sm">
              {`total ${snippets.length}`} {snippets.length === 1 ? 'file' : 'files'}
            </p>
          </div>

          <button
            onClick={() => navigate('/create-snippet')}
            className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border-2 border-green-500 text-green-400 font-bold hover:bg-green-500/20 transition-all shadow-lg hover:shadow-green-500/50"
          >
            <Plus className="w-5 h-5" />
            [NEW]
          </button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">$</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="grep -r snippets..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border-2 border-cyan-500/50 text-green-400 placeholder:text-green-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
            />
          </div>
        </div>

        {filteredSnippets.length === 0 ? (
          <div className="bg-slate-900/80 border-2 border-cyan-500/50 p-12 text-center">
            <div className="max-w-md mx-auto">
              <p className="text-cyan-400 mb-4 text-lg">
                {`$ find . -name "*.snippet"`}
              </p>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                {searchQuery ? '[ERROR] No snippets found' : '[EMPTY] No snippets yet'}
              </h3>
              <p className="text-cyan-400 mb-6 text-sm">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Create your first snippet to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate('/create-snippet')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border-2 border-green-500 text-green-400 font-bold hover:bg-green-500/20 transition-all shadow-lg hover:shadow-green-500/50"
                >
                  <Plus className="w-5 h-5" />
                  create_snippet
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSnippets.map((snippet, index) => {
              const isExpanded = expandedId === snippet.id;
              const isCopied = copiedId === snippet.id;

              return (
                <div
                  key={snippet.id}
                  className="bg-slate-900/80 border-2 border-green-500/50 p-6 transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">[{index + 1}]</span>
                        <span className="text-green-400 text-lg break-words">{snippet.name}</span>
                      </div>
                      <p className="text-cyan-400 text-xs mt-1 ml-6">
                        {"// created: " + new Date(snippet.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mb-4 p-4 bg-slate-950 border border-cyan-500/30 overflow-hidden rounded">
                      <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                        {snippet.content}
                      </pre>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(snippet)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-bold transition-all border-2 ${
                        isCopied
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          [COPIED]
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          copy
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleExpand(snippet.id)}
                      className="px-4 py-2.5 bg-slate-800 border-2 border-green-500/50 text-green-400 font-bold hover:border-green-400 transition-all flex items-center gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          hide
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          view
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(snippet.id)}
                      className="px-4 py-2.5 bg-red-950/50 border-2 border-red-600/50 text-red-400 font-bold hover:border-red-500 hover:bg-red-950 transition-all"
                      title="Delete snippet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
