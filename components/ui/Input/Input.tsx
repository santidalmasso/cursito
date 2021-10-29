import cn from "classnames";
import s from "./Input.module.css";
import { InputHTMLAttributes, FC, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: any;
  onChange?: (...args: any[]) => any;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (props, inputRef) => {
    const { className, icon = null, ...rest } = props;

    const rootClassName = cn(s.root, className);

    return (
      <div className={s.container}>
        <input
          className={rootClassName}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          ref={inputRef}
          {...rest}
        />
        {icon && <Icon>{icon}</Icon>}
      </div>
    );
  }
);

function Icon({ children }) {
  return <span className={s.icon}>{children}</span>;
}

export default Input;
