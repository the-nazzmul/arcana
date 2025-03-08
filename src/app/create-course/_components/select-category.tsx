import { CATEGORY_LIST } from "@/lib/constants";
import { UserInputContext } from "@/providers/user-input-context";
import Image from "next/image";
import { useContext } from "react";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category: string) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    <div>
      <h2 className="mb-8 text-center">Select your course category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {CATEGORY_LIST.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-primary/20 cursor-pointer ${
              userCourseInput.category === category.title &&
              "border-primary bg-primary/20"
            }`}
            onClick={() => handleCategoryChange(category.title)}
          >
            <Image src={category.icon} width={50} height={50} alt="Logo" />
            <h2>{category.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
