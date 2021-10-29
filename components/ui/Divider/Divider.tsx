import { FC } from "react";

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ ...props }) => {
  const { className, ...rest } = props;
  return <div className={`border-t border-gray-300 ${className}`} {...rest} />;
};

export default Divider;
