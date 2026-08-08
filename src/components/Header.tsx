"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import UserMenu from "@/components/UserMenu";

interface Language {
  code: string;
  label: string;
}

interface NavLink {
  name: string;
  href: string;
}

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const languages: Language[] = [
    { code: "si", label: "සිංහල" },
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
  ];

  const navLinks: NavLink[] = [
    { name: t("home"), href: "/" },
    { name: t("subject"), href: "/#subjects-section" },
    { name: t("studyTips"), href: "/#study-tips" },
    { name: t("about"), href: "/#about" },
    { name: t("feedback"), href: "/#feedback" },
  ];

  const currentLocale = useLocale();

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLocale) return;
    router.replace(pathname, { locale: langCode });
  };

  // Lock background scroll when drawer or login modal is open
  useEffect(() => {
    if (isMenuOpen || isLoginModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isLoginModalOpen]);

  // Focus Trapping and Key Listener in Drawer
  useEffect(() => {
    if (!isMenuOpen) {
      menuButtonRef.current?.focus();
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push({ pathname: "/search", query: { q: trimmedQuery } });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="w-full font-sans transition-colors duration-300 sticky top-0 z-40 shadow-md">
        {/* Top Header Row */}
        <div
          className={`px-4 py-3 md:px-16 flex items-center justify-between gap-2 transition-colors duration-300 ${
            isDarkMode ? "bg-[#1A202C] text-white" : "bg-[#F7FAFC] text-gray-900"
          }`}
        >
          {/* Logo & Site Name */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-4 group shrink-0 focus:outline-none focus:ring-2 focus:ring-[#DD6B20] rounded-lg p-1"
          >
            <div className="relative w-16 h-8 sm:w-20 sm:h-10 md:w-28 md:h-14 transition-transform group-hover:scale-105 flex items-center">
              <Image
                src="/logo.png"
                alt="PastPaperZone Logo"
                width={100}
                height={100}
                className={`object-contain max-h-full w-auto transition-all ${
                  isDarkMode ? "brightness-0 invert" : ""
                }`}
                priority
              />
            </div>
            <span
              className={`font-serif text-lg sm:text-xl md:text-3xl font-bold tracking-normal ${
                isDarkMode ? "text-white" : "text-[#1A365D]"
              }`}
            >
              PastPaperZone
            </span>
          </Link>

          {/* Languages, Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <fieldset className="flex items-center gap-1 sm:gap-2">
              <legend className="sr-only">Select Language</legend>
              {languages.map((lang) => {
                const isSelected = currentLocale === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    aria-pressed={isSelected}
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                      isSelected
                        ? isDarkMode
                          ? "bg-[#DD6B20] text-white border-[#DD6B20] shadow-sm"
                          : "bg-[#1A365D] text-white border-[#1A365D] shadow-sm"
                        : isDarkMode
                        ? "bg-[#2D3748] text-gray-200 border-gray-600 hover:border-[#DD6B20]"
                        : "bg-white text-[#1A365D] border-[#1A365D]/40 hover:border-[#1A365D]"
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </fieldset>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-1.5 sm:p-2 rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                isDarkMode
                  ? "bg-[#2D3748] border-gray-600 text-yellow-400 hover:bg-[#3A4A60]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={t("openMenu")}
              className={`md:hidden p-1.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                isDarkMode
                  ? "bg-[#2D3748] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav
          aria-label="Main Desktop Navigation"
          className={`hidden md:block px-16 py-3 transition-colors duration-300 ${
            isDarkMode ? "bg-[#171923]" : "bg-[#1A365D]"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DD6B20] rounded px-1 py-0.5 ${
                        isActive
                          ? "text-[#DD6B20]"
                          : "text-white hover:text-[#DD6B20]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="relative flex items-center w-64"
              >
                <label htmlFor="desktop-site-search" className="sr-only">
                  {t("searchLabel")}
                </label>
                <input
                  id="desktop-site-search"
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-1.5 pr-10 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#DD6B20] placeholder-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 p-1 text-gray-500 hover:text-[#DD6B20] focus:outline-none focus:ring-2 focus:ring-[#DD6B20] rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>

              {/* Desktop Login Button (Opens Modal) OR User Menu when logged in */}
              {user ? (
                <UserMenu />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 text-white text-sm font-semibold hover:text-[#DD6B20] focus:outline-none focus:ring-2 focus:ring-[#DD6B20] rounded px-2 py-1 transition-colors duration-200"
                >
                  <span>{t("login")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Slide-Over Drawer Container */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Over Menu Panel */}
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className={`fixed inset-y-0 right-0 w-full max-w-xs shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
              isDarkMode ? "bg-[#171923] text-white" : "bg-[#1A365D] text-white"
            } ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                <span className="font-serif text-xl font-bold tracking-wide">
                  {t("menu")}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={t("closeMenu")}
                  className="p-2 rounded-lg border border-gray-600 hover:bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#DD6B20]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Search Form */}
              <form onSubmit={handleSearchSubmit} role="search" className="mt-6">
                <label htmlFor="mobile-site-search" className="sr-only">
                  {t("searchLabel")}
                </label>
                <div className="relative flex items-center">
                  <input
                    id="mobile-site-search"
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DD6B20] placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-2 p-1.5 text-gray-500 hover:text-[#DD6B20] focus:outline-none focus:ring-2 focus:ring-[#DD6B20] rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <nav aria-label="Mobile Secondary Navigation" className="mt-6">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`block py-2.5 px-3 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                            isActive
                              ? "bg-[#DD6B20] text-white"
                              : "hover:bg-white/10 text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Drawer Footer Login Button (Opens Modal) OR user info when logged in */}
            <div className="pt-6 border-t border-gray-700">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    {(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                      <img
                        src={user.user_metadata.avatar_url || user.user_metadata.picture}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#DD6B20]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#DD6B20] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {((user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                    <span className="text-white text-sm font-semibold truncate">
                      {(user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await signOut();
                    }}
                    className="text-xs font-bold text-red-400 hover:text-red-300 px-3 py-2 shrink-0"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-[#DD6B20] hover:bg-[#c55d1b] text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span>{t("login")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login / Register Popup Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <LoginForm
            onClose={() => setIsLoginModalOpen(false)}
            onSuccess={() => setIsLoginModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}