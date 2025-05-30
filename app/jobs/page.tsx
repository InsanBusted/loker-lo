import Header from "@/components/Header/page";
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
        <section className="h-[100vh] mt-10">
          <ExploreJobs />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
