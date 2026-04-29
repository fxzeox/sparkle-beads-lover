import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">Sparkle Beads Lover</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Handcrafted bracelets made with passion and premium materials. Each piece is unique and designed to complement your personal style.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-sky-300">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-sky-300 transition text-sm font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-gray-400 hover:text-sky-300 transition text-sm font-medium">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-sky-300 transition text-sm font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-sky-300 transition text-sm font-medium">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-sky-300">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">📱</span>
                  <a href="tel:+923016555942" className="text-gray-400 hover:text-white transition text-sm font-medium">
                    +92 301 6555942
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">📧</span>
                  <a href="mailto:info@sparklebeat.com" className="text-gray-400 hover:text-white transition text-sm font-medium">
                    sparklebeat@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-sky-300">Follow Us</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.tiktok.com/@sparklebeads35?_r=1&_t=ZS-94Hlo4aMPEw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm font-medium"
                >
                  <SiTiktok className="text-lg" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
                <a
                  href="https://www.instagram.com/sparklebeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm font-medium"
                >
                  <FaInstagram className="text-lg" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://wa.me/923016555942"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm font-medium"
                >
                  <FaWhatsapp className="text-lg" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <hr className="border-gray-700" />

          {/* Bottom Footer */}
          <div className="mt-8 sm:mt-12 text-center text-gray-400 text-sm">
            <p className="mb-1">© {currentYear} Sparkle Beads Lover. All rights reserved.</p>
            <p>Handcrafted bracelets with love ✨</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
