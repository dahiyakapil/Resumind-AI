




import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Lightbulb, AlertTriangle, Trophy, Search } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'ATS Score Analyzer',
    description: 'Get a detailed compatibility score showing how well your resume performs with Applicant Tracking Systems.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Suggestions',
    description: 'Receive intelligent recommendations to improve keywords, formatting, and content structure.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: AlertTriangle,
    title: 'Buzzword Detection',
    description: 'Identify overused terms and clichés that could hurt your application, with smart alternatives.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Trophy,
    title: 'Resume Scoring + Metrics',
    description: 'Comprehensive analysis with detailed metrics on readability, keywords, and structure.',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: Search,
    title: 'Recruiter Match Potential',
    description: 'See how your resume matches against common recruiter search patterns and requirements.',
    gradient: 'from-indigo-500 to-blue-600'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resumind AI?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced AI technology meets intuitive design to give you the competitive edge in today's job market.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Glassmorphism card */}
                <div className="h-full backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};