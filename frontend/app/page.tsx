import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32 xl:py-36 2xl:max-w-[1536px] 2xl:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4rem] dark:text-zinc-50">
              Your trusted pharmacy,{" "}
              <span className="text-blue-600 dark:text-blue-500">
                delivered
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:mt-6 sm:text-lg xl:text-xl dark:text-zinc-400">
              Order authentic medicines and healthcare products from the comfort
              of your home. Fast delivery, expert advice, peace of mind.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              >
                Get started
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28 2xl:max-w-[1536px] 2xl:px-8">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-4 lg:gap-12">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
              100% authentic
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Licensed pharmacies. Every product verified and traceable.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
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
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v1m0 5v4a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
              Doorstep delivery
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Fast, discreet delivery. Get your orders delivered to your door.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
              Expert support
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Qualified pharmacists ready to answer your health questions.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
              Best prices
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Competitive pricing on prescription and over-the-counter medicines.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28 2xl:max-w-[1536px] 2xl:px-8">
          <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl xl:text-4xl dark:text-zinc-50">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 sm:mt-4 sm:text-base dark:text-zinc-400">
            Ordering your medicines is simple and hassle-free.
          </p>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                1
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
                Register & browse
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Create an account and browse our wide range of pharmacy products.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                2
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
                Add to cart & order
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Upload your prescription if needed and place your order securely.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                3
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
                Receive at home
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get your medicines delivered to your doorstep, fast and discreet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:py-28 2xl:max-w-[1536px] 2xl:px-8">
        <div className="rounded-2xl bg-blue-600 px-4 py-12 text-center dark:bg-blue-700 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20">
          <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100 sm:mt-4 sm:text-base">
            Join thousands of customers who trust PharmaCare for their healthcare
            needs.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              Create account
            </Link>
            <Link
              href="/sign-in"
              className="rounded-lg border border-blue-400 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
