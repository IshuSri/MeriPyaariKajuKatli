import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-100">
      <h1 className="text-5xl font-bold mb-6">
        Flower Shop Story 🌸
      </h1>

      <Link
        href="/nikita"
        className="px-6 py-3 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
      >
        Open Story
      </Link>
    </main>
  );
}