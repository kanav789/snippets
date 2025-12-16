import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';

const asciiLogo = `
 ██████╗ ██████╗ ██████╗ ██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
██║     ██║   ██║██████╔╝ ╚████╔╝ 
██║     ██║   ██║██╔═══╝   ╚██╔╝  
╚██████╗╚██████╔╝██║        ██║   
 ╚═════╝ ╚═════╝ ╚═╝        ╚═╝   
███████╗███╗   ██╗██╗██████╗ ██████╗ ███████╗████████╗███████╗
██╔════╝████╗  ██║██║██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝
███████╗██╔██╗ ██║██║██████╔╝██████╔╝█████╗     ██║   ███████╗
╚════██║██║╚██╗██║██║██╔═══╝ ██╔═══╝ ██╔══╝     ██║   ╚════██║
███████║██║ ╚████║██║██║     ██║     ███████╗   ██║   ███████║
╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝     ╚══════╝   ╚═╝   ╚══════╝
`;

const commands = [
  { cmd: 'snippet --save', desc: 'Store frequently used code blocks' },
  { cmd: 'snippet --copy', desc: 'Copy to clipboard with one click' },
  { cmd: 'snippet --search', desc: 'Find snippets instantly' },
];

export default function Index() {
  return (
    <div className="min-h-screen pt-14">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* ASCII Logo */}
          <div className="terminal-window mb-8 opacity-0 animate-fade-in">
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-primary" />
              <span className="terminal-title">~/snippet_manager</span>
            </div>
            <div className="terminal-body overflow-x-auto">
              <pre className="ascii-header text-xs sm:text-sm leading-tight">{asciiLogo}</pre>
            </div>
          </div>

          {/* Description */}
          <div className="terminal-window mb-8 opacity-0 animate-slide-up stagger-1" style={{ animationFillMode: 'forwards' }}>
            <div className="terminal-header">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="terminal-title">system.log</span>
            </div>
            <div className="terminal-body space-y-4">
              <div className="command-line glow-text">
                <span>./init --welcome</span>
              </div>
              <div className="output-text">
                <p className="mb-2">[INFO] Code Snippet Manager v1.0.0</p>
                <p className="mb-2">[INFO] Your personal snippet vault.</p>
                <p>[INFO] Stop searching through old projects.</p>
                <p>[INFO] Save, organize, and copy your code in seconds.</p>
              </div>
            </div>
          </div>

          {/* Commands */}
          <div className="terminal-window mb-8 opacity-0 animate-slide-up stagger-2" style={{ animationFillMode: 'forwards' }}>
            <div className="terminal-header">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="terminal-title">features.sh</span>
            </div>
            <div className="terminal-body space-y-3">
              {commands.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <code className="text-primary glow-text">$ {item.cmd}</code>
                  <span className="text-muted-foreground text-sm"># {item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-slide-up stagger-3" style={{ animationFillMode: 'forwards' }}>
            <Link to="/create-snippet" className="terminal-btn flex items-center gap-2">
              <span>./create_snippet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/snippets" className="terminal-btn-ghost">
              ./list_all
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="status-bar">
        <span>MODE: INSERT</span>
        <span className="hidden sm:inline">snippet_manager v1.0.0</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}