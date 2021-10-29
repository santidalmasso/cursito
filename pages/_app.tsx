import { SessionProvider } from "next-auth/react";
import "@assets/main.css";

const Noop: React.FC = ({ children }) => <>{children}</>;

function App({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default App;
