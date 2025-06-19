import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Jumbotron = ({ link }: {link: string}) => {
  return (
    <div className="w-[80vw] h-[25vh] m-auto pt-[7rem]">
      <div className="w-full  bg-black flex items-center justify-center py-[10rem] rounded-2xl shadow-lg ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-white hover:text-gray-600 text-xl">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white text-xl">
                {link}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Jumbotron;
