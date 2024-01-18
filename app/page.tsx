import { Ticket } from "@/types";
import TicketCard from "./(components)/TicketCard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";

const getTickets = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/Tickets", {
			cache: "no-store",
		});

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const Dashboard = async () => {
	const { tickets } = await getTickets();
	const session = await getServerSession(options);

	const uniqueCategories = [
		...new Set(tickets?.map(({ category }: Ticket) => category)),
	];

	return (
		<div className="p-5">
			{session ? (
				<div>
					{tickets &&
						uniqueCategories?.map((category, categoryIndex) => (
							<div className="mb-4" key={categoryIndex}>
								<h2>{category as string}</h2>
								<div className="lg:grid grid-cols-2 xl:grid-cols-4">
									{tickets
										.filter((ticket: Ticket) => ticket.category === category)
										.map((filteredTicket: Ticket, _index: number) => (
											<TicketCard key={_index} ticket={filteredTicket} />
										))}
								</div>
							</div>
						))}
				</div>
			) : (
				<div className="flex flex-col items-center">
					<p className="text-green-600 text-xl">Welcome.</p>
					<p className="text-2xl">
						<Link
							href="/api/auth/signin"
							className="font-bold hover:text-green-600"
						>
							Login
						</Link>{" "}
						to view tickets
					</p>
					<p className="text-2xl">
						Don&apos;t have an account?{" "}
						<Link href="/SignUpForm" className="font-bold hover:text-green-600">
							Signup
						</Link>{" "}
						Here
					</p>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
