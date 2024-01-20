import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchallCategoriesQuery,
} from "../../redux/api/categoryAPISlice";
import { TbCategory2 } from "react-icons/tb";
import CategoryModal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories } = useFetchallCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleUpdateCategory = async (event) => {

    if (!selectedCategory) {
      toast.error("No category selected");
      return;
    }

    if (!updateName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: {
          name: updateName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdateName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating a category failed.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (!selectedCategory || !selectedCategory._id) {
        toast.error("Invalid category selected");
        return;
      }
  
      const result = await deleteCategory({ categoryId: selectedCategory._id }).unwrap();
  
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-semibold leading-6 text-gray-900 text-2xl pt-5 pb-5">
              Manage Categories
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              You can manage your categories from here. You can see all the
              current categories, add new ones and delete old ones.
            </p>
          </div>
        </div>
        <div className="my-10">
          <div className="max-w-xl mx-auto">
            <form className="space-y-2" >
              <input
              name="categoryform"
                type="text"
                className="py-2 px-3 border rounded-lg w-full"
                placeholder="Create category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex justify-evenly">
                <button onClick={handleCreateCategory} className="bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 foucs:ring-sky-500 focus:ring-opacity-50">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {categories?.map((category) => (
            <li
              key={category._id}
              className="flex gap-x-5 py-5 hover:bg-gray-100 px-5"
            >
              <div className="flex-none rounded-full bg-blue-300 p-2">
                <TbCategory2 className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex items-center">
                <button
                  className="text-sm font-semibold leading-6 text-gray-800 hover:text-blue-500"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }}
                >
                  {category.name}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <CategoryModal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          value={updateName}
          setValue={(value) => setUpdateName(value)}
          handleDelete={handleDeleteCategory}
          handleUpdate={handleUpdateCategory}
        ></CategoryModal>
      </div>
      <div></div>
    </div>
  );
};

export default CategoryList;
