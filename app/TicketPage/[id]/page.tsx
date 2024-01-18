import TicketForm from "@/app/(components)/TicketForm";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Ticket, TicketPageProps } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
		throw new Error(error as string);
	}
};

let updateTicketData: Ticket;
const TicketPage = async ({ params }: TicketPageProps) => {
	const session = await getServerSession(options);

	if (!session) {
		return redirect("/api/auth/signin");
	}

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
