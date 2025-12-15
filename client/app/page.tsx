import Image from "next/image";
import QueryClientContextProvider from "./context/QueryClientContextProvider";
import { Conversation } from "./components/Conversation";

export default function Home() {
  return (
    <QueryClientContextProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <header className="fixed top-0 inset-x-0 justify-start items-center flex shadow-lg p-2">
            <div className="container flex gap-12 justify-start items-center">
              <Image
                src="/ms-logo.webp"
                alt="Ms Logo"
                width={120}
                height={38}
                priority
              />
              <h1 className="prose lg:prose-xl text-xl text-gray-700">
                Grapple: Senior Fullstack Dev test
              </h1>
            </div>
          </header>

          <Conversation />
        </main>
      </div>
    </QueryClientContextProvider>
  );
}
