import Image from "next/image";
import QueryClientContextProvider from "./context/QueryClientContextProvider";
import { Conversation } from "./components/Conversation";

export default function Home() {
  return (
    <QueryClientContextProvider>
      <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
        <header className="fixed top-0 inset-x-0 z-10 bg-white shadow-sm py-3 px-4">
          <div className="container mx-auto flex gap-8 items-center">
            <Image
              src="/ms-logo.webp"
              alt="Ms Logo"
              width={120}
              height={38}
              priority
            />
            <h1 className="text-xl text-gray-700">
              Grapple: Senior Fullstack Dev test
            </h1>
          </div>
        </header>

        <main className="pt-16">
          <Conversation />
        </main>
      </div>
    </QueryClientContextProvider>
  );
}
