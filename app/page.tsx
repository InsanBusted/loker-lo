import Hero from "@/components/Home/Hero/page";
import Jumbotron from "@/components/Home/Jumbotron/page";
import Service from "@/components/Home/Services/page";
import SplashScreen from "@/components/SplashScreen";
import { SignedOut } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col min-h-screen">
        <SplashScreen />
        <section className="h-[100vh]">
          <Hero />
        </section>
        <section className="h-[80vh]">
          <Service />
        </section>
        <SignedOut>
          <section className="h-[100vh]">
            <Jumbotron />
          </section>
        </SignedOut>
      </main>
    </div>
  );
}
