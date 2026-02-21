import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Customer",
    quote:
      "PharmaCare has completely changed how I manage my prescriptions. The delivery is always on time and the pharmacists are incredibly helpful when I have questions about my medication.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Customer",
    quote:
      "I was skeptical about ordering medicines online, but PharmaCare put my mind at ease. Authentic products, fast delivery, and excellent customer support. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Pharmacist",
    quote:
      "As a pharmacist, I appreciate PharmaCare's commitment to authenticity and patient care. The platform makes it easy for customers to access quality healthcare products from home.",
    rating: 5,
  },
  {
    name: "Robert Davis",
    role: "Customer",
    quote:
      "Ordering my mom's chronic medications through PharmaCare has been a lifesaver. No more trips to the pharmacy—everything arrives at our doorstep, well-packaged and on schedule.",
    rating: 5,
  },
  {
    name: "Amanda Foster",
    role: "Customer",
    quote:
      "The best part is the expert support. I had questions about drug interactions and got a prompt call from a pharmacist. That level of care is rare these days.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Customer",
    quote:
      "Fast, reliable, and transparent pricing. I've been using PharmaCare for six months now and haven't looked back. Great service for busy families.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 fill-amber-400 text-amber-400"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <section
        id="reviews"
        className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 2xl:max-w-[1536px] 2xl:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50">
              What our customers say
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              Real experiences from people who trust PharmaCare for their
              healthcare needs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 2xl:max-w-[1536px] 2xl:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <StarRating count={testimonial.rating} />
              <blockquote className="mt-4 flex-1 text-zinc-600 dark:text-zinc-400">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {testimonial.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {testimonial.role}
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
