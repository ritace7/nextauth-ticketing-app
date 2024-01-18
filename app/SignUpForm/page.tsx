"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const name = e.target.name;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			const res = await fetch("/api/Users", {
				method: "POST",
				body: JSON.stringify({ formData }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				const response = await res.json();
				setErrorMessage(response.message);
			} else {
				router.refresh();
				router.push("/");
			}
		} catch (error) {
			console.error("Error during signup:", error);
			setErrorMessage("An error occurred during signup");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				method="post"
				className="flex flex-col gap-3 lg:w-1/2 w-full mx-auto text-center text-xl"
			>
				<h2>Sign Up</h2>
				<label>Full Name</label>
				<input
					type="text"
					id="name"
					name="name"
					onChange={handleChange}
					required
					value={formData.name}
					className=" bg-slate-400 rounded"
				/>
				<label>Email</label>
				<input
					type="email"
					id="email"
					name="email"
					onChange={handleChange}
					required
					value={formData.email}
					className=" bg-slate-400 rounded"
				/>
				<label>Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
					required
					value={formData.password}
					className=" bg-slate-400 rounded"
				/>
				<input
					type="submit"
					value="Sign Up"
					className="bg-nav hover:bg-blue-800 rounded cursor-pointer"
				/>
			</form>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
		</>
	);
};

export default SignUpForm;
