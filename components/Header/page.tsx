import { getUserPerusahaanSlug } from "@/lib/actions/checkUserPerusahaan";
import ClientHeader from "./headerClient";
import { getUserBiodataSlug } from "@/lib/actions/biodata";

const Header = async () => {
  const biodataSlug = await getUserBiodataSlug();
  const perusahaanSlug = await getUserPerusahaanSlug();
  return (
    <>
      <ClientHeader perusahaanSlug={perusahaanSlug} biodataSlug={biodataSlug} />
    </>
  );
};

export default Header;
