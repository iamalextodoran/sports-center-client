import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", info: "" };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: error, info: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold ">Something went wrong! 😵‍💫</h1>
            <p className="text-sm font-medium">What happened?</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
