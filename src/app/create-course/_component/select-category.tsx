import { CATEGORY_LIST } from "@/lib/constants";
import Image from "next/image";

const SelectCategory = () => {
  return (
    <>
      <h2 className="mb-8 text-center">Select your course category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {CATEGORY_LIST.map((category, index) => (
          <div className="flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-primary/20 cursor-pointer">
            <Image src={category.icon} width={50} height={50} alt="Logo" />
            <h2>{category.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectCategory;
