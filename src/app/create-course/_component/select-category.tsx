import { CATEGORY_LIST } from "@/lib/constants";
import Image from "next/image";

const SelectCategory = () => {
  return (
    <div>
      {CATEGORY_LIST.map((category, index) => (
        <div>
          <Image src={category.icon} width={50} height={50} alt="Logo" />
          <h2></h2>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
