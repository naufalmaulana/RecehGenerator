import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

type Theme = "light" | "dark";

const menuItems = [
  { label: "Home", path: "/home" },
  { label: "Favorite", path: "/favorite" },
  { label: "Sign in", path: "/signin" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 sm:px-6
        bg-white dark:bg-zinc-900
        border-b border-zinc-200 dark:border-zinc-700
        shadow-sm transition-colors duration-300"
      >
        {/* LEFT — Hamburger + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex items-center justify-center w-9 h-9 rounded-md
              text-zinc-700 dark:text-zinc-200
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            {/* 3-line hamburger SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="2" y1="5" x2="18" y2="5" />
              <line x1="2" y1="10" x2="18" y2="10" />
              <line x1="2" y1="15" x2="18" y2="15" />
            </svg>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute left-0 top-full mt-2 w-48 origin-top-left
              bg-white dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              rounded-lg shadow-lg overflow-hidden
              transition-all duration-200
              ${menuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <ul role="menu">
              {menuItems.map((item) => (
                <li key={item.path} role="none">
                  <button
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.path);
                    }}
                    className="group w-full text-left px-4 py-2.5 text-sm font-medium
                      text-zinc-700 dark:text-zinc-200
                      hover:bg-zinc-100 dark:hover:bg-zinc-700
                      hover:text-zinc-900 dark:hover:text-white
                      hover:pl-6
                      transition-all duration-150
                      flex items-center gap-2
                      focus:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500
                      group-hover:bg-zinc-700 dark:group-hover:bg-zinc-300
                      transition-colors duration-150 shrink-0"
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — Dark / Light toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="relative w-9 h-9 flex items-center justify-center rounded-md
            text-zinc-700 dark:text-zinc-200
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 overflow-hidden"
        >
          {/* Sun icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 absolute transition-all duration-300
              ${theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`}
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>

          {/* Moon icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 absolute transition-all duration-300
              ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
