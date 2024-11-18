import React from 'react';
import { Menu, X, LogIn, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDark ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-primary'} transition-colors`}>
              YeuSwap
            </Link>
          </div>

          {/* Desktop menu - Centered */}
          <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <a 
                href="#reviews" 
                className={`font-medium text-sm lg:text-base ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors relative group`}
              >
                Customer Reviews
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a 
                href="#faq" 
                className={`font-medium text-sm lg:text-base ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors relative group`}
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a 
                href="#converter" 
                className={`font-medium text-sm lg:text-base ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors relative group`}
              >
                Converter
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
            </div>
          </div>

          {/* Theme toggle and Login button */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link 
              to="/auth" 
              className={`${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2`}
            >
              <span>Connexion</span>
              <LogIn className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-4 py-3 space-y-3">
            <a
              href="#reviews"
              className={`block px-3 py-2 text-base font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors rounded-lg`}
              onClick={() => setIsOpen(false)}
            >
              Customer Reviews
            </a>
            <a
              href="#faq"
              className={`block px-3 py-2 text-base font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors rounded-lg`}
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#converter"
              className={`block px-3 py-2 text-base font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-primary'} transition-colors rounded-lg`}
              onClick={() => setIsOpen(false)}
            >
              Converter
            </a>
            <Link
              to="/auth"
              className={`block w-full ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} px-4 py-2 rounded-lg text-base transition-colors flex items-center justify-center gap-2`}
              onClick={() => setIsOpen(false)}
            >
              <span>Connexion</span>
              <LogIn className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}