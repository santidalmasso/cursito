import cn from "classnames";
import { FC, forwardRef, ButtonHTMLAttributes } from "react";
import s from "./Button.module.css";
import { Loading } from "@components/ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "glass";
  active?: boolean;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, buttonRef) => {
    const {
      className,
      variant = "flat",
      children,
      active,
      width,
      secondary = false,
      loading = false,
      disabled = false,
      style = {},
      ...rest
    } = props;

    const rootClassName = cn(
      s.root,
      {
        [s.loading]: loading,
        [s.disabled]: disabled,
        [s.secondary]: secondary,
        [s.glass]: variant === "glass",
      },
      className
    );

    return (
      <button
        aria-pressed={active}
        data-variant={variant}
        ref={buttonRef}
        className={rootClassName}
        disabled={disabled || loading}
        style={{
          width,
          ...style,
        }}
        {...rest}
      >
        {loading ? (
          <i className="m-0 flex">
            <Loading />
          </i>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
