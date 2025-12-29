import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function ColorPicker(props: Props) {
  return <input type="color" {...props} />;
}
