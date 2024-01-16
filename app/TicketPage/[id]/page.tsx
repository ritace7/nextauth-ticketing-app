import TicketForm from "@/app/(components)/TicketForm";
import { Ticket, TicketPageProps } from "@/types";

const getTicketById = async (id: string) => {
	try {
		const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to get ticket.");
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

let updateTicketData: Ticket;
const TicketPage = async ({ params }: TicketPageProps) => {
	const EDITMODE = params.id === "new" ? false : true;

	if (EDITMODE) {
		const match = await getTicketById(params.id);
		updateTicketData = match?.foundTicket;
	} else {
		updateTicketData = {
			_id: "new",
			title: "",
			description: "",
			priority: 1,
			progress: 0,
			status: "",
			category: "",
			createdAt: new Date(),
		};
	}

	return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
