import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export async function POST(req: { json: () => any }) {
	try {
		const body = await req.json();
		const userData = body.formData;

		//check if data exists
		if (!userData?.email || !userData?.password) {
			return NextResponse.json(
				{ message: "All fields are required." },
				{ status: 400 }
			);
		}

		//check duplicate emails
		const duplicate = await User.findOne({ email: userData.email })
			.lean()
			.exec();

		if (duplicate) {
			return NextResponse.json({ message: "Email taken" }, { status: 409 });
		}

		const hashPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashPassword;

		await User.create(userData);
		return NextResponse.json({ message: "User Created" }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
