'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="max-w-screen mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">MediVoice AI</h2>
          <p className="mt-2 text-sm">
            Your AI-powered medical voice agent for fast and accurate consultations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/learn-more">Learn More</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Contact</h3>
          <p className="text-sm">support@medivoice.ai</p>
          <p className="text-sm">+91-9876543210</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-black dark:hover:text-white transition" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-blue-700 transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-500 transition" />
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-blue-600 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="hover:text-black dark:hover:text-white transition" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-xs text-gray-500">
        © {year} MediVoice AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
