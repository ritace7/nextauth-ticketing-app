import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
	const session = await getServerSession(options);
	return (
		<nav className="flex justify-between bg-nav p-4">
			<div className="flex items-center space-x-4 ">
				<Link href="/">
					<FontAwesomeIcon icon={faHome} className="icon" />
				</Link>
				{session && (
					<Link href="/TicketPage/new">
						<FontAwesomeIcon icon={faTicket} className="icon" />
					</Link>
				)}
			</div>
			<div>
				<p className="text-default-text hover:text-green-600">
					{session && (
						<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
					)}
				</p>
			</div>
		</nav>
	);
};

export default Nav;
