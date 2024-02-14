import { CheckIcon } from "@heroicons/react/24/outline"; // Don't forget to import CheckIcon if not imported already

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className={`${step1 ? "text-blue-500" : "text-gray-800"}`}>
        <span className="flex items-center px-6 py-4 text-sm font-medium">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
            <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <span className="ml-4 text-sm font-medium text-gray-900">Login</span>
        </span>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-blue-500"></div>}
          <div className={`${step1 ? "text-blue-500" : "text-gray-800"}`}>
            <span className="flex items-center px-6 py-4 text-sm font-medium">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <span className="ml-4 text-sm font-medium text-gray-900">Shipping</span>
            </span>
          </div>
        </>
      )}

      <div className={`${!step3 ? "text-gray-800" : "text-blue-500"} ${!step3 ? "bg-gray-800" : "bg-blue-500"} w-40 h-0.5`}></div>

      <div className={`${step3 ? "text-blue-500" : "text-gray-800"} ${!step3 ? "w-[10rem]" : ""}`}>
        {step3 ? (
          <span className="flex items-center px-6 py-4 text-sm font-medium">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
              <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <span className="ml-4 text-sm font-medium text-gray-900">Summary</span>
          </span>
        ) : (
          <span>Summary</span>
        )}
      </div>
    </div>
  );
};

export default ProgressSteps;