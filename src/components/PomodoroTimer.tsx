"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

// Kept as a small local map (rather than a next-intl message key) so this
// badge never throws MISSING_MESSAGE if a project's messages/*.json files
// haven't been updated alongside this component.
const SWITCH_BADGE_TEXT: Record<string, string> = {
  en: "Switching to Pomodoro Timer",
  si: "පොමඩෝරෝ ටයිමරයට මාරු වෙමින්",
  ta: "போமடோரோ டைமருக்கு மாறுகிறது",
};

type TimerMode = "work" | "shortBreak" | "longBreak";

const TIMER_DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_ORDER: TimerMode[] = ["work", "shortBreak", "longBreak"];

// Sessions are tracked per calendar day (in the browser's local time) and
// saved to localStorage, so the "Today's Sessions" summary survives page
// reloads instead of resetting to 0 every time.
const STORAGE_KEY = "pomodoro-session-log";

function todayKey() {
  return new Date().toDateString();
}

function loadTodayStats(): { sessions: number; focusMinutes: number } {
  if (typeof window === "undefined") return { sessions: 0, focusMinutes: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { sessions: 0, focusMinutes: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayKey()) return { sessions: 0, focusMinutes: 0 };
    return { sessions: parsed.sessions || 0, focusMinutes: parsed.focusMinutes || 0 };
  } catch {
    return { sessions: 0, focusMinutes: 0 };
  }
}

function saveTodayStats(sessions: number, focusMinutes: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: todayKey(), sessions, focusMinutes })
  );
}

