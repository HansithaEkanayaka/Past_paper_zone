"use client";

import React, { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@/lib/supabase/client";

interface ProfileFormProps {
  onClose?: () => void;
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const { user, refreshUser } = useAuth();
  const { isDarkMode } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [fullName, setFullName] = useState<string>(
    (user?.user_metadata?.full_name as string) || (user?.user_metadata?.name as string) || ""
  );
  const [phone, setPhone] = useState<string>((user?.user_metadata?.phone as string) || "");
  const [location, setLocation] = useState<string>(
    (user?.user_metadata?.location as string) || ""
  );
  const [bio, setBio] = useState<string>((user?.user_metadata?.bio as string) || "");

  if (!user) return null;

  const name = fullName || user.email?.split("@")[0] || "User";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined);
  const initial = name.charAt(0).toUpperCase();
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = createClient();
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      // Requires a public "avatars" bucket created in Supabase Storage.
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

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName || undefined,
          phone: phone || undefined,
          location: location || undefined,
          bio: bio || undefined,
        },
      });

      if (error) throw error;

      await refreshUser();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Could not save your details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative transition-all duration-300 ${
        onClose ? "max-h-[90vh] overflow-y-auto" : ""
      } ${
        isDarkMode
          ? "bg-[#1A202C] border-gray-700/80 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 bg-gray-500/10 hover:bg-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
        >
          ✕
        </button>
      )}

      <h2 className="font-brand text-xl sm:text-2xl font-extrabold mb-6">My Profile</h2>

      {/* Avatar + basic info, with room beside the photo for quick facts */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex flex-col items-center gap-3 shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#DD6B20]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#DD6B20] text-white flex items-center justify-center font-bold text-3xl">
              {initial}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#DD6B20]/10 text-[#DD6B20] transition-all disabled:opacity-50 border border-[#DD6B20]/30"
          >
            {uploading ? "Uploading..." : "Change Photo"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          {uploadError && <p className="text-xs text-red-400 max-w-[9rem] text-center">{uploadError}</p>}
        </div>

        {/* Extra space next to the photo: quick contact summary */}
        <div
          className={`flex-1 rounded-2xl border p-4 ${
            isDarkMode ? "bg-[#171923] border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#DD6B20] mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[#DD6B20] shrink-0" aria-hidden="true" />
              <span className="truncate">{user.email}</span>
            </li>
            {phone && (
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#DD6B20] shrink-0" aria-hidden="true" />
                <span className="truncate">{phone}</span>
              </li>
            )}
            {location && (
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[#DD6B20] shrink-0" aria-hidden="true" />
                <span className="truncate">{location}</span>
              </li>
            )}
            {!phone && !location && (
              <li className="text-xs opacity-60">
                Add a phone number or location below and they’ll show up here.
              </li>
            )}
          </ul>
          {joinedDate && (
            <p className="mt-3 pt-3 border-t border-gray-700/20 text-xs opacity-70">
              Member since {joinedDate}
            </p>
          )}
        </div>
      </div>

      {/* Editable fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="profile-full-name" className="block text-xs font-semibold opacity-70 mb-1">
            Full Name
          </label>
          <input
            id="profile-full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
              isDarkMode
                ? "bg-[#171923] border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profile-phone" className="block text-xs font-semibold opacity-70 mb-1">
              Phone <span className="opacity-50">(optional)</span>
            </label>
            <input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07X XXX XXXX"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                isDarkMode
                  ? "bg-[#171923] border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
          <div>
            <label htmlFor="profile-location" className="block text-xs font-semibold opacity-70 mb-1">
              Location <span className="opacity-50">(optional)</span>
            </label>
            <input
              id="profile-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Sri Lanka"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
                isDarkMode
                  ? "bg-[#171923] border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="profile-bio" className="block text-xs font-semibold opacity-70 mb-1">
            About <span className="opacity-50">(optional)</span>
          </label>
          <textarea
            id="profile-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Grade, school, subjects you're studying, etc."
            className={`w-full px-4 py-2.5 rounded-xl text-sm border resize-none focus:outline-none focus:ring-2 focus:ring-[#DD6B20] ${
              isDarkMode
                ? "bg-[#171923] border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>
      </div>

      {saveError && <p className="text-xs text-red-400 mt-4">{saveError}</p>}
      {saveSuccess && <p className="text-xs text-emerald-500 mt-4">Profile updated ✓</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full py-3 rounded-xl bg-[#DD6B20] hover:bg-[#c55d1b] text-white font-bold text-sm transition-all disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
