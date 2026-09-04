import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#rider-portal' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Requirements', href: '#requirements' },
  { name: 'Application', href: '#application' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToApplication = () => {
    setMobileMenuOpen(false);
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('#rider-portal')}
          className="flex items-center gap-3 group text-left"
          aria-label="Go to rider portal home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden shadow-lg shadow-black/20 group-hover:scale-105 transition-transform">
            {/* Vite will successfully serve this from your public folder */}
            <img 
              src="/images/favicon.svg" 
              alt="Metro Transit Logistics Logo" 
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white block uppercase leading-none">
              Metro Transit <span className="text-[#D61F26]">Logistics</span>
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-zinc-400 block uppercase mt-0.5">
              RIDER & DRIVER PORTAL
            </span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Rider portal navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => {
                if (link.href.startsWith('#')) {
                  event.preventDefault();
                  handleNavClick(link.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#D61F26] transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToApplication}
            className="flex items-center gap-2 px-4 py-2 bg-[#D61F26] hover:bg-[#b8181e] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#D61F26]/20 hover:scale-[1.02]"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="p-2 text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl lg:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#D61F26]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-[#0d0d0d]/98 backdrop-blur-md border-y border-zinc-800 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3" aria-label="Mobile rider portal navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  if (link.href.startsWith('#')) {
                    event.preventDefault();
                    handleNavClick(link.href);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="text-sm font-semibold text-zinc-300 hover:text-[#D61F26] transition-colors py-2 border-b border-zinc-900"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToApplication}
            className="w-full py-3 bg-[#D61F26] hover:bg-[#b8181e] text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Your Application</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
