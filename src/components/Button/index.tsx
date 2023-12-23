import classNames from "classnames";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import "./button.scss";
type IButtonProps = ComponentPropsWithoutRef<"button"> & {
  size?: "x-small" | "small" | "medium" | "large" | "x-large";
  outline?: boolean;
  block?: boolean;
  rounded?: boolean;
  variant?: "secondary" | "primary";
};
export type Ref = HTMLButtonElement;
const Button = forwardRef<Ref, IButtonProps>((props, ref) => {
  const {
    className = "",
    variant,
    outline,
    block,
    rounded,
    size,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        className,
        size,
        variant,
        block ? "block" : "",
        rounded ? "rounded" : "",
        outline ? "outline" : "",
        "button"
      )}
      {...rest}
    ></button>
  );
});
Button.displayName = "Button";
export default Button;
