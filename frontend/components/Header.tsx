"use client";

import { useLogout } from "@/hooks/useLogout";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added for highlighting
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/reviews", label: "Reviews" },
];

const loggedInNavLinksForPharmacist = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/prescription", label: "Prescription" },
  { href: "/analytics", label: "Analytics" },
  { href: "/orders", label: "Orders" },
];

const loggedInNavLinksForCustomer = [
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/cart", label: "Cart" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route
  const [cartCount, setCartCount] = useState<number>(0); // State for cart count
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const handleLogout = useLogout();

  // Determine which links to show based on auth status
  const activeLinks =
    isAuthenticated && user?.role?.toLowerCase() === "pharmacist"
      ? loggedInNavLinksForPharmacist
      : isAuthenticated && user?.role?.toLowerCase() === "customer"
        ? loggedInNavLinksForCustomer
        : navLinks;

  // Fetch cart data if user is a customer
  useEffect(() => {
    const fetchCartData = async () => {
      if (isAuthenticated && user?.role?.toLowerCase() === "customer") {
        try {
          // 1. Point this to your actual backend URL
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/fetch-cart/${user.id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            },
          );

          const {data} = await response.json();

          if (!response.ok) {
            throw new Error("Failed to fetch cart items");
          }

          // Update cart count
          setCartCount(data.total_items || 0);
        } catch (error) {
          toast.error("Failed to fetch cart items");
          console.error("Failed to fetch cart:", error);
        }
      }
    };

    fetchCartData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/95 dark:supports-[backdrop-filter]:bg-zinc-900/80">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-8">
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50"
        >
          <Image
            src="/PharmaCare_logo.svg"
            alt="Company_Logo"
            width={200}
            height={200}
            className="bg-transparent" // Tailwind force
            priority // Ensures the logo loads immediately
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex md:gap-6 lg:gap-8">
          {activeLinks.map((link) => {
            const isActive = pathname === link.href; // Check active state
            const isCart = link.label === "Cart";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
                {/* Cart Badge - Fixed Positioning */}
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}

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
          <nav className="flex flex-col px-4 py-4 gap-1">
            {activeLinks.map((link) => {
              const isActive = pathname === link.href; // Check active state
              const isCart = link.label === "Cart";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative w-fit inl px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
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
