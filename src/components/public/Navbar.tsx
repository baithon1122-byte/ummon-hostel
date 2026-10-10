import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  DollarSign,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';
import { Language } from '../../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigateAdmin }) => {
  const { language, setLanguage, currency, setCurrency, theme, toggleTheme, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('navHome') },
    { href: '#rooms', label: t('navRooms') },
    { href: '#facilities', label: t('navFacilities') },
    { href: '#about', label: t('navAbout') },
    { href: '#gallery', label: t('navGallery') },
    { href: '#attractions', label: t('navAttractions') },
    { href: '#reviews', label: t('navReviews') },
    { href: '#faq', label: t('navFaq') },
    { href: '#contact', label: t('navContact') },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071e20]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-[#F2A93B]/20 py-3'
          : 'bg-[#071e20]/75 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2B2E] via-[#164246] to-[#2EC4B6] border border-[#F2A93B]/50 flex items-center justify-center shadow-md shadow-[#2EC4B6]/10 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#F2A93B]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                Ummon <span className="text-[#F2A93B]">Hostel</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#2EC4B6] font-medium uppercase mt-0.5 block">
                Tashkent · Uzbekistan
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-200 hover:text-[#F2A93B] rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Currency, Lang, Dark/Light, Book Now, Admin */}
          <div className="hidden md:flex items-center space-x-2 xl:space-x-3">
            {/* Currency toggle */}
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'UZS' : 'USD')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0B2B2E] text-slate-200 border border-[#2EC4B6]/30 hover:border-[#F2A93B] transition-colors"
              title="Toggle Currency (USD / UZS)"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span>{currency}</span>
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-[#0B2B2E] text-slate-200 border border-[#2EC4B6]/30 hover:border-[#F2A93B] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#2EC4B6]" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#0B2B2E] border border-[#F2A93B]/30 shadow-xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/10 transition-colors ${
                        language === l.code ? 'text-[#F2A93B] font-semibold bg-white/5' : 'text-slate-300'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-[#0B2B2E] text-slate-300 hover:text-[#F2A93B] border border-white/10 hover:border-[#F2A93B]/40 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-200" />}
            </button>

            {/* Admin Portal link */}
            <button
              onClick={onNavigateAdmin}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Admin & Staff Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2EC4B6]" />
              <span className="hidden xl:inline">{t('navAdmin')}</span>
            </button>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-md shadow-[#F2A93B]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('navBookNow')}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'UZS' : 'USD')}
              className="px-2 py-1 text-xs font-semibold rounded-md bg-[#0B2B2E] text-[#F2A93B] border border-[#2EC4B6]/30"
            >
              {currency}
            </button>

            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B2B2E] bg-[#F2A93B]"
            >
              {t('navBookNow')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0B2B2E] text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071e20] border-b border-[#F2A93B]/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-white/10">
            {/* Language buttons */}
            <div className="flex gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 text-xs rounded-md ${
                    language === l.code ? 'bg-[#F2A93B] text-[#0B2B2E] font-bold' : 'bg-[#0B2B2E] text-slate-300'
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex justify-end items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-md bg-[#0B2B2E] text-slate-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateAdmin();
                }}
                className="flex items-center gap-1 text-xs text-[#2EC4B6] font-medium px-2 py-1 rounded bg-[#0B2B2E]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium text-slate-200 hover:text-[#F2A93B] rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
