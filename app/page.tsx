import Header from "@/components/Header/page";
import Hero from "@/components/Home/Hero/page";
import Jumbotron from "@/components/Home/Jumbotron/page";
import Service from "@/components/Home/Services/page";
import Footer from "@/components/ui/Footer/page";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section className="h-[100vh]">
          <Hero />
        </section>
        <section className="h-[80vh]">
          <Service />
        </section>
        <section className="h-[50vh]">
          <Jumbotron />
        </section>
      </main>
      <div className="h-[50vh] pb-[1rem] pt-[60rem] xl:pt-[10rem]">
        <Footer />
      </div>
    </div>
  );
}
