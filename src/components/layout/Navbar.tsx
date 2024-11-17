import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '../shared/Button';

const navItems = [
  { href: '#reviews', label: 'Customer Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#converter', label: 'Converter' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            YeuSwap
          </Link>

          <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="flex items-center space-x-8 lg:space-x-12">
              {navItems.map(({ href, label }) => (
                <a 
                  key={href}
                  href={href}
                  className="text-gray-800 font-medium text-sm lg:text-[15px] hover:text-primary transition-colors relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link to="/auth">
              <Button>
                <span>Connexion</span>
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block px-3 py-2 text-base text-gray-800 font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}
            <Link
              to="/auth"
              className="mt-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              <Button fullWidth>
                <span>Connexion</span>
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}