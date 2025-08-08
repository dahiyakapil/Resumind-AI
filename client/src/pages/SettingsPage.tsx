import React from "react";
import { AvatarPicker } from "@/components/user-managment/settings/AvatarPicker";
import { ProfileForm } from "@/components/user-managment/settings/ProfileForm";
import { PasswordForm } from "@/components/user-managment/settings/PasswordForm";
import { useAppSelector } from "@/hooks/redux";

const SettingsPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ⚙️ Account Settings
      </h1>

      {/* Avatar Section */}
      <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          1. Choose Your Avatar
        </h2>

        <AvatarPicker />

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium">Current Avatar:</span>
          <img
            src={`https://api.dicebear.com/7.x/${user?.avatar}/svg?seed=${user?.firstName}`}
            alt="Avatar"
            className="w-12 h-12 rounded-full border shadow-md"
          />
        </div>
      </section>

      {/* Profile Info Section */}
      <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          2. Update Profile Info
        </h2>
        <ProfileForm />
      </section>

      {/* Password Section */}
      <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          3. Change Password
        </h2>
        <PasswordForm />
      </section>
    </div>
  );
};

export default SettingsPage;

