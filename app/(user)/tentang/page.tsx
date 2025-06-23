import Detail from "@/components/About/Detail/page";
import VisiMisi from "@/components/About/VisiMisi/page";
import Jumbotron from "@/components/Jumbotron/page";

const Tentang = () => {
  return (
    <main>
      <section className="h-[65vh] xl:h-[70vh]">
        <Jumbotron link="tentang" />
      </section>
      <section className="h-[100vh]">
        <Detail />
      </section>
      <section className="xl:h-[100vh] h-[150vh]">
        <VisiMisi />
      </section>
    </main>
  );
};

export default Tentang;
