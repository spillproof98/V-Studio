import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Slider(props: Props) {
  return (
    <input
      type="range"
      {...props}
      className={`w-full ${props.className ?? ""}`}
    />
  );
}
