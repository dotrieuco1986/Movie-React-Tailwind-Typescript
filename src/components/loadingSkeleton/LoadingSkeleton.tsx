import React from "react";

interface Props {
  height?: string;
  width?: string;
  radius?: string;
  className?: string;
}

const LoadingSkeleton : React.FC<Props> = ({ height, width, radius, className }) => {
  return (
    <div
      className={`skeleton ${className} `}
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
