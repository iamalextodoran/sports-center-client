import { useState } from "react";

import { connect } from "react-redux";
import { Creators as DataCreators } from "logic/reducers/data";

import { ALL_COLORS, ALL_SIZES, MAX_PICTURES } from "logic/constants";

import ImageUploading from "react-images-uploading";

import { Modal } from "view/components";

import { FiTrash2, FiLoader } from "react-icons/fi";

const NewProduct = ({ setShowNewProduct, showNewProduct, createProduct }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");

  const submit = () => {
    const formData = new FormData();

    sizes.forEach((size) => formData.append("sizes[]", size));
    colors.forEach((col) => formData.append("colors[]", col));
    pictures.forEach((pic) => formData.append("image", pic.file));

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", parseInt(price));
    formData.append("category", "women");

    createProduct(formData);
    cleanup();
  };

  const cleanup = () => {
    setShowNewProduct(false);
    setProductName("");
    setDescription("");
    setPictures([]);
    setColors([]);
    setSizes([]);
    setPrice("");
  };

  const disableCreate =
    !productName ||
    !description ||
    !price ||
    !pictures.length ||
    !sizes.length ||
    !colors.length;

  return (
    <Modal
      label="Create"
      title="Create product"
      show={showNewProduct}
      setShow={cleanup}
      disabled={disableCreate}
      onClick={submit}
    >
      <div className="">
        <label>Name</label>
        <input
          placeholder="Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Description</label>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Colors</label>
        <div className="grid grid-cols-6 gap-1">
          {ALL_COLORS.map((color) => (
            <div
              key={color}
              onClick={() => {
                if (colors.includes(color)) {
                  setColors(colors.filter((col) => col !== color));
                } else {
                  setColors([...colors, color]);
                }
              }}
              className={`cursor-pointer w-full py-1 rounded text-white bg-${color}-500 border-transparent border-2  ${
                colors.includes(color)
                  ? "border-gray-800 dark:border-gray-100"
                  : ""
              } flex items-center justify-center`}
            >
              {color}
            </div>
          ))}
        </div>

        <label>Sizes</label>
        <div className="grid grid-cols-6 gap-1">
          {ALL_SIZES.map((size) => (
            <div
              key={size}
              onClick={() => {
                if (sizes.includes(size)) {
                  setSizes(sizes.filter((col) => col !== size));
                } else {
                  setSizes([...sizes, size]);
                }
              }}
              className={`cursor-pointer w-full py-1 rounded bg-primary-500 border-transparent border-4 text-white ${
                sizes.includes(size) ? "bg-primary-700" : ""
              } flex items-center justify-center`}
            >
              {size}
            </div>
          ))}
        </div>

        <ImageUploading
          multiple
          value={pictures}
          onChange={(pictures) => setPictures(pictures)}
          maxNumber={MAX_PICTURES}
          dataURLKey="data_url"
        >
          {({
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            imageList,
            isDragging,
            dragProps,
          }) => (
            <div className="mt-3">
              <div className="grid grid-cols-4 gap-2">
                {imageList.map((image, index) => (
                  <div key={index}>
                    <div
                      onMouseEnter={() => setShowMoreOptions(index)}
                      onMouseLeave={() => setShowMoreOptions(null)}
                      className="flex items-center h-24"
                    >
                      <img
                        onClick={() => onImageUpdate(index)}
                        className="cursor-pointer opacity-100 hover:opacity-80 object-contain rounded h-full w-32"
                        src={image["data_url"]}
                        alt=""
                      />

                      <div
                        className={`${
                          showMoreOptions === index ? "scale-100" : "scale-0"
                        } absolute transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-r-xl p-2`}
                      >
                        <div
                          className="flex items-center transition duration-250 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onImageRemove(index);
                          }}
                        >
                          <FiTrash2
                            size="1.75rem"
                            className="text-red-500 hover:text-red-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {[...Array(MAX_PICTURES - imageList.length)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center h-24">
                      <div className="bg-gray-200 dark:bg-gray-700 opacity-100 object-contain rounded h-full w-32 flex justify-center items-center">
                        <FiLoader size="2rem" className="animate-spin" />
                      </div>
                      <div
                        className={`absolute transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-b-xl p-2`}
                      >
                        <div className="flex items-center transition duration-250 cursor-pointer"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="py-4 transition duration-300 bg-accent-200 hover:bg-accent-300 dark:bg-accent-300 dark:hover:bg-accent-400 border-2 border-dashed border-accent-400 rounded w-full mt-5 text-white font-bold flex flex-col justify-center items-center"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click to add or drag and drop here
                <span className="text-xs font-normal">
                  (max. {MAX_PICTURES})
                </span>
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
    </Modal>
  );
};

export default connect((state) => ({}), {
  createProduct: DataCreators.createProduct,
})(NewProduct);
