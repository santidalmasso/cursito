import { Link } from "@components/ui";
import Image from "next/image";
import s from "./Courses.module.css";

export default function Courses() {
  return (
    <div className="crystal rounded-2xl">
      <div className="p-4 cursor-pointer">
        <details className={s.details}>
          <summary>Curso de Java</summary>
          <ol className="">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
          </ol>
        </details>
      </div>
      <div className="p-4 cursor-pointer">
        <details className={s.details}>
          <summary>Curso de Java</summary>
          <ol className="">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
          </ol>
        </details>
      </div>
      <div className="p-4 cursor-pointer">
        <details className={s.details}>
          <summary>Curso de Java</summary>
          <ol className="">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
          </ol>
        </details>
      </div>
      <div className="p-4 cursor-pointer">
        <details className={s.details}>
          <summary>Curso de Java</summary>
          <ol className="">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
          </ol>
        </details>
      </div>
    </div>
  );
}