export default function PomodoroTimer() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("pomodoro");
  const locale = useLocale();
  const switchBadgeText = SWITCH_BADGE_TEXT[locale] || SWITCH_BADGE_TEXT.en;

  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATIONS.work);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  const [focusMinutes, setFocusMinutes] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [flashMessage, setFlashMessage] = useState<string>("");

  // "Now switching to Pomodoro" badge - shown briefly the moment this
  // section scrolls into view (e.g. coming down from Study Tips), so the
  // jump from one section to the next is announced instead of silent.
  const [showSwitchBadge, setShowSwitchBadge] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const switchBadgeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let hasEntered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;
          setShowSwitchBadge(true);
          if (switchBadgeTimeoutRef.current) clearTimeout(switchBadgeTimeoutRef.current);
          switchBadgeTimeoutRef.current = setTimeout(() => setShowSwitchBadge(false), 2500);
        }
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          // Scrolled back above the section - allow the badge to fire
          // again next time it's scrolled into view.
          hasEntered = false;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (switchBadgeTimeoutRef.current) clearTimeout(switchBadgeTimeoutRef.current);
    };
  }, []);

  // Load today's saved progress once the component mounts in the browser.
  useEffect(() => {
    const stats = loadTodayStats();
    setSessionsCompleted(stats.sessions);
    setFocusMinutes(stats.focusMinutes);
  }, []);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Play a short three-beep alert using the Web Audio API (no external file needed).
  const playAlertSound = useCallback(() => {
    if (!isSoundOn) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const beepTimes = [0, 0.3, 0.6];
      beepTimes.forEach((startOffset) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = 880;
        gainNode.gain.setValueAtTime(0.0001, ctx.currentTime + startOffset);
        gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + startOffset + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startOffset + 0.22);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start(ctx.currentTime + startOffset);
        oscillator.stop(ctx.currentTime + startOffset + 0.25);
      });
    } catch {
      // Web Audio not available (e.g. very old browser) — fail silently.
    }
  }, [isSoundOn]);

  const showFlashMessage = useCallback((message: string) => {
    setFlashMessage(message);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setFlashMessage(""), 5000);
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Handle a session finishing: alert sound + message + auto-advance to the next mode.
  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;

    setIsRunning(false);
    playAlertSound();

    const messageKey =
      mode === "work" ? "timeUpWork" : mode === "shortBreak" ? "timeUpShortBreak" : "timeUpLongBreak";
    showFlashMessage(t(messageKey));

    if (mode === "work") {
      setSessionsCompleted((prev) => {
        const next = prev + 1;
        setFocusMinutes((prevMinutes) => {
          const nextMinutes = prevMinutes + TIMER_DURATIONS.work / 60;
          saveTodayStats(next, nextMinutes);
          return nextMinutes;
        });
        return next;
      });
    }
  }, [timeLeft, isRunning, mode, playAlertSound, showFlashMessage, t]);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setFlashMessage("");
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
    setFlashMessage("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalTime = TIMER_DURATIONS[mode];
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <section
      id="pomodoro-section"
      ref={sectionRef}
      className={`relative w-full py-16 px-6 md:px-16 border-b transition-colors duration-300 ${
        isDarkMode ? "bg-[#171923] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* "Now switching" badge - fades in as the section is scrolled into
          view, then fades itself back out a couple of seconds later. */}
      <div
        aria-live="polite"
        className={`absolute top-3 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
          showSwitchBadge ? "opacity-100 animate-switchBadge" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full bg-[#DD6B20] text-white shadow-lg shadow-orange-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          {switchBadgeText}
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#DD6B20] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-extrabold mt-3 ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
            {t("heading")}
          </h2>
          <p className={`mt-3 text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {t("description")}
          </p>
        </div>

        <div
          className={`w-full max-w-md mx-auto rounded-3xl p-8 shadow-2xl text-center font-sans border transition-all duration-300 ${
            isDarkMode
              ? "bg-[#2D3748] border-gray-700 text-white"
              : "bg-gray-50 border-gray-200 text-gray-900"
          }`}
        >
          {/* Mode Switcher */}
          <div
            className={`flex justify-center gap-2 mb-8 p-1.5 rounded-2xl border ${
              isDarkMode ? "bg-[#171923] border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            {MODE_ORDER.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                  mode === m
                    ? "bg-[#DD6B20] text-white shadow-md shadow-orange-500/20"
                    : isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {t(m)}
              </button>
            ))}
          </div>

          {/* Time Display */}
          <div className="text-6xl sm:text-7xl font-black my-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#DD6B20] to-amber-400 font-mono">
            {formatTime(timeLeft)}
          </div>

          {/* Progress Bar */}
          <div
            className={`w-full h-2.5 rounded-full overflow-hidden mb-8 ${
              isDarkMode ? "bg-[#171923]" : "bg-gray-200"
            }`}
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#DD6B20] to-amber-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleTimer}
              className={`w-36 py-3.5 rounded-xl font-extrabold text-base transition-all duration-200 shadow-lg ${
                isRunning
                  ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/10"
                  : "bg-[#DD6B20] hover:bg-[#c55d1b] text-white shadow-orange-500/20"
              }`}
            >
              {isRunning ? t("pause") : t("start")}
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className={`px-5 py-3.5 font-bold rounded-xl border transition-all text-sm ${
                isDarkMode
                  ? "bg-[#171923] hover:bg-gray-800 text-gray-300 border-gray-700"
                  : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {t("reset")}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setIsSoundOn((prev) => !prev)}
              aria-label={isSoundOn ? t("soundOnLabel") : t("soundOffLabel")}
              aria-pressed={isSoundOn}
              className={`p-3.5 rounded-xl border transition-all ${
                isDarkMode
                  ? "bg-[#171923] hover:bg-gray-800 text-gray-300 border-gray-700"
                  : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {isSoundOn ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M23 9l-6 6M17 9l6 6" />
                </svg>
              )}
            </button>
          </div>

          {/* Flash / completion message */}
          <div
            aria-live="polite"
            className={`mt-6 text-sm font-semibold transition-all duration-300 ${
              flashMessage ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
            } ${isDarkMode ? "text-amber-300" : "text-[#c55d1b]"}`}
          >
            {flashMessage}
          </div>

          {/* Today's Summary */}
          <div
            className={`mt-6 pt-6 border-t grid grid-cols-2 gap-3 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`rounded-xl p-3 text-center ${
                isDarkMode ? "bg-[#171923]" : "bg-white border border-gray-200"
              }`}
            >
              <p className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {sessionsCompleted}
              </p>
              <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t("sessionsCompleted")} Today
              </p>
            </div>
            <div
              className={`rounded-xl p-3 text-center ${
                isDarkMode ? "bg-[#171923]" : "bg-white border border-gray-200"
              }`}
            >
              <p className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-[#1A365D]"}`}>
                {Math.round(focusMinutes)}
                <span className="text-sm font-bold">m</span>
              </p>
              <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Focused Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
