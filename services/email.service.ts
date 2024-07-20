import nodemailer from "nodemailer"

interface EmailProps {
  email: string
  type: string
  course: string
  id: number
}

export const sendMail = async ({ email, type, id, course }: EmailProps) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL!,
        pass: process.env.PASSWORD!
      }
    });

    const mailOptions = {
      from: process.env.EMAIL!,
      to: email,
      subject: type === "RefSend" ? "Invitation for Course" : "null",
      html: `<p>Click <a href="${process.env.CLIENT_URL}/addReferral/${course}/${id}">here</a> to get the course 
              or copy paste the link below in your browser. <br>
              ${process.env.CLIENT_URL}/addReferral/${course}/${id} </p>`
    }

    return transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
          console.log(err);
          return { ...err, success: false };
      } else {
          console.log("Email sent: " + info.response);
          return { ...info, success: true };
      }
  });

  } catch (error: any) {
    throw new Error(error.message);
  }
}