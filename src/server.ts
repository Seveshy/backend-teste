import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6c861df4a09458",
    pass: "b7154d7569beb3",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedbacks = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe feedget <teste@mail.com>",
    to: "Daniel Major <danielmajor.mail.com.br>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join(`\n`),
  });

  return res.status(201).json({ data: feedbacks });
});

app.listen(3333, () => {
  console.log("Server running!");
});
