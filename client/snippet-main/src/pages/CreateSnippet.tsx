import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Terminal } from 'lucide-react';
import { useSnippets } from '@/hooks/useSnippets';
import { toast } from 'sonner';

export default function CreateSnippet() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { addSnippet } = useSnippets();
  const navigate = useNavigate();

  const isValid = name.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    addSnippet(name.trim(), content.trim());
    toast.success('[SUCCESS] Snippet saved to vault');
    navigate('/snippets');
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        {/* Terminal Window */}
        <div className="terminal-window opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="terminal-header">
            <div className="terminal-dot bg-destructive" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-primary" />
            <span className="terminal-title">~/new_snippet</span>
          </div>

          <div className="terminal-body">
            {/* Command prompt */}
            <div className="command-line glow-text mb-4">
              <span>./create_snippet --interactive</span>
            </div>

            <div className="output-text mb-6">
              <p>[INFO] Starting snippet creation wizard...</p>
              <p>[INFO] Enter snippet details below.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Snippet Name */}
              <div className="opacity-0 animate-slide-up stagger-1" style={{ animationFillMode: 'forwards' }}>
                <label
                  htmlFor="snippet-name"
                  className="flex items-center gap-2 text-sm text-muted-foreground mb-2 font-mono"
                >
                  <Terminal className="w-4 h-4" />
                  <span>snippet.name =</span>
                </label>
                <input
                  id="snippet-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter_snippet_name"
                  className="terminal-input-field"
                  autoFocus
                />
              </div>

              {/* Snippet Content */}
              <div className="opacity-0 animate-slide-up stagger-2" style={{ animationFillMode: 'forwards' }}>
                <label
                  htmlFor="snippet-content"
                  className="flex items-center gap-2 text-sm text-muted-foreground mb-2 font-mono"
                >
                  <Terminal className="w-4 h-4" />
                  <span>snippet.content =</span>
                </label>
                <textarea
                  id="snippet-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="// paste your code here..."
                  rows={12}
                  className="terminal-textarea min-h-[250px]"
                />
              </div>

              {/* Status */}
              <div className="text-xs text-muted-foreground font-mono opacity-0 animate-slide-up stagger-3" style={{ animationFillMode: 'forwards' }}>
                <span className="text-primary">$</span> status: {isValid ? (
                  <span className="text-primary">ready</span>
                ) : (
                  <span className="text-muted-foreground">awaiting input...</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="opacity-0 animate-slide-up stagger-4 pt-2" style={{ animationFillMode: 'forwards' }}>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="terminal-btn w-full flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>./save_snippet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <span>MODE: INSERT</span>
        <span className="hidden sm:inline">{name ? `file: ${name}` : 'untitled'}</span>
        <span>chars: {content.length}</span>
      </div>
    </div>
  );
}