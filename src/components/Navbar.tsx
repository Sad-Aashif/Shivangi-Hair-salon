import { Moon, Sun } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { to: '/', label: 'Showcase', end: true },
  { to: '/craftsman', label: 'Craftsman', end: false },
  { to: '/menu', label: 'Menu', end: false },
  { to: '/salon', label: 'Salon', end: false },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F1EA]/85 dark:bg-[#070709]/85 backdrop-blur-md transition-colors duration-300 border-b border-stone-900/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Left: Original Logo (Exact /logo.jpg, zero CSS filters) */}
        <Link 
          to="/" 
          className="flex items-center gap-3.5 group focus:outline-none min-h-[44px]"
          aria-label="Shivangi Hair Salon Home"
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-black shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.jpg" 
              alt="Shivangi Hair Salon Men's Grooming Logo" 
              className="w-full h-full object-cover"
              style={{ filter: 'none' }}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <span className="font-display text-sm sm:text-lg font-bold tracking-wider text-[#141413] dark:text-[#F4F1EA]">
            Shivangi Hair Salon
          </span>
        </Link>

        {/* Center: Minimalist Route Navigation (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative min-h-[44px] px-2 flex items-center transition-colors duration-200 ${
                  isActive
                    ? 'text-[#141413] dark:text-[#F4F1EA] after:content-[""] after:absolute after:left-2 after:right-2 after:bottom-2 after:h-[1.5px] after:bg-[#9A7848] dark:after:bg-[#C5A059]'
                    : 'text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Crisp Lucide SVG Icon Toggle (Moon / Sun) with 44px touch target */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer bg-stone-900/5 dark:bg-white/10 hover:bg-stone-900/10 dark:hover:bg-white/15 text-[#141413] dark:text-[#F4F1EA]"
          aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 stroke-[1.75]" />
          ) : (
            <Sun className="w-4 h-4 stroke-[1.75]" />
          )}
        </button>

      </div>

      {/* Mobile Route Strip with >=44px touch targets */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden flex items-center justify-around px-2 py-1 border-t border-stone-900/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-[0.16em]"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `min-h-[44px] px-3 flex items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? 'text-[#9A7848] dark:text-[#C5A059] bg-[#9A7848]/10 dark:bg-[#C5A059]/10'
                  : 'text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA]'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
