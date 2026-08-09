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
  const {
    user,
    signOut,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

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
    { name: t("pomodoro"), href: "/#pomodoro-section" },
    { name: t("about"), href: "/#about" },
    { name: t("feedback"), href: "/#feedback" },
  ];

  const currentLocale = useLocale();

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLocale) return;
    router.replace(pathname, { locale: langCode });
  };

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

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const evaluate = () => {
      const y = window.scrollY;
      if (y <= 20) {
        setIsScrolled(false);
      } else if (y > lastY && y > 80) {
        setIsScrolled(true);
      } else if (y < lastY - 5) {
        setIsScrolled(false);
      }
      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = [
      "subjects-section",
      "study-tips",
      "pomodoro-section",
      "about",
      "feedback",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        } else if (window.scrollY < 200) {
          setActiveSection("");
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isNavLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeSection;
    }
    const hash = href.split("#")[1];
    return !!hash && activeSection === hash;
  };

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
      <header className="w-full font-sans sticky top-0 z-40 bg-transparent overflow-hidden">
        {/* Top row (Logo, Lang, Theme toggle සහ Mobile menu button එක) */}
        <div
          style={{
            transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
            opacity: isScrolled ? 0 : 1,
            visibility: isScrolled ? "hidden" : "visible",
            transition: "transform 0.3s ease-in-out, opacity 0.2s ease-in-out",
          }}
          className="w-full"
        >
          <div
            className={`flex items-center justify-between gap-2 px-4 md:px-16 py-3 ${
              isDarkMode ? "bg-[#1A202C] text-white" : "bg-[#F7FAFC] text-gray-900"
            }`}
          >
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-4 group shrink-0 focus:outline-none rounded-lg p-1 transition-all"
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
                className={`font-brand text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight ${
                  isDarkMode ? "text-white" : "text-[#1A365D]"
                }`}
              >
                PastPaper<span className="text-[#DD6B20]">Zone</span>
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative shrink-0">
                <label htmlFor="site-language-select" className="sr-only">
                  Select Language
                </label>
                <select
                  id="site-language-select"
                  value={currentLocale}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className={`appearance-none cursor-pointer pl-2.5 pr-6 py-1 sm:pl-3 sm:pr-7 sm:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium border-0 outline-none ring-1 ring-inset transition-colors ${
                    isDarkMode
                      ? "bg-[#2D3748] text-gray-100 ring-gray-600 focus:ring-2 focus:ring-[#DD6B20]"
                      : "bg-white text-[#1A365D] ring-gray-300 focus:ring-2 focus:ring-[#DD6B20]"
                  }`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <svg
                  className={`pointer-events-none absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#1A365D]"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className={`p-1.5 sm:p-2 rounded-full border-0 outline-none ring-1 ring-inset transition-colors ${
                  isDarkMode
                    ? "bg-[#2D3748] ring-gray-600 text-yellow-400 hover:bg-[#3A4A60] focus:ring-2 focus:ring-[#DD6B20]"
                    : "bg-white ring-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-[#DD6B20]"
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

              {/* Mobile Menu Toggle Button (Theme toggle එකට ළඟින්, md:hidden නිසා ඩිස්ක්ටොප් එකේදී නොපෙන්වයි) */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-drawer"
                aria-label={t("openMenu")}
                className={`md:hidden p-1.5 sm:p-2 rounded-lg border-0 outline-none ring-1 ring-inset transition-colors ${
                  isDarkMode
                    ? "bg-[#2D3748] ring-gray-600 text-white focus:ring-2 focus:ring-[#DD6B20]"
                    : "bg-white ring-gray-300 text-gray-800 focus:ring-2 focus:ring-[#DD6B20]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
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
        </div>

        {/* Navigation Bar - Desktop වලදී පමණක් පෙන්වයි (hidden md:block) */}
        <nav
          aria-label="Main Navigation"
          className={`px-4 md:px-16 py-3 transition-colors shadow-sm hidden md:block ${
            isDarkMode ? "bg-[#171923]" : "bg-[#1A365D]"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto py-1">
              {navLinks.map((link) => {
                const isActive = isNavLinkActive(link.href);
                return (
                  <li key={link.name} className="shrink-0">
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-xs sm:text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B20] rounded px-1.5 py-1 ${
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

            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="relative hidden sm:flex items-center w-40 md:w-64"
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
                  className="w-full px-4 py-1.5 pr-10 text-sm text-gray-900 bg-white rounded-full outline-none ring-0 focus:ring-2 focus:ring-[#DD6B20] placeholder-gray-500 shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 p-1 text-gray-500 hover:text-[#DD6B20] outline-none focus:ring-2 focus:ring-[#DD6B20] rounded-full"
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

              {user ? (
                <UserMenu />
              ) : (
                <button
                  type="button"
                  onClick={() => openLoginModal()}
                  className="flex items-center justify-center gap-1.5 text-white text-xs sm:text-sm font-semibold hover:text-[#DD6B20] outline-none focus-visible:ring-2 focus-visible:ring-[#DD6B20] rounded px-2 py-1 transition-colors"
                >
                  <span className="hidden sm:inline">{t("login")}</span>
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

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

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
              <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                <span className="font-serif text-xl font-bold tracking-wide">
                  {t("menu")}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={t("closeMenu")}
                  className="p-2 rounded-lg border border-gray-600 hover:bg-white/10 text-white outline-none focus:ring-2 focus:ring-[#DD6B20]"
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
                    className="w-full px-4 py-2 pr-10 text-sm text-gray-900 bg-white rounded-lg outline-none focus:ring-2 focus:ring-[#DD6B20] placeholder-gray-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-2 p-1.5 text-gray-500 hover:text-[#DD6B20] outline-none focus:ring-2 focus:ring-[#DD6B20] rounded-lg"
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

              <nav aria-label="Mobile Secondary Navigation" className="mt-6">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = isNavLinkActive(link.href);
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`block py-2.5 px-3 rounded-md text-base font-medium transition-colors outline-none focus:ring-2 focus:ring-[#DD6B20] ${
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

            <div className="pt-6 border-t border-gray-700">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    {(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                      <Image
                        src={user.user_metadata.avatar_url || user.user_metadata.picture}
                        alt=""
                        width={36}
                        height={36}
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
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xs font-bold text-white/85 hover:text-white px-2 py-2"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        setIsMenuOpen(false);
                        await signOut();
                      }}
                      className="text-xs font-bold text-red-400 hover:text-red-300 px-2 py-2"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLoginModal();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-[#DD6B20] hover:bg-[#c55d1b] text-white font-semibold transition-colors outline-none focus:ring-2 focus:ring-white"
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

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <LoginForm
            onClose={() => closeLoginModal()}
            onSuccess={() => closeLoginModal()}
          />
        </div>
      )}
    </>
  );
}