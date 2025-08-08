// import React from "react";
// import { motion } from "framer-motion";

// export const WorkflowStep: React.FC<{ number: string; title: string; description: string }> = ({
//   number,
//   title,
//   description,
// }) => (
//   <motion.div whileHover={{ scale: 1.02 }} className="flex-1 px-4">
//     <div className="flex items-start gap-4">
//       <div className="relative flex-shrink-0">
//         <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
//           {number}
//         </div>
//         <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
//       </div>
//       <div>
//         <h4 className="text-xl font-semibold">{title}</h4>
//         <p className="text-sm text-slate-600 mt-1">{description}</p>
//       </div>
//     </div>
//   </motion.div>
// );

// export const HowItWorks: React.FC = () => (
//   <section id="how-it-works" className="py-24 bg-slate-50">
//     <div className="max-w-6xl mx-auto px-6 lg:px-8">
//       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
//         <h2 className="text-5xl font-extrabold">
//           How It <span className="text-gradient bg-clip-text text-transparent from-blue-500 to-purple-600">Works</span>
//         </h2>
//         <p className="text-lg text-slate-600 mt-2">
//           Three simple steps to transform your resume into an ATS-optimized powerhouse.
//         </p>
//       </motion.div>
//       <div className="flex flex-col md:flex-row gap-8">
//         <WorkflowStep number="01" title="Upload Resume" description="Simply drag and drop your resume or upload it directly. We support PDF, DOC, and DOCX formats." />
//         <WorkflowStep number="02" title="AI Analyzes Content" description="Our advanced AI scans every word, analyzes structure, and compares against ATS requirements." />
//         <WorkflowStep number="03" title="Get Actionable Feedback" description="Receive detailed insights, optimization suggestions, and a comprehensive ATS compatibility score." />
//       </div>
//     </div>
//   </section>
// );


import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Simply drag and drop your resume or upload it directly. We support PDF, DOC, and DOCX formats.',
    step: '01'
  },
  {
    icon: Brain,
    title: 'AI Analyzes Content',
    description: 'Our advanced AI scans every word, analyzes structure, and compares against ATS requirements.',
    step: '02'
  },
  {
    icon: CheckCircle,
    title: 'Get Actionable Feedback',
    description: 'Receive detailed insights, optimization suggestions, and a comprehensive ATS compatibility score.',
    step: '03'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three simple steps to transform your resume into an ATS-optimized powerhouse.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step card */}
                  <div className="text-center lg:text-left">
                    {/* Step number */}
                    <div className="relative inline-flex items-center justify-center w-16 h-16 mx-auto lg:mx-0 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse opacity-20" />
                      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};