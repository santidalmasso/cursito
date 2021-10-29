import Image from "next/image";
import s from "./SignUpImage.module.css";

const SignUpImage = () => {
  return (
    <div className={s.root}>
      <Image src="/images/teamwork.svg" width={359} height={269} />
    </div>
  );
};

export default SignUpImage;
