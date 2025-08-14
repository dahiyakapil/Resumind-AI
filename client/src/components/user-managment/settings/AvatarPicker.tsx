import{ useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateUserAvatar } from "@/app/features/authSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AVATAR_STYLES = [
  "adventurer-neutral",
  "bottts-neutral",
  "croodles",
  "fun-emoji",
  "identicon",
  "micah",
  "open-peeps",
  "personas",
  "pixel-art",
  "shapes",
  "thumbs",
  "big-ears",
  "big-smile",
  "notionists-neutral",
  "avataaars",
  "lorelei-neutral",
  "pixel-art-neutral",
  "rings",
  "miniavs",
];

export const AvatarPicker = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(user?.avatar || "micah");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateUserAvatar(selected)).unwrap();
      toast.success("Avatar updated successfully!");
    } catch {
      toast.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const avatarSeed = user?.firstName?.[0] ?? "U";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
        {AVATAR_STYLES.map((style) => (
          <div
            key={style}
            onClick={() => setSelected(style)}
            className={`cursor-pointer transition-all border-2 rounded-full p-1 ${
              selected === style ? "border-blue-500 scale-105" : "border-transparent"
            }`}
          >
            <img
              src={`https://api.dicebear.com/7.x/${style}/svg?seed=${avatarSeed}`}
              alt={style}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Avatar"}
        </Button>
      </div>
    </div>
  );
};
