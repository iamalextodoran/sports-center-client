import { connect } from "react-redux";

import "./style.scss";

const Loading = ({ loading }) => {
  return loading ? (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="max-h-screen text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>

        <span className="inline-block align-middle h-screen">&#8203;</span>

        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  ) : null;
};

export default connect((state) => ({ loading: state.application.loading }))(
  Loading
);
