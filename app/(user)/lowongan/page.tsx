import Banner from "@/components/SearchJobs/Banner/page";
import ExploreJobs from "@/components/SearchJobs/ExploreJobs/page";
import Hero from "@/components/SearchJobs/Hero/page";

const Search = () => {
  return (
    <div>
      <main>
        <section>
          <Hero />
        </section>
        <section>
          <Banner />
        </section>
        {/* ExploreJobs section (berisi pencarian dinamis) */}
        <section className="mb-[5rem] w-[80vw] m-auto">
          <ExploreJobs />
        </section>
      </main>
    </div>
  );
};

export default Search;
