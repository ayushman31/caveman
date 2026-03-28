import type { Metadata } from "next";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


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
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-[#f4f1eb]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <span className="text-lg font-semibold tracking-tight text-neutral-900">
          <a href="/">Caveman</a>
        </span>
        <ul className="flex items-center gap-6 text-sm font-medium text-neutral-600">
          <li>
            {/* YouTube Icon */}
            <a
              href="YOUR_YOUTUBE_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
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
            >
              <FaXTwitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            {/* Discord Icon */}
            <a
              href="YOUR_DISCORD_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
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