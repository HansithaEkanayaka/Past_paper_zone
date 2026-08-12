"use client";

import React from "react";

const channels = [
  {
    name: "Join our Telegram Channel",
    href: "https://t.me/pastpaperzone",
    color: "#1296db",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M21.8 4.6 18.7 19c-.23 1.02-.83 1.27-1.69.79l-4.68-3.45-2.26 2.18c-.25.25-.46.46-.94.46l.34-4.77 8.68-7.84c.38-.34-.08-.53-.59-.19L6.84 12.93 2.2 11.48c-1.01-.32-1.03-1.01.21-1.5L20.57 2.9c.86-.32 1.61.2 1.23 1.7Z" />
      </svg>
    ),
  },
  {
    name: "Join our WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029Vb8RqjPAzNc4YQVrOp0B",
    color: "#20c76b",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M12 2.04a9.91 9.91 0 0 0-8.54 15.04L2.04 22l5.08-1.4A9.9 9.9 0 1 0 12 2.04Zm0 17.84c-1.65 0-3.27-.44-4.69-1.28l-.34-.2-3.01.83.84-2.94-.22-.35A7.94 7.94 0 1 1 12 19.88Zm4.36-5.95c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    ),
  },
];

export default function SocialChannelButtons() {
  return (
    <div
      className="fixed right-4 sm:right-6 bottom-[104px] sm:bottom-[112px] z-40 flex flex-col items-end gap-3"
      aria-label="PastPaperZone social channels"
    >
      {channels.map((channel) => (
        <a
          key={channel.href}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={channel.name}
          className="group flex items-center justify-end"
        >
          <span
            className="mr-[-8px] hidden sm:flex h-11 items-center rounded-l-2xl rounded-r-lg px-5 pr-7 text-sm font-extrabold text-white shadow-lg transition-all duration-200 group-hover:-translate-x-1"
            style={{ backgroundColor: channel.color }}
          >
            {channel.name}
          </span>

          <span
            className="social-channel-button relative grid h-16 w-16 place-items-center rounded-full text-white shadow-lg ring-4 ring-white/70 transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-105"
            style={{ backgroundColor: channel.color }}
          >
            {channel.icon}
          </span>
        </a>
      ))}
    </div>
  );
}
