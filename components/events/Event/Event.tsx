import { Link } from "@components/ui";
import Image from "next/image";
import s from "./Event.module.css";

export default function Event() {
  return (
    <Link href={`/events/${12}`}>
      <div className={s.root}>
        <div className="m-auto mt-4 mb-2">
          <Image src="/images/events/cyt.png" width={400} height={300} />
        </div>
        <div>
          <h3 className="text-gray-100 text-2xl mb-3 font-semibold">
            Jornada de Ciencia y Tecnología
          </h3>
          <p className="text-gray-100 opacity-90">14 Cursos - 29/10/21</p>
        </div>
      </div>
    </Link>
  );
}
