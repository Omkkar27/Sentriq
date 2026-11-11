import nodemailer from "nodemailer";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "api",
        pass: process.env.MAILTRAP_API_TOKEN,
      },
    });

    const mailOptions = {
      from: "omkareshwaredu10@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "reset your password",
      html: `<p>Click 
      <a href ="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a>
      to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
      </p>
      `,
    };

    const mailRes = await transporter.sendMail(mailOptions);

    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
