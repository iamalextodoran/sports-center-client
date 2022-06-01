import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Creators as DataCreators } from "logic/reducers/data";

import { CHECKOUT_PATH } from "logic/routes/paths";
import { useNavigate, useParams } from "react-router-dom";

import { FaRegHeart, FaHeart } from "react-icons/fa";

const Product = ({
  product,
  getProduct,
  pushToCart,
  updateProps,
  toggleFavorite,
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProduct({ id });

    return () => {
      updateProps({ product: {} });
    };
  }, [updateProps, getProduct, id]);

  useEffect(() => {
    if (Object.keys(product).length) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-2/3">
        {!!product?.pictures?.length && (
          <>
            <div className="grid grid-cols-1 gap-2">
              {product?.pictures
                .filter((_, index) => index >= 0 && index <= 0)
                .map((picture, index) => (
                  <img
                    alt="..."
                    key={index}
                    src={picture}
                    className="object-contain rounded-lg flex justify-center items-center"
                  />
                ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {product?.pictures
                .filter((_, index) => index >= 1 && index <= 2)
                .map((picture, index) => (
                  <img
                    alt="..."
                    key={index}
                    src={picture}
                    className="object-contain rounded-lg flex justify-center items-center"
                  />
                ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {product?.pictures
                .filter((_, index) => index >= 3)
                .map((picture, index) => (
                  <img
                    alt="..."
                    key={index}
                    src={picture}
                    className="object-contain rounded-lg flex justify-center items-center"
                  />
                ))}
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-1/3 md:ml-5 mt-5 md:mt-0">
        <h1 className="font-bold">{product.name}</h1>
        <p>{product.description}</p>
        <p className="mt-5 font-bold">{product.price} RON</p>

        <p className="mt-5">Select color:</p>
        <div className="grid grid-cols-3 gap-1">
          {product?.colors?.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`cursor-pointer w-full py-1 rounded bg-${color}-500 border-transparent border-2 text-white ${
                selectedColor === color
                  ? `border-gray-800 dark:border-gray-100`
                  : ""
              } flex items-center justify-center`}
            >
              {color}
            </div>
          ))}
        </div>

        <p className="mt-5">Select size:</p>
        <div className="grid grid-cols-3 gap-1">
          {product?.sizes?.map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`cursor-pointer w-full py-1 rounded bg-primary-500 border-transparent border-4 text-white ${
                selectedSize === size ? "bg-primary-700" : ""
              } flex items-center justify-center`}
            >
              {size}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            navigate(CHECKOUT_PATH);
            pushToCart({
              ...product,
              orderDetails: { color: selectedColor, size: selectedSize },
            });
          }}
          className="button bg-black w-full"
        >
          Add to cart
        </button>
        <button
          onClick={() => toggleFavorite(product)}
          className="bg-blue-300 hover:bg-blue-400 py-3 rounded mt-3 text-white w-full flex items-center justify-center"
        >
          {product.favorite ? (
            <FaHeart className="scale-150 transition duration-300 mr-2" />
          ) : (
            <FaRegHeart className="hover:scale-150 transition duration-300 mr-2" />
          )}
        </button>
      </div>
    </div>
  );
};

export default connect((state) => ({ product: state.data.product }), {
  getProduct: DataCreators.getProduct,
  updateProps: DataCreators.updateProps,
  popFromCart: DataCreators.popFromCart,
  pushToCart: DataCreators.pushToCart,
  toggleFavorite: DataCreators.toggleFavorite,
})(Product);
