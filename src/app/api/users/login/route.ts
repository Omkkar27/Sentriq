import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel.js";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //if user exixt

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          erorr: "User does not exist",
        },
        { status: 400 },
      );
    }
    //check if password is valid
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Inavlid Password" }, { status: 400 });
    }

    //create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
      throw new Error("TOKEN_SECRET is missing from environment variables");
    }

    const token = jwt.sign(tokenData, secret, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Succesfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
