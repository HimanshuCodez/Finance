import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function SocialHandles() {
  const location = useLocation();

  // Hide social handles on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col z-50 gap-4">
      <a href="https://www.facebook.com/share/17vAbA1HH6/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 cursor-pointer rounded-full shadow-lg hover:bg-blue-700 transition">
        <Facebook size={24} stroke="currentColor" />
      </a>
      <a href="https://www.instagram.com/smrf.inserv?igsh=NTE0MnY5MHYycXV4" target="_blank" rel="noopener noreferrer" className="bg-red-400 text-white p-3 rounded-full shadow-lg hover:bg-red-500 transition">
        <Instagram size={24} stroke="currentColor" />
      </a>
    </div>
  );
}
