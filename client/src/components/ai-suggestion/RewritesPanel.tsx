import React, { useState } from "react";
import { BadgeCheck, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Rewrite {
  original: string;
  rewritten: string;
}

interface Props {
  rewrites: Rewrite[];
}

export const RewritesPanel: React.FC<Props> = ({ rewrites }) => {
  const [applied, setApplied] = useState<Record<string, string>>({});

  const handleApply = (original: string, rewritten: string) => {
    setApplied((prev) => ({ ...prev, [original]: rewritten }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="text-purple-500" />
        <h2 className="text-lg font-bold">AI Suggestions for Bullet Points</h2>
      </div>
      {rewrites.length === 0 ? (
        <p className="text-muted-foreground text-sm">No bullet points found in project section.</p>
      ) : (
        rewrites.map((item, idx) => (
          <Card
            key={idx}
            className="backdrop-blur bg-white/10 dark:bg-black/20 border border-muted shadow-md"
          >
            <CardContent className="py-5">
              <p className="text-sm text-muted-foreground mb-1">Original:</p>
              <p className="mb-2 text-yellow-700 dark:text-yellow-400 font-medium">
                {item.original}
              </p>
              <p className="text-sm text-muted-foreground mb-1">AI Suggestion:</p>
              <p className="italic text-foreground">{item.rewritten}</p>
              <Button
                size="sm"
                variant="secondary"
                className="mt-3"
                onClick={() => handleApply(item.original, item.rewritten)}
              >
                Apply Suggestion
              </Button>
              {applied[item.original] && (
                <div className="mt-2 flex items-center text-green-600 text-sm gap-1">
                  <BadgeCheck size={16} />
                  <span>Applied: {applied[item.original]}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
