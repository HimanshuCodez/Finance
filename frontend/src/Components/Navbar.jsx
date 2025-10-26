import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white z-20">
      {/* Navbar content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl italic font-bold text-[#0B2B57]">
              SmrFinserv
            </span>
          </div>

          {/* Center: Menu (hidden on small screens) */}
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span>Insurance Policies</span>
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </div>

              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Contact</a>
            </nav>
          </div>

          {/* Right: Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
             
              <button className="ml-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#09A858] text-white text-sm font-semibold hover:bg-green-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16.98 14.58c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.14-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.15-.27-.02-.42.11-.55.11-.11.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.45-.82-1.98-.21-.51-.43-.44-.6-.45-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.71 4.15.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.15.15-1.27-.07-.11-.25-.18-.52-.32z" />
                </svg>
                WhatsApp Us
              </button>
               <button className="ml-3 p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01.02 1.06L9.06 10l3.71 3.71a.75.75 0 11-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.08.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">Insurance Policies</a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">Claims</a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
           
            <div className="mt-3 px-5">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-[#09A858] text-white font-semibold hover:bg-green-700">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M16.98 14.58c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.14-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.15-.27-.02-.42.11-.55.11-.11.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.45-.82-1.98-.21-.51-.43-.44-.6-.45-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.71 4.15.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.15.15-1.27-.07-.11-.25-.18-.52-.32z" />
                    </svg>
                    WhatsApp Us
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Blue band with gradient and wave bottom */}
      <div className="relative">
        <div className="w-full h-12 md:h-14 bg-gradient-to-r from-[#0747A6] via-[#0E4DA4] to-[#083E8A]"></div>
        <div className="absolute left-0 right-0 bottom-0 -mb-1 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,0 C150,100 350,100 600,40 C850,-20 1050,40 1200,80 L1200,120 L0,120 Z" className="fill-current text-[#0A47A6]" />
          </svg>
        </div>
      </div>
    </header>
  );
}