'use client';

import { Button } from '@/components/ui/button';
import { BadgeCheck, Brain, Mic2, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/nextjs';

export default function LearnMorePage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Learn More About MediVoice AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how our AI-powered voice agent is transforming healthcare by providing smart, fast, and secure medical support to patients and doctors.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Why Choose MediVoice AI?</h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <Mic2 className="text-blue-500 mt-1" />
                Natural voice interaction with intelligent context handling.
              </li>
              <li className="flex items-start gap-3">
                <Stethoscope className="text-green-500 mt-1" />
                Instant AI-powered medical advice for initial consultation.
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className="text-indigo-500 mt-1" />
                HIPAA-compliant data handling to protect patient information.
              </li>
              <li className="flex items-start gap-3">
                <Brain className="text-pink-500 mt-1" />
                Continual learning to improve diagnosis and response.
              </li>
            </ul>

            <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
              <Button size="lg" className="mt-6 cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Images/AI healthcare assistant illustration.avif"
              alt="AI healthcare assistant illustration"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
