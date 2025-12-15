import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSnippet } from '../utils/storage';
import { Code2, CheckCircle2 } from 'lucide-react';

export default function CreateSnippet() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid = name.trim() && content.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    saveSnippet({ name: name.trim(), content: content.trim() });

    setShowSuccess(true);

    setTimeout(() => {
      navigate('/snippets');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-green-400 font-mono overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <button
            onClick={() => navigate('/snippets')}
            className="text-cyan-400 hover:text-green-400 transition-colors text-sm font-bold mb-4 hover:translate-x-1 inline-block"
          >
            &lt;-- Back to Snippets
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-green-500 animate-pulse text-xl">▌</span>
            <h1 className="text-3xl font-bold text-green-400">$ create_snippet.sh</h1>
          </div>
          <p className="text-cyan-400 ml-6 text-sm">{"// Save your code snippets for quick access"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-900/80 border-2 border-green-500/50 p-6 transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20">
            <label className="block mb-3">
              <span className="text-green-400 font-bold text-sm">input_name:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="$ Enter snippet name..."
              className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 text-green-400 placeholder:text-green-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono text-sm"
              autoFocus
            />
          </div>

          <div className="bg-slate-900/80 border-2 border-green-500/50 p-6 transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20">
            <label className="block mb-3">
              <span className="text-green-400 font-bold text-sm">input_content:</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="$ Paste or write your snippet here..."
              rows={12}
              className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 text-green-400 placeholder:text-green-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono text-sm resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!isValid || showSuccess}
              className={`flex-1 py-4 font-mono font-bold text-lg transition-all border-2 ${
                isValid && !showSuccess
                  ? 'bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer'
                  : 'bg-slate-900 border-slate-700 text-slate-600 cursor-not-allowed'
              }`}
            >
              {showSuccess ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  [SAVED]
                </span>
              ) : (
                '$ SAVE_SNIPPET'
              )}
            </button>
          </div>
        </form>
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
