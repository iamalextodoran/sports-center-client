import { connect } from "react-redux";
import { Creators as ApplicationCreators } from "logic/reducers/application";

import { NavLink } from "react-router-dom";
import { CHECKOUT_PATH, FAVORITES_PATH, HOME_PATH } from "logic/routes/paths";

import { FiHome } from "react-icons/fi";
import { SiMonkeytie } from "react-icons/si";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";

import "./style.scss";

const Navbar = ({ currentUser, updateProps, showLoginModal, cart }) => {
  return (
    <div className="flex justify-between py-3 mb-10">
      <div>
        <NavLink
          to={HOME_PATH}
          className={({ isActive }) =>
            `menu-item ${isActive ? "--active" : ""}`
          }
        >
          <FiHome className="mr-2" size="1rem" />
          Home
        </NavLink>
      </div>

      <div className="flex flex-row items-center justify-between space-x-2">
        <NavLink
          to={FAVORITES_PATH}
          className={({ isActive }) =>
            `menu-item ${isActive ? "--active" : ""}`
          }
        >
          <FaHeart size="1rem" />
          &#8203;
        </NavLink>

        <NavLink
          to={CHECKOUT_PATH}
          className={({ isActive }) =>
            `menu-item ${isActive ? "--active" : ""}`
          }
        >
          <FaShoppingBasket size="1rem" className="" />
          <span
            className={`${
              !!cart.length ? "" : "hidden"
            } rounded-full text-white bg-accent-500 z-10 mb-3 p-1`}
          ></span>
          &#8203;
        </NavLink>

        <div
          onClick={() => updateProps({ showLoginModal: !showLoginModal })}
          className={`menu-item cursor-pointer ${
            currentUser.isLoggedIn
              ? "border-green-500 hover:border-green-600 px-6"
              : "border-red-500 hover:border-red-600 px-6"
          }`}
        >
          <SiMonkeytie
            size="1rem"
            className={
              currentUser.isLoggedIn ? "text-green-500" : "text-red-500"
            }
          />
          &#8203;
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    cart: state.data.cart,
    currentUser: state.application.currentUser,
    showLoginModal: state.application.showLoginModal,
  }),
  {
    updateProps: ApplicationCreators.updateProps,
  }
)(Navbar);
