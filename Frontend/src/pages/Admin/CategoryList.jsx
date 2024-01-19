import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchallCategoriesQuery } from '../../redux/api/categoryAPISlice'
import CategoryForm from "../../components/CategoryForm";

const CategoryList = () => {
    const {data: categories } = useFetchallCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [update, setUpdateName] = useState('');
    const [modal, setModal] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useUpdateCategoryMutation()

    const handleCreateCategory = async (event) => {
        event.preventDefault()

        if(!name) {
            toast.error("Category name is required")
            return
        } 

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error) {
                toast.error(results.error)
            } else {
                setName("")
                toast.success(`${result.name} is created`)
            }
            
        } catch (error) {
            console.error(error)
            toast.error("Creating a category failed.")
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
         <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-semibold leading-6 text-gray-900 text-2xl pt-5 pb-5">Manage Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            You can manage your categories from here. You can see all the current categories, add new ones and delete old ones.
          </p>
        </div>
      </div>
          <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
      </div>
    </div>
  )
};

export default CategoryList;
