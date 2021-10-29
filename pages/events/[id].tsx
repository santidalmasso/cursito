import { Courses } from "@components/events/Courses";
import Event from "@components/events/Event/Event";
import Layout from "@components/Layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function Id() {
  return (
    <div className="grid p-10">
      <Courses />
    </div>
  );
}

Id.Layout = Layout;

export default Id;
