import type { Metadata } from "next";
import { Header } from "../components/header";
import { getWorkshops } from "./actions";
import { WorkshopDashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Workshops | AI App Foundation",
  description: "Internal dashboard for managing workshops, instructors, and seat capacity.",
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <>
      <Header page="Workshops" pages={["Dashboard", "Catalog"]} />
      <WorkshopDashboardClient initialWorkshops={workshops} />
    </>
  );
}
