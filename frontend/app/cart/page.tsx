"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart, updateLocalQuantity } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.cart);
  const { cart_items, grand_total, total_items } = data;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading && cart_items.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (cart_items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <ShoppingCart className="h-12 w-12 text-zinc-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Your cart is empty
        </h2>
        <p className="mt-2 text-zinc-500">
          Looks like you haven`&apos;`t added any medicines yet.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Shopping Cart
        </h1>
        <p className="mt-2 text-zinc-500">
          You have{" "}
          <span className="font-medium text-blue-600">{total_items}</span> items
          in your cart
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
        {/* Medicine List */}
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {cart_items.map((item) => (
              <div
                key={item.cart_item_id}
                className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row sm:items-center"
              >
                {/* Product Image Placeholder */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src="/medicine-placeholder.svg"
                    alt={item.name}
                    width={48}
                    height={48}
                    className="opacity-80"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600">
                      ${parseFloat(item.price).toFixed(2)} / unit
                    </p>
                    <p className="text-xs text-zinc-400">
                      Stock available: {item.available_stock}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-8 sm:mt-0">
                    {/* Quantity Control */}
                    <div className="flex h-10 items-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                      <button
                        onClick={() =>
                          dispatch(
                            updateLocalQuantity({
                              id: item.cart_item_id,
                              quantity: Math.max(1, item.quantity - 1),
                            }),
                          )
                        }
                        className="flex h-full w-10 items-center justify-center text-zinc-500 hover:text-blue-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateLocalQuantity({
                              id: item.cart_item_id,
                              quantity: Math.min(
                                item.available_stock,
                                item.quantity + 1,
                              ),
                            }),
                          )
                        }
                        className="flex h-full w-10 items-center justify-center text-zinc-500 hover:text-blue-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        ${parseFloat(item.subtotal).toFixed(2)}
                      </p>
                      <button className="text-xs font-medium text-red-500 transition-colors hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Order Summary
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  ${parseFloat(grand_total).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Estimated Tax</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  $0.00
                </span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Shipping</span>
                <span className="font-bold text-emerald-600 uppercase text-xs">
                  Free
                </span>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                <div className="flex items-end justify-between">
                  <span className="text-base font-medium">Grand Total</span>
                  <span className="text-3xl font-black text-blue-600">
                    ${parseFloat(grand_total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] dark:shadow-none">
              Proceed to Checkout
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
              <ShieldCheck size={16} />
              <span className="text-xs font-medium">
                Secure SSL Encrypted Payment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
