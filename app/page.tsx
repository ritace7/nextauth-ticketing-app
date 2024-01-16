import { Ticket } from "@/types";
import TicketCard from "./(components)/TicketCard";

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

	const uniqueCategories = [
		...new Set(tickets?.map(({ category }: Ticket) => category)),
	];

	return (
		<div className="p-5">
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
		</div>
	);
};

export default Dashboard;
