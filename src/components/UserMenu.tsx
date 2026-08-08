"use client";

import React, { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@/lib/supabase/client";

export default function UserMenu() {
  const { user, refreshUser, signOut } = useAuth();
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const name =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    user.email?.split("@")[0] ||
    "User";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined);
  const initial = name.charAt(0).toUpperCase();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = createClient();
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      // Requires a public "avatars" bucket created in Supabase Storage
      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadErr) throw uploadErr;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateErr } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateErr) throw updateErr;

      await refreshUser();
    } catch (err: any) {
      setUploadError(err.message || "Photo upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#DD6B20]"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-8 h-8 rounded-full object-cover border-2 border-[#DD6B20]"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#DD6B20] text-white flex items-center justify-center font-bold text-sm">
            {initial}
          </div>
        )}
        <span className="hidden lg:inline text-white text-sm font-semibold max-w-[100px] truncate">
          {name}
        </span>
      </button>

      {isOpen && (
        <>
          {/* click-away backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl z-50 p-4 ${
              isDarkMode
                ? "bg-[#1A202C] border-gray-700 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-700/30">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#DD6B20]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#DD6B20] text-white flex items-center justify-center font-bold text-lg">
                  {initial}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            {uploadError && (
              <p className="text-xs text-red-400 mb-2">{uploadError}</p>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full text-left text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#DD6B20]/10 text-[#DD6B20] transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Change Profile Photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                await signOut();
              }}
              className="w-full text-left text-xs font-bold px-3 py-2 mt-1 rounded-xl hover:bg-red-500/10 text-red-400 transition-all"
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
