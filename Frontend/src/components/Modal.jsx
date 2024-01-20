import { IoMdClose } from "react-icons/io";


const CategoryModal = ({ isOpen, onClose, handleDelete, handleUpdate, value, setValue }) => {


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg z-10 text-right">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2 rounded-full hover:bg-gray-200 p-2"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
            <div className="w-full">
              <div className="bg-white rounded-lg">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Update category
                  </h3>
                </div>
                <div className="p-4 md:p-5">
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="text"
                        id="category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Update category name"
                      />
                    </div>
                    <button
                      type="button" 
                      onClick={() => {
                        console.log('Calling handleUpdate with value:', value);
                        handleUpdate(value);
                      }}
                      className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Update Name
                    </button>
                    <button
                      type="button" 
                      onClick={() => handleDelete()}
                      className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Delete Category
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryModal;
