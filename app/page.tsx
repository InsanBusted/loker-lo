import Header from "@/components/Header/page";
import Hero from "@/components/Home/Hero/page";
import Jumbotron from "@/components/Home/Jumbotron/page";
import Service from "@/components/Home/Services/page";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="h-[100vh]">
        <Hero />
      </section>
      <section className="h-[100vh]">
        <Service />
      </section>
      <section className="h-[100vh]">
        <Jumbotron />
      </section>
    </div>
  );
}
