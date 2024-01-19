import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="my-10">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            className="py-2 px-3 border rounded-lg w-full"
            placeholder="Create category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex justify-center">
            <button className="bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 foucs:ring-sky-500 focus:ring-opacity-50">
              {buttonText}
            </button>

            {handleDelete && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
