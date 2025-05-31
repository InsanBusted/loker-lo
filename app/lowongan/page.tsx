import Header from "@/components/Header/page";
import Banner from "@/components/SearchJobs/Banner/page";
import ExploreJobs from "@/components/SearchJobs/ExploreJobs/page";
import Hero from "@/components/SearchJobs/Hero/page";
import Footer from "@/components/ui/Footer/page";

const Search = () => {
  return (
    <div>
      <Header />
      <main>
        <section>
          <Hero />
        </section>

        <section>
          <Banner />
        </section>

        {/* ExploreJobs section (berisi pencarian dinamis) */}
        <section className="mb-[5rem]">
          <ExploreJobs />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
