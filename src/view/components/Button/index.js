import { FiLoader } from "react-icons/fi";

import "./style.scss";

const Button = ({
  children,
  className,
  disabled,
  icon,
  loading,
  onClick,
  outline,
  type,
  rounded,
}) => {
  const Icon = icon;
  const ifOutline = outline ? "outline" : "";
  const ifOnlyIcon = icon && !children && !rounded ? "px-2.5" : "";
  const ifRounded = rounded ? "rounded-full p-2.5" : "rounded-lg p-2.5";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${type} ${ifRounded} ${ifOutline} ${ifOnlyIcon} ${className}`}
    >
      <span className="flex items-center">
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            {children && <p className="ml-2">Loading...</p>}
          </>
        ) : (
          <>
            {icon && <Icon />}
            {children && <span className="ml-2">{children}</span>}
          </>
        )}
      </span>
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  rounded: false,
  loading: false,
  className: "",
  type: "info",
};

export default Button;
