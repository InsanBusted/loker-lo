import Hero from "@/components/Home/Hero/page";
import Jumbotron from "@/components/Home/Jumbotron/page";
import Service from "@/components/Home/Services/page";
import SplashWrapper from "@/components/SplashWrapper";
import { SignedOut } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col min-h-screen ">
        <SplashWrapper />
        <section className="h-[100vh]">
          <Hero />
        </section>
        <section className="xl:h-[80vh] h-[100vh]">
          <Service />
        </section>
        <section className="h-[100vh]">
          <SignedOut>
            <Jumbotron />
          </SignedOut>
        </section>
        <section className="h-[100vh] xl:h-[0]"></section>
      </main>
    </div>
  );
}
