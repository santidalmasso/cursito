import Event from "@components/events/Event/Event";
import Layout from "@components/Layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      props: { session },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

function Events() {
  return (
    <div className="grid p-10">
      <Event />
    </div>
  );
}

Events.Layout = Layout;

export default Events;
