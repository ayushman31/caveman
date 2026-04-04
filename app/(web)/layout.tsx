import type { Metadata } from "next";
import Link from "next/link";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import { FaEnvelope, FaXTwitter } from "react-icons/fa6";


export const metadata: Metadata = {
  title: "Caveman",
  description: "Caveman : Unreal Engine Systems Programmer",
};

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      {/* Shared Nav */}
      <header className="sticky top-0 z-10 border-b-2 border-black bg-[#f4f1eb]/88 shadow-[0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <span className="text-lg font-semibold tracking-tight text-neutral-900">
          <Link href="/">Caveman</Link>
        </span>
        <ul className="flex items-center gap-6 text-sm font-medium text-neutral-600">
          <li>
            <a
              href="mailto:anshumans09@hotmail.com"
              className="transition-colors hover:text-orange-600"
              aria-label="Email Anshuman Singh"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </li>
          <li>
            {/* YouTube Icon */}
            <a
              href="https://www.youtube.com/@anshumansingh9794"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
              aria-label="Open YouTube profile"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </li>
          <li>
            {/* Twitter Icon */}
            <a
              href="https://x.com/mansingh_09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
              aria-label="Open X profile"
            >
              <FaXTwitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            {/* Discord Icon */}
            <a
              href="https://discord.gg/Pdcx3pfbfb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
              aria-label="Open Discord invite"
            >
              <FaDiscord className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </nav>
    </header>


      <main>{children}</main>

      {/* Shared Footer */}
      {/* <footer className="border-t border-neutral-200 py-8 text-center text-center bottom-0 text-sm text-neutral-500">
        © {new Date().getFullYear()} Caveman
      </footer> */}
    </div>
  );
}
