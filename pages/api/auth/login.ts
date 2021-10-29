import { NextApiHandler } from "next";
import prisma from "../../../prisma/prisma-client";
import { compare } from "bcrypt";

const credentialsAuth: NextApiHandler<any> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const user = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!user) return res.status(400).end();

  const arePasswordEqual = await compare(req.body.password, user.password);

  if (arePasswordEqual) {
    const tinyUser: any = {
      name: user.name,
      surname: user.surname,
      email: user.email,
    };

    return res.status(200).json(tinyUser);
  }

  res.status(401).end();
};

export default credentialsAuth;
