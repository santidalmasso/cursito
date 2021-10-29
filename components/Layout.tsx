import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "./common/Profile/Profile";

function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  return (
    <>
      <header className="flex max-w-5xl w-screen items-center justify-end p-5">
        <span className="mr-4">{session.user.name}</span>
        <Profile />
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
