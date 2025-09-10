import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Base email sender
export async function sendEmail({ to, subject, text, html }) {
  if (!to) throw new Error("Recipient email is required!");

  await transporter.sendMail({
    from: `"ShopEasy" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

// Reusable function for EJS templates
export const sendTemplateMail = async (to, templateName, variables) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../../emails",
      `${templateName}.ejs`
    );

    const html = await ejs.renderFile(templatePath, variables);
    console.log(html)
    await sendEmail({
      to,
      subject: variables.subject || "Notification",
      html,
    });

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
