'use client';

interface ToggleTabsProps {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
}

export const ToggleTabs = ({ isSignIn, setIsSignIn }: ToggleTabsProps) => (
  <div className="flex gap-2 bg-white/10 p-1 rounded-full mb-6">
    <button
      className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${
        isSignIn ? 'bg-white/30 text-white' : 'text-white/70'
      }`}
      onClick={() => setIsSignIn(true)}
    >
      Sign In
    </button>
    <button
      className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${
        !isSignIn ? 'bg-white/30 text-white' : 'text-white/70'
      }`}
      onClick={() => setIsSignIn(false)}
    >
      Sign Up
    </button>
  </div>
);
