import prisma from "../../prisma/prisma-client";
import { registerSchema } from "lib/schemas";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return req.status(405).end();
    }

    const userInfo = JSON.parse(req.body);

    if (!(await registerSchema.isValid(req.body))) return res.status(400).end();

    const userAlreadyExist = await prisma.user.findFirst({
      where: { email: userInfo.email },
    });

    if (userAlreadyExist) return res.status(409).end();

    const encryptedPassword = await hash(userInfo.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        password: encryptedPassword,
      },
    });

    return res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
