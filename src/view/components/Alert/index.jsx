import { connect } from "react-redux";
import { Creators as alertActions } from "logic/reducers/alert";

import {
  FiX,
  FiInfo,
  FiCheckCircle,
  FiAlertOctagon,
  FiAlertTriangle,
} from "react-icons/fi";

const Alert = ({ messages, popAlert }) => {
  const icon = {
    info: FiInfo,
    danger: FiAlertOctagon,
    success: FiCheckCircle,
    warning: FiAlertTriangle,
  };

  const color = {
    info: "bg-blue-500",
    danger: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  };

  const onClickColor = {
    info: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
  };

  const title = {
    info: "Hey!",
    danger: "Oh, oh!",
    success: "Success!",
    warning: "Warning!",
  };

  return (
    <div className="z-10 fixed bottom-8 left-5 right-5 md:right-auto left-inherit md:left-10 w-auto flex flex-col md:items-start">
      {messages.map((message, index) => {
        const label = message.label || "Click";
        const type = message.type || "info";
        const onClick = message.onClick;
        const Icon = icon[type];

        return (
          <div
            key={index}
            className={`animate-slide-left flex items-center justify-between text-white px-6 py-3 border-0 rounded mb-4 md:w-fit ${color[type]}`}
          >
            <div className="flex items-center">
              <span className="text-sm inline-block mr-5 align-middle">
                <Icon />
              </span>

              <span className="text-sm inline-block align-middle mr-3">
                <b className="capitalize pr-2">
                  {message.title || title[type]}
                </b>
                {message.content}
              </span>
            </div>

            <div className="flex items-center">
              {onClick && (
                <button
                  className={`text-sm font-semibold inline-block align-middle px-3 rounded ${onClickColor[type]}`}
                  onClick={() => onClick()}
                >
                  {label}
                </button>
              )}

              <button
                onClick={() => popAlert(index)}
                className="bg-transparent text-sm font-semibold ml-3"
              >
                <FiX className="transition duration-200 hover:scale-150" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  (state) => ({
    messages: state.alert.messages,
  }),
  { popAlert: alertActions.popAlert }
)(Alert);
