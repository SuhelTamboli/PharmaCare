import Link from "next/link";

const reviews = [
  {
    name: "Lisa Anderson",
    date: "Feb 18, 2025",
    rating: 5,
    title: "Best online pharmacy experience",
    content:
      "Ordered prescription medications and got them in 2 days. Packaging was discreet and secure. Will definitely use PharmaCare again.",
  },
  {
    name: "Michael Brown",
    date: "Feb 15, 2025",
    rating: 5,
    title: "Reliable and affordable",
    content:
      "Great prices compared to my local pharmacy. The customer service team helped me with prescription verification. Highly satisfied.",
  },
  {
    name: "Jennifer Lee",
    date: "Feb 12, 2025",
    rating: 4,
    title: "Quick delivery, minor delay once",
    content:
      "Usually get orders within 3 days. Had one shipment arrive a day late but customer support was proactive in keeping me updated.",
  },
  {
    name: "Christopher Moore",
    date: "Feb 10, 2025",
    rating: 5,
    title: "Perfect for chronic medication refills",
    content:
      "Setting up auto-refill for my diabetes medication was easy. No more last-minute pharmacy runs. Very convenient service.",
  },
  {
    name: "Nicole Garcia",
    date: "Feb 8, 2025",
    rating: 5,
    title: "Trustworthy and professional",
    content:
      "Verified licensed pharmacy. Medications are genuine. The pharmacist answered my questions over chat within minutes.",
  },
  {
    name: "Daniel White",
    date: "Feb 5, 2025",
    rating: 4,
    title: "Good overall, app could be improved",
    content:
      "Service is solid. Would love to see a mobile app for easier ordering. Website works well on mobile though.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < count ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200 dark:fill-zinc-600 dark:text-zinc-600"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 2xl:max-w-[1536px] 2xl:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50">
              Customer Reviews
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              Honest feedback from our customers about PharmaCare products and
              services.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 2xl:max-w-[1536px] 2xl:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={`${review.name}-${review.date}`}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <StarRating count={review.rating} />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {review.date}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">
                {review.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {review.content}
              </p>
              <footer className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  — {review.name}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white px-4 py-12 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl text-center 2xl:max-w-[1536px]">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
