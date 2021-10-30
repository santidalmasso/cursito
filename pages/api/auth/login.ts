import { NextApiHandler } from "next";
import prisma from "../../../prisma/prisma-client";
import { compare } from "bcrypt";

const credentialsAuth = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
    }

    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (!user) return res.status(400).end();

    const arePasswordEqual = await compare(req.body.password, user.password);

    if (arePasswordEqual) {
      const tinyUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
      };

      return res.status(200).json(tinyUser);
    }

    res.status(401).end();
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default credentialsAuth;
