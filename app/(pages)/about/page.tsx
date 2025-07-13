'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="min-h-screen px-4 md:px-20 lg:px-32 py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About <span className="text-blue-600 dark:text-blue-400">MediVoice AI</span>
        </h1>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Empowering healthcare with the intelligence of AI voice agents to improve patient experience and streamline operations.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Image
            src="/Images/AboutImage.png"
            alt="About MediVoice AI"
            width={800}
            height={600}
            className="rounded-3xl shadow-xl object-cover w-full"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-5"
        >
          <h2 className="text-2xl font-semibold">
            Revolutionizing Healthcare, One Voice at a Time
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            MediVoice AI is on a mission to bring intelligent, accessible, and fast medical consultations to everyone. Our voice-powered agents simulate real doctor interactions, helping patients with appointments, FAQs, and health advice – anytime, anywhere.
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>AI-driven natural voice conversations</li>
            <li>Automated appointment booking and patient intake</li>
            <li>Medical reports and summaries powered by AI</li>
            <li>Scalable, secure, and privacy-focused</li>
          </ul>

          <Link href="/dashboard">
            <Button className="mt-4 cursor-pointer">Start Using MediVoice</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
