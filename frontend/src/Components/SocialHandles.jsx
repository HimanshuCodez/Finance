import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function SocialHandles() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-4">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition">
        <Facebook size={24} stroke="currentColor" />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="bg-red-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition">
        <Instagram size={24} stroke="currentColor" />
      </a>
    </div>
  );
}
