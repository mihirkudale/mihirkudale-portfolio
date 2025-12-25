import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const menuItems = [
    { label: "home", path: "/" },
    { label: "about", path: "/about" },
    { label: "skills", path: "/skills" },
    { label: "experience", path: "/experience" },
    { label: "projects", path: "/projects" },
    { label: "education", path: "/education" },
    { label: "certifications", path: "/certifications" },
    { label: "testimonials", path: "/testimonials" },
    { label: "contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.postimg.cc/gjnbb9xF/80c8c743-9757-4139-b053-b2b33bce6626.png"
              alt="Mihir Kudale Logo"
              className="h-8 w-auto"
            />
            <span className="sr-only">Mihir Kudale</span>
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-800 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 transition focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="capitalize text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-4 pb-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="capitalize text-base font-medium text-gray-800 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 transition duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};