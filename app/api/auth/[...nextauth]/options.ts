import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "john@gmailcom",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "########",
				},
			},
			async authorize(credentials) {
				try {
					const user = await User.findOne({ email: credentials?.email });

					if (user) {
						const match = await bcrypt.compare(
							credentials!.password,
							user.password
						);

						if (match) {
							return Promise.resolve(user);
						}
					}
				} catch (error) {
					return null;
				}
				return null;
			},
		}),
	],
	callbacks: {
		//server side
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		//client side
		async session({ session, token }) {
			if (session?.user) session.user.role = token.role;
			return session;
		},
	},
};
