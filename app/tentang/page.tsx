import Detail from "@/components/About/Detail/page";
import VisiMisi from "@/components/About/VisiMisi/page";
import Jumbotron from "@/components/Jumbotron/page";

const Tentang = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main>
        <section className="h-[65vh] xl:h-[80vh]">
          <Jumbotron link="tentang" />
        </section>
        <section className="h-[200vh] xl:h-[100vh]">
          <Detail />
        </section>
        <section className="h-[150vh] xl:h-[100vh]">
          <VisiMisi />
        </section>
      </main>

    </div>
  );
};

export default Tentang;
