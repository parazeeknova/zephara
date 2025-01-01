import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <a href="https://github.com/parazeeknova/Velastria" target="_blank" rel="noopener noreferrer">
            Velastria is the sleek and powerful chat platform designed to be a part of the Zephyr ecosystem—a social media aggregator. Built to foster real-time, seamless communication.
            </a>
          </li>
          <li className="mb-2">
            Soon to be released, Velastria will be the go-to platform for Zephyr users to connect with each other, share their thoughts, and engage in meaningful conversations.
          </li>
          <li className="mb-2">
            Stay tuned for more updates on Velastria and the Zephyr ecosystem. (It will replace the current chat--whispers on Zephyr)
          </li>
          <li className="mb-2">
            <a href="https://development.zephyyrr.in" target="_blank" rel="noopener noreferrer underline">
            Visit Zephyr
            </a>
          </li>
        </ol>
      </main>
    </div>
  );
}
