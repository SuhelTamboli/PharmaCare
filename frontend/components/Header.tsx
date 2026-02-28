"use client";

import { useLogout } from "@/hooks/useLogout";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/reviews", label: "Reviews" },
];

const loggedInNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/prescription", label: "Prescription" },
  { href: "/analytics", label: "Analytics" },
  { href: "/orders", label: "Orders" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const handleLogout = useLogout();

  // Determine which links to show based on auth status
  const activeLinks = isAuthenticated ? loggedInNavLinks : navLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/95 dark:supports-[backdrop-filter]:bg-zinc-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 2xl:max-w-[1536px] 2xl:px-8">
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50"
        >
          PharmaCare
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex md:gap-6 lg:gap-8">
          {activeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="ml-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {activeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
