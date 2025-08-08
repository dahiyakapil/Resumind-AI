
import { format, formatDistanceToNow } from "date-fns";

export const formatReadableDate = (iso: string): string => {
  return format(new Date(iso), "MMMM d, yyyy 'at' h:mm a");
};

export const formatRelativeDate = (iso: string): string => {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
};