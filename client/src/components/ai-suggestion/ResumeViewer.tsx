import React from "react";
import { FileText } from "lucide-react";

interface Props {
  url: string;
  name: string;
}

export const ResumeViewer: React.FC<Props> = ({ url, name }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FileText className="text-blue-500" />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      <iframe
        src={url}
        title={name}
        className="w-full h-[720px] rounded-xl border-2 border-muted shadow-inner"
      />
    </div>
  );
};
