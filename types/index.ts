import { ReactNode } from "react";

export interface TicketPageProps {
	params: { id: string };
}

export interface Ticket {
	_id: string;
	title: string;
	description: string;
	priority: number;
	progress: number;
	status: string;
	category: string;
	createdAt: Date;
}

export interface TicketCardProps {
	ticket: Ticket;
}

export interface PriorityProps {
	priority: number;
}

export interface ProgressProps {
	progress: number;
}

export interface StatusProps {
	status: string;
}

export interface DeleteProps {
	id: string;
}

export interface Token {
	role?: string;
}

export interface AuthProviderProps {
	children: ReactNode;
}
