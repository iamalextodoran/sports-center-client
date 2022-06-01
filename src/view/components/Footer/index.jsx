import { Button } from "view/components/";

import { connect } from "react-redux";
import { Creators as AlertCreators } from "logic/reducers/alert";

import {
  FiInfo,
  FiCheckCircle,
  FiAlertOctagon,
  FiAlertTriangle,
} from "react-icons/fi";

const Footer = ({ createAlert }) => {
  return (
    <div className="py-12 text-center">
      <blockquote className="font-semibold italic text-center text-gray-900 dark:text-gray-50 mb-3">
        You look
        <span className="transition duration-300 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-accent-500 before:hover:bg-primary-500 relative inline-block mx-3">
          <span className="relative text-white mx-3">good</span>
        </span>
        with us.
      </blockquote>

      <Button
        icon={FiInfo}
        type="info"
        onClick={() => createAlert({ content: "info", type: "info" })}
      />

      <Button
        icon={FiCheckCircle}
        type="success"
        onClick={() => createAlert({ content: "success", type: "success" })}
      />

      <Button
        icon={FiAlertOctagon}
        type="danger"
        onClick={() => createAlert({ content: "danger", type: "danger" })}
      />

      <Button
        icon={FiAlertTriangle}
        type="warning"
        onClick={() => createAlert({ content: "warning", type: "warning" })}
      />
    </div>
  );
};

export default connect(() => ({}), {
  createAlert: AlertCreators.createAlert,
})(Footer);
