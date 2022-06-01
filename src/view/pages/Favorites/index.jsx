import { connect } from "react-redux";
import { Creators as DataCreators } from "logic/reducers/data";

import { productPath } from "logic/helpers";

import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

const Favorites = ({ products, toggleFavorite }) => {
  const navigate = useNavigate();

  let favoriteProducts = products.filter((product) => product.favorite);

  return (
    <div className="h-full">
      {!!favoriteProducts.length ? (
        favoriteProducts.map((product) => (
          <div key={product.id}>
            <div
              className="transition duration-300 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 rounded flex items-center justify-between py-4 px-2 my-3 cursor-pointer"
              onClick={() => navigate(productPath(product))}
            >
              <div className="flex">
                <img
                  className="object-contain h-16 rounded mx-3"
                  alt="..."
                  src={product.pictures[0]}
                />
                <div>
                  <h1 className="font-bold">{product.name}</h1>
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold">{product.price} RON</p>

                <FaHeart
                  size="1rem"
                  className="hover:scale-150 transition duration-300 text-red-500 hover:text-red-700 mx-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1 className="text-xl">No favorite products yet.</h1>
          <p>Press the heart icon to add any.</p>
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({ products: state.data.products }), {
  toggleFavorite: DataCreators.toggleFavorite,
})(Favorites);
