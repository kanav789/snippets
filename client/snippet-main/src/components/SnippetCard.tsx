import { useState } from 'react';
import { Copy, Check, Trash2, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import { Snippet } from '@/hooks/useSnippets';

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  index: number;
}

export function SnippetCard({ snippet, onDelete, index }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = () => {
    onDelete(snippet.id);
  };

  const formatDate = (date: number) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <div
      className="terminal-card opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground glow-text truncate font-mono">
            {snippet.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all duration-200"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={handleCopy}
            className={`p-1.5 border transition-all duration-200 ${
              copied
                ? 'border-primary text-primary bg-primary/10'
                : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary'
            }`}
            aria-label="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-muted-foreground hover:text-destructive border border-transparent hover:border-destructive transition-all duration-200"
            aria-label="Delete snippet"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-muted-foreground mb-2 font-mono">
        <span className="text-primary">$</span> created: {formatDate(snippet.createdAt)}
      </div>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-64 mt-3 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border border-border bg-secondary/30 p-3">
          <pre className="text-sm font-mono text-foreground/80 whitespace-pre-wrap break-words overflow-x-auto max-h-48">
            {snippet.content}
          </pre>
        </div>
      </div>

      {/* Copy feedback */}
      {copied && (
        <div className="mt-2 text-xs text-primary glow-text font-mono">
          [SUCCESS] Copied to clipboard
        </div>
      )}
    </div>
  );
}