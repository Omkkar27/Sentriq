import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel.js";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user exist

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 },
      );
    }

    //hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json({
      message: "user created succesfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
