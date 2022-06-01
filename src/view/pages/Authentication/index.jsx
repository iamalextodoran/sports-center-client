import { useState } from "react";

import { connect } from "react-redux";
import { Creators as ApplicationCreators } from "logic/reducers/application";

import moment from "moment";
import Moment from "react-moment";

import { Modal } from "view/components";

const Authentication = ({
  login,
  logout,
  updateProps,
  currentUser,
  showLoginModal,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const mainAction = () => {
    currentUser.isLoggedIn ? logout() : login({ email, password });
    updateProps({ showLoginModal: !showLoginModal });
  };

  return (
    <Modal
      onClick={mainAction}
      show={showLoginModal}
      setShow={() => updateProps({ showLoginModal: !showLoginModal })}
      label={currentUser.isLoggedIn ? "Log out" : "Log in"}
    >
      {!currentUser.isLoggedIn ? (
        <div className="flex flex-col mt-5">
          <div className="flex flex-col">
            <label className="">Email</label>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="">Password</label>
            <input
              placeholder="Passwrd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col mt-5">
            <p className="font-bold mb-5">
              <span className="">Hey,</span>
              <span className="text-primary-600 pl-2">
                {currentUser.firstName + " " + currentUser.lastName}!
              </span>
            </p>

            <p className="font-normal mb-2">
              You now have access to creating, editing and deleting a product
              from the home page.
            </p>

            <p className="font-normal mb-5">
              If you want to log out at any time, come back here and click the
              button.
            </p>

            <p className="font-normal mb-3">
              <span className="text-accent">PS</span>: Your{" "}
              <span className="font-bold">token</span> will expire at{" "}
              <span className="font-bold text-primary-500">
                <Moment format="hh:mm:ss" fromNow>
                  {moment(currentUser.loggedInAt)
                    .add(currentUser.tokenAvailability, "ms")
                    .toDate()}
                </Moment>
              </span>{" "}
              and you will be logged out if you try any action that would
              require authorization (out of security reasons).
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default connect(
  (state) => ({
    currentUser: state.application.currentUser,
    showLoginModal: state.application.showLoginModal,
  }),
  {
    login: ApplicationCreators.login,
    logout: ApplicationCreators.logout,
    updateProps: ApplicationCreators.updateProps,
  }
)(Authentication);
