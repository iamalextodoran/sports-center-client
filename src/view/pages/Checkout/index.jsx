import { useState } from "react";

import { connect } from "react-redux";
import { Creators as DataCreators } from "logic/reducers/data";
import { Creators as ApplicationCreators } from "logic/reducers/application";

import { productPath } from "logic/helpers";
import { DELIVERY_FEE, FREE_ABOVE } from "logic/constants";

import { useNavigate } from "react-router-dom";

import { Modal } from "view/components";

import { FaTrash, FaCheckSquare } from "react-icons/fa";

const Checkout = ({
  cart,
  popFromCart,
  createOrder,
  orderDetails,
  updateDataProps,
  updateApplicationProps,
  showOrderFinishedModal,
}) => {
  const initialOrderState = {
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  };

  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState(initialOrderState);

  const navigate = useNavigate();

  const total = cart.reduce((a, b) => a + b?.price, 0);
  const totalToPay = total >= FREE_ABOVE ? total : total + DELIVERY_FEE;

  const disableSubmitOrder =
    !order.phoneNumber ||
    !order.firstName ||
    !order.lastName ||
    !order.address ||
    !order.email;

  const submitOrder = () => {
    const OrderItems = cart.map(({ name, description, orderDetails }) => ({
      product: JSON.stringify({ name, description }),
      details: JSON.stringify(orderDetails),
    }));

    createOrder({ ...order, totalToPay, OrderItems });
    setShowCheckout(false);
    setOrder(initialOrderState);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/4">
        {cart.length ? (
          cart.map((product, index) => (
            <div key={index}>
              <div
                className="transition duration-300 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 rounded flex products-center justify-between py-4 px-2 mb-3 cursor-pointer"
                onClick={() => navigate(productPath(product))}
              >
                <div className="flex">
                  <img
                    alt="..."
                    src={product?.pictures[0]}
                    className="object-contain h-16 rounded mx-3"
                  />
                  <div>
                    <h1 className="font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                  </div>
                </div>

                <FaTrash
                  className="mr-3 hover:scale-150 transition duration-300 dark:text-white hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    popFromCart(index);
                  }}
                />
              </div>

              {product?.orderDetails && (
                <div className="bg-orange-300 py-3 mb-4 rounded flex justify-between">
                  <div className="flex">
                    <p className="px-4 text-white">
                      Color:
                      <span className="font-bold pl-2">
                        {product?.orderDetails.color}
                      </span>
                    </p>
                    <p className="px-4 text-white">
                      Size:
                      <span className="font-bold pl-2">
                        {product?.orderDetails.size}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <p className="font-bold mr-2 text-white">
                      {product.price} RON
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-xl">No items yet.</h1>
            <p>Get back to the home page to add some</p>
          </div>
        )}
      </div>

      <Modal
        label="Order"
        show={showCheckout}
        onClick={submitOrder}
        setShow={setShowCheckout}
        disabled={disableSubmitOrder}
      >
        <div>
          <div className="flex flex-row space-x-3">
            <div className="flex flex-col w-full">
              <label className="">First name</label>
              <input
                placeholder="First name"
                type="text"
                value={order.firstName}
                onChange={(e) =>
                  setOrder({ ...order, firstName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="">Last name</label>
              <input
                placeholder="Last name"
                type="text"
                value={order.lastName}
                onChange={(e) =>
                  setOrder({ ...order, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="">Email</label>
            <input
              placeholder="Email"
              type="text"
              value={order.email}
              onChange={(e) => setOrder({ ...order, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="">Phone number</label>
            <input
              placeholder="Phone number"
              type="tel"
              value={order.phoneNumber}
              onChange={(e) =>
                setOrder({ ...order, phoneNumber: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="">Shipping/Billing address</label>
            <textarea
              placeholder="Address"
              type="text"
              rows={4}
              value={order.address}
              onChange={(e) => setOrder({ ...order, address: e.target.value })}
            />
          </div>

          <hr className="mt-5"></hr>

          <div className="flex flex-col items-end">
            <label>To pay cash on delivery:</label>
            <p>
              {totalToPay} RON{" "}
              {total >= FREE_ABOVE ? "(free shipping)" : "(inc. shipping fee)"}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        secondaryLabel="Yayy!"
        show={showOrderFinishedModal}
        setShow={() => {
          updateDataProps({ orderDetails: {} });
          updateApplicationProps({ showOrderFinishedModal: false });
        }}
      >
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-xl font-bold mb-3">
              Congrats {orderDetails?.firstName}! 🎉
            </h1>
            <p>
              Your order is now being processed and will be delivered asap to
              your home.
            </p>
            <p className="my-5">
              Your tracking id is{" "}
              <span className="font-bold">{orderDetails?.trackingId}</span>
            </p>
          </div>
          <FaCheckSquare size="9rem" className="text-green-400" />
        </div>
      </Modal>

      <div className="mt-5 md:mt-0 md:ml-5">
        <h1 className="font-bold">Order summary</h1>
        <p>
          Shipping is free if above {FREE_ABOVE} RON, otherwise is{" "}
          {DELIVERY_FEE} RON
        </p>
        <p className="mt-5 font-bold">Total: {total} RON</p>

        <button
          disabled={!cart.length}
          onClick={() => setShowCheckout(true)}
          className="button w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    cart: state.data.cart,
    orderDetails: state.data.orderDetails,
    showOrderFinishedModal: state.application.showOrderFinishedModal,
  }),
  {
    updateApplicationProps: ApplicationCreators.updateProps,
    updateDataProps: DataCreators.updateProps,
    createOrder: DataCreators.createOrder,
    popFromCart: DataCreators.popFromCart,
  }
)(Checkout);
