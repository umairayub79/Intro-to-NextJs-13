import { Ticket } from "../TicketInterface";
import { notFound } from "next/navigation";
export const dynamicParams = true;
export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:4000/tickets/");

  const tickets = await res.json();

  return tickets.map((ticket: Ticket) => ({
    id: ticket.id,
  }));
};

const getTicket = async (id: any): Promise<Ticket> => {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  return data as Ticket;
};

export default async function TicketDetails({ params }: any) {
  const id = params.id;
  const ticket = await getTicket(id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} Priority
        </div>
      </div>
    </main>
  );
}
