import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as DataCreators } from "logic/reducers/data";

import { productPath } from "logic/helpers";

import { Modal } from "view/components";
import { NewProduct, EditProduct } from "./Subviews";

import { FaTrash, FaEdit } from "react-icons/fa";
import { FaRegHeart, FaHeart, FaPlus } from "react-icons/fa";

const Home = ({
  products,
  getProduct,
  getProducts,
  currentUser,
  deleteProduct,
  toggleFavorite,
}) => {
  const [showOtherOptions, setShowOtherOptions] = useState(null);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {toDelete && (
        <Modal
          label="Delete"
          title="Delete product"
          show={toDelete}
          setShow={setToDelete}
          onClick={() => {
            deleteProduct(toDelete);
            setToDelete(null);
          }}
        >
          Do you want to delete this?
        </Modal>
      )}

      {showNewProduct && (
        <NewProduct
          showNewProduct={showNewProduct}
          setShowNewProduct={setShowNewProduct}
        />
      )}

      {showEditProduct && (
        <EditProduct
          showEditProduct={showEditProduct}
          setShowEditProduct={setShowEditProduct}
        />
      )}

      {!!products.length ? (
        <>
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer"
              onClick={() => navigate(productPath(product))}
            >
              <div
                onMouseLeave={() => setShowOtherOptions(null)}
                onMouseEnter={() => setShowOtherOptions(product.id)}
                className={`relative rounded transition bg-gray-50 dark:bg-gray-700 opacity-80 hover:opacity-100 duration-250 flex justify-center`}
              >
                {currentUser.isLoggedIn && (
                  <div
                    className={`${
                      showOtherOptions === product.id ? "scale-100" : "scale-0"
                    } absolute transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-b-xl p-4`}
                  >
                    <div className="flex space-x-3">
                      <div
                        className="flex items-center transition duration-250"
                        onClick={(e) => {
                          e.stopPropagation();
                          setToDelete(product);
                        }}
                      >
                        <FaTrash
                          size="1rem"
                          className="hover:scale-150 transition duration-300 text-red-500 hover:text-red-600"
                        />
                      </div>

                      <div
                        className="flex items-center transition duration-250"
                        onClick={(e) => {
                          e.stopPropagation();
                          getProduct(product);
                          setShowEditProduct(product);
                        }}
                      >
                        <FaEdit
                          size="1rem"
                          className="hover:scale-150 transition duration-300 dark:text-gray-50 dark:hover:text-gray-200 text-gray-500 hover:text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {product.pictures[0] && (
                  <img
                    alt="..."
                    src={product.pictures[0]}
                    className="object-contain h-56 rounded"
                  />
                )}

                <div
                  className={`${
                    showOtherOptions === product.id ? "scale-100" : "scale-0"
                  } absolute flex items-center bottom-5 right-5 transition duration-250`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  {!product.favorite ? (
                    <FaRegHeart
                      size="1rem"
                      className="hover:scale-150 transition duration-300 text-red-500 hover:text-red-600"
                    />
                  ) : (
                    <FaHeart
                      size="1rem"
                      className="scale-150 transition duration-300 text-red-500 hover:text-red-600"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-bold">{product.name}</h1>
                  <p className="text-sm">{product.description}</p>
                </div>

                <div className="flex flex-col items-end font-bold">
                  <p className="">{product.price}</p>
                  <p className="">RON</p>
                </div>
              </div>
            </div>
          ))}

          {currentUser.isLoggedIn && (
            <div
              className="cursor-pointer"
              onClick={() => setShowNewProduct(true)}
            >
              <div className="relative rounded transition bg-primary-300 hover:bg-primary-400 duration-250 flex items-center justify-center h-56">
                <FaPlus
                  size="5rem"
                  className="scale-50 hover:scale-100 transition duration-300 rounded text-white"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-xl">No items yet.</h1>
          {currentUser.isLoggedIn ? (
            <p className="mb-4">
              Click
              <span
                className="px-1 text-primary-400 hover:text-primary-500 cursor-pointer"
                onClick={() => setShowNewProduct(true)}
              >
                here
              </span>
              to add
            </p>
          ) : (
            <p className="mb-4">Will add some in a sec...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    products: state.data.products,
    currentUser: state.application.currentUser,
  }),
  {
    getProduct: DataCreators.getProduct,
    getProducts: DataCreators.getProducts,
    deleteProduct: DataCreators.deleteProduct,
    toggleFavorite: DataCreators.toggleFavorite,
  }
)(Home);
