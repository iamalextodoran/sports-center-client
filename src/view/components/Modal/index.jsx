const Modal = ({
  secondaryLabel,
  children,
  disabled,
  setShow,
  onClick,
  label,
  title,
  show,
}) => {
  return (
    <div
      className={`${
        show ? "scale-100" : "scale-0"
      } fixed z-20 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed scale-100 inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-75 transition-opacity"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div
          className={`${
            show ? "scale-100" : "scale-0"
          } duration-300 relative inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
        >
          <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-gray-50">
                  {title}
                </h3>
                <div className="mt-2 dark:text-gray-200">{children}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {label && (
              <button
                disabled={disabled}
                onClick={onClick}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                  disabled
                    ? "bg-accent-300 hover:bg-accent-300"
                    : "bg-accent-600 hover:bg-accent-700"
                }`}
              >
                {label}
              </button>
            )}
            <button
              onClick={() => setShow(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {secondaryLabel ?? "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
