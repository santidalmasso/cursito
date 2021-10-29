import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  className?: string;
  replace?: boolean;
  as?: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  replace = false,
  as = href,
  ...props
}) => {
  return (
    <NextLink href={href} replace={replace} as={as}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
