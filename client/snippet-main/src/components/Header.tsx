import { Link, useLocation } from 'react-router-dom';
import { Terminal, Plus, List } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-primary glow-text" />
            <span className="font-mono text-foreground glow-text">
              snippet<span className="text-primary">_mgr</span>
              <span className="cursor-blink text-primary">_</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 font-mono text-sm">
            <Link
              to="/create-snippet"
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 ${
                location.pathname === '/create-snippet'
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">::new</span>
            </Link>
            <Link
              to="/snippets"
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 ${
                location.pathname === '/snippets'
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">::list</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}