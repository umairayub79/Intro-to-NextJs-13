import Link from "next/link";
import { Ticket } from "./TicketInterface";

async function getTickets(): Promise<Ticket[]> {
  await new Promise(resolve => setTimeout(resolve, 5000))
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, //no-cache
    },
  });
  const data = await res.json();
  return data as Ticket[];
}

const TicketList = async () => {
  const tickets: Ticket[] = await getTickets();
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={"/tickets/" + ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} Priority
            </div>
            <p>User Email: {ticket.user_email}</p>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay</p>
      )}
    </>
  );
};

export default TicketList;
