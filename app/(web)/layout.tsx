import type { Metadata } from "next";

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
            Caveman
          </span>
          <ul className="flex items-center gap-6 text-sm font-medium text-neutral-600">
            <li>
              <a href="/" className="hover:text-neutral-900 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/first" className="hover:text-neutral-900 transition-colors">
                First
              </a>
            </li>
            <li>
              <a href="/second" className="hover:text-neutral-900 transition-colors">
                Second
              </a>
            </li>
            <li>
              <a href="/third" className="hover:text-neutral-900 transition-colors">
                Third
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