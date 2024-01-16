import type { Metadata } from "next";
import "./globals.css";
import Nav from "./(components)/Nav";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata: Metadata = {
	title: "Ticketing App",
	description: "Created by Ritace",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col h-screen max-h-screen">
					<Nav />
					<div className="flex-grow overflow-y-auto bg-page text-default-text">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
