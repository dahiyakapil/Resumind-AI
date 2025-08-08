import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  desc: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    className="w-full sm:w-1/2 lg:w-1/3 p-2"
    transition={{ type: "spring", stiffness: 140 }}
  >
    <Card className="shadow-lg h-full">
      <CardContent className="space-y-3">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-2">
          <svg width={20} height={20} fill="currentColor" aria-hidden="true">
            <circle cx={10} cy={10} r={8} />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);


