import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { NovedadesProvider } from './context/NovedadesContext';
import ClientView from './pages/ClientView';
import AdminDashboard from './pages/AdminDashboard';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import './index.css';

function HeaderContent({ 
  theme, 
  onToggleTheme 
}: { 
  theme: 'dark' | 'light'; 
  onToggleTheme: () => void; 
}) {
  const [logoClicks, setLogoClicks] = useState(0);
  const navigate = useNavigate();

  // Hidden admin access: 5 fast clicks on the logo
  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoClicks(0);
      navigate('/admin');
    }
  };

  // Hidden shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-title-container">
          {/* HedamPro Logo sin fondo */}
          <div 
            onClick={handleLogoClick}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              userSelect: 'none'
            }}
            title="HEDAMPRO"
          >
            <img 
              src="/logohedam.png" 
              alt="Logo HedamPro" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo.png';
              }}
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <span style={{ 
              fontSize: '1.4rem', 
              fontWeight: 900, 
              letterSpacing: '-0.5px', 
              color: 'var(--text-main)',
              textTransform: 'uppercase'
            }}>
              HEDAM<span style={{ color: 'var(--accent-red)' }}>PRO</span>
            </span>
          </div>

          <div className="header-divider"></div>

          <div className="header-text">
            <h1>NOVEDADES</h1>
            <p>Todas las noticias y anuncios de la plataforma</p>
          </div>
        </div>

        {/* Functional Interactive Dark/Light Theme Toggle */}
        <div className="flex items-center gap-4">
          <div 
            className="theme-switch" 
            onClick={onToggleTheme}
            role="button"
            tabIndex={0}
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            <div className="theme-switch-icons">
              <Moon size={14} />
              <Sun size={14} />
            </div>
            <div className="theme-switch-thumb">
              {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('hedam_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hedam_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <NovedadesProvider>
      <Router>
        <div className="app-layout">
          <HeaderContent theme={theme} onToggleTheme={toggleTheme} />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<ClientView />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          {/* Footer limpio y alineado con los mismos márgenes */}
          <footer className="footer">
            <div className="footer-inner">
              <span>© 2026 HEDAMPRO. Todos los derechos reservados. Plataforma oficial de anuncios y streaming.</span>
            </div>
          </footer>
        </div>
      </Router>
    </NovedadesProvider>
  );
}

export default App;
